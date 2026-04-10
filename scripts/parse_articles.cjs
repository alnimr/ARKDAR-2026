const fs = require('fs');
const path = require('path');

const RAW_FILE = path.join(__dirname, '../raw_articles.json');
const OUTPUT_FILE = path.join(__dirname, '../frontend/src/data/articles.json');

function parseSqlRow(row) {
    const content = row.trim();
    if (!content.startsWith('(')) return null;
    
    // Remove ( and ) at the ends, accounting for potential ); or ),
    const inner = content.replace(/^\(/, '').replace(/\),?$/, '');
    
    const values = [];
    let current = '';
    let inString = false;
    let i = 0;

    while (i < inner.length) {
        const char = inner[i];
        
        if (inString) {
            if (char === '\\') {
                // Peek next char for escape
                const next = inner[i + 1] || '';
                if (next === "'" || next === '\\' || next === '"') {
                    current += next;
                    i += 2;
                } else {
                    current += char;
                    i++;
                }
            } else if (char === "'") {
                inString = false;
                i++;
            } else {
                current += char;
                i++;
            }
        } else {
            if (char === "'") {
                inString = true;
                i++;
            } else if (char === ',') {
                values.push(current.trim());
                current = '';
                i++;
            } else {
                current += char;
                i++;
            }
        }
    }
    values.push(current.trim());
    return values;
}

function cleanContent(content) {
    if (!content) return '';
    
    let cleaned = content;
    
    // Remove WordPress Block comments
    cleaned = cleaned.replace(/<!--\s*\/?wp:.*?-->/g, '');

    // Remove Shortcodes [...]
    cleaned = cleaned.replace(/\[\/?\w+[^\]]*\]/g, '');
    
    // Remove administrative phrases
    const adminPhrases = [/تحرير/g, /بواسطة/g, /أضف تعليقاً/g, /Leave a comment/gi, /Edit/g];
    adminPhrases.forEach(phrase => {
        cleaned = cleaned.replace(phrase, '');
    });

    // Remove blocks with external links
    const blocks = cleaned.split(/(?=<p|<div|<h|\n)/g);
    const externalLinkPattern = /http(s)?:\/\/(?!(arkdar\.com|localhost|inatc\.ae))[^\s"']+/gi;
    
    cleaned = blocks
        .filter(block => !externalLinkPattern.test(block))
        .join('');

    // Remove Elementor styles and leftovers
    cleaned = cleaned.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/g, '');
    cleaned = cleaned.replace(/\sclass="elementor-[^"]*"/g, '');
    cleaned = cleaned.replace(/\sdata-id="[^"]*"/g, '');
    cleaned = cleaned.replace(/\sdata-element_type="[^"]*"/g, '');
    
    return cleaned.trim();
}

function run() {
    if (!fs.existsSync(RAW_FILE)) {
        console.error("raw_articles.json not found!");
        return;
    }

    const rawData = JSON.parse(fs.readFileSync(RAW_FILE, 'utf8'));
    const articlesMap = new Map();

    console.log(`Processing ${rawData.length} raw entries...`);

    rawData.forEach((entry, index) => {
        const row = entry.raw;
        const values = parseSqlRow(row);
        
        if (!values) return;

        // Try to find indices dynamically if possible, or use defaults
        // Common WP posts table has post_type at indices 20 or 21 usually
        // Let's check a range of indices to find 'post'
        let postTypeIndex = -1;
        [20, 21, 22, 19].forEach(idx => {
            if (values[idx] === 'post') postTypeIndex = idx;
        });

        if (postTypeIndex === -1) return;

        // Map fields based on postTypeIndex (assuming standard shifts)
        // Shift depends on whether some optional fields exist
        // But usually:
        // content is index 4
        // title is index 5
        // status is index 7
        // name (slug) is index 11
        // modified is index 14
        
        const contentRaw = values[4];
        const title = values[5];
        const status = values[7];
        const slug = values[11];
        const modified = values[14];

        if (status !== 'publish') return;
        
        const cleaned = cleanContent(contentRaw);
        if (cleaned.length < 200) return;

        const forbidden = ['اتصل بنا', 'سياسة الخصوصية', 'من نحن', 'خدماتنا', 'Home', 'Contact'];
        if (forbidden.some(word => title.includes(word))) return;

        const article = {
            id: `${entry.file.split('.')[0]}_${values[0]}`,
            slug: slug || `article-${values[0]}`,
            title: { ar: title, en: title, de: title, es: title },
            content: {
                ar: cleaned,
                en: "<p>Content pending translation.</p>",
                de: "<p>Inhalt steht noch aus.</p>",
                es: "<p>Contenido pendiente de traducción.</p>"
            },
            excerpt: {
                ar: (cleaned.replace(/<[^>]+>/g, '').substring(0, 150) + '...').trim(),
                en: "Reading more...",
                de: "Mehr lesen...",
                es: "Leer más..."
            },
            date: modified
        };

        const existing = articlesMap.get(article.slug);
        if (!existing || new Date(modified) > new Date(existing.date)) {
            articlesMap.set(article.slug, article);
        }
    });

    const finalArticles = Array.from(articlesMap.values());
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalArticles, null, 2));

    console.log(`Extraction Complete!`);
    console.log(`Final clean articles: ${finalArticles.length}`);
}

run();
