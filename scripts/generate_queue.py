import json
import os

json_path = r'c:\Users\Alnimr\Desktop\ARKDAR Platform\frontend\src\data\articles.json'
output_path = r'c:\Users\Alnimr\Desktop\ARKDAR Platform\translation_queue.md'

with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

with open(output_path, 'w', encoding='utf-8') as f:
    f.write("# 📋 قائمة مراجعة الترجمة (Translation Queue)\n\n")
    f.write("هذه القائمة تحتوي على الـ 67 مقالاً المستخرجة. سنستخدمها لمتابعة تقدم عملية الترجمة.\n\n")
    for article in data:
        title_ar = article.get('title', {}).get('ar', 'No Title')
        slug = article.get('slug', 'no-slug')
        source = article.get('source_db', 'Unknown')
        f.write(f"- [ ] {title_ar} (Slug: `{slug}`, Source: `{source}`)\n")

print(f"Created translation queue with {len(data)} items.")
