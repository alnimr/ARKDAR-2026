import json

file_path = r'c:\Users\Alnimr\Desktop\ARKDAR Platform\frontend\src\data\journal_data.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

short_articles = []

for item in data:
    item_id = item.get('id')
    title = item.get('title', {}).get('ar', 'Untitled')
    content_ar = item.get('content', {}).get('ar', '')
    content_en = item.get('content', {}).get('en', '')
    
    # Define "Short" as less than 300 characters of content
    if len(content_ar) < 300 or len(content_en) < 300:
        short_articles.append({
            "id": item_id,
            "title": title,
            "ar_len": len(content_ar),
            "en_len": len(content_en),
            "excerpt": item.get('excerpt', {}).get('ar', '')[:50] + "..."
        })

print(f"Total articles found: {len(data)}")
print(f"Short/Pseudo-articles found: {len(short_articles)}")
print(json.dumps(short_articles, indent=2, ensure_ascii=False))
