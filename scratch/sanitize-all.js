const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../frontend/src/data/articles.json');
const articles = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const LANGS = ['ar', 'en', 'de', 'es'];

const repairField = (obj, field) => {
  const result = {};
  LANGS.forEach(lang => {
    // If field exists but lang is missing/null/undefined, set to ""
    // If field doesn't exist, we'll create it with "" for all langs
    const val = (obj && obj[field] && obj[field][lang]) ? obj[field][lang] : "";
    result[lang] = (val === null || val === undefined) ? "" : val;
  });
  return result;
};

const sanitized = articles.map(art => {
  return {
    id: art.id || `arkdar_gen_${Math.random().toString(36).substr(2, 9)}`,
    slug: art.slug || "",
    status: art.status || "published",
    title: repairField(art, 'title'),
    content: repairField(art, 'content'),
    excerpt: repairField(art, 'excerpt'),
    // Preserve other fields if they exist but don't force them
    image: art.image || "",
    date: art.date || new Date().toISOString().split('T')[0],
    type: art.type || "article",
    category: art.category || "heritage"
  };
});

fs.writeFileSync(filePath, JSON.stringify(sanitized, null, 2), 'utf8');
console.log(`Sanitized ${sanitized.length} articles with FULL OBJECT COMPLETION.`);
