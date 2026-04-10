const fs = require('fs');
const path = require('path');
const readline = require('readline');

const DB_DIR = 'C:\\Users\\Alnimr\\Desktop\\Database files\\New folder';
const OUTPUT_FILE = 'raw_articles.json';

async function processSqlFiles() {
    const files = fs.readdirSync(DB_DIR).filter(f => f.endsWith('.sql'));
    console.log(`Found ${files.length} SQL files. Processing in parallel...`);

    const results = [];
    
    const promises = files.map(async (file) => {
        const filePath = path.join(DB_DIR, file);
        const fileStream = fs.createReadStream(filePath);
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        let count = 0;
        for await (const line of rl) {
            // Surgical filtering: Search for ('post', with any quoting variation
            if (line.includes("'post'") || line.includes("'post',") || line.includes("('post',")) {
                results.push({
                    file: file,
                    raw: line.trim()
                });
                count++;
            }
        }
        console.log(`Finished ${file}: Found ${count} matching lines.`);
    });

    await Promise.all(promises);

    console.log(`Writing ${results.length} total raw lines to ${OUTPUT_FILE}...`);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
    console.log('Extraction complete.');
}

processSqlFiles().catch(err => {
    console.error('Error during extraction:', err);
    process.exit(1);
});
