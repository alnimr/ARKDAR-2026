import json
import re

file_path = r'c:\Users\Alnimr\Desktop\ARKDAR Platform\frontend\src\data\journal_data.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

filler_ids = []
low_quality_ids = []

for item in data:
    item_id = item.get('id')
    content_ar = item.get('content', {}).get('ar', '')
    content_en = item.get('content', {}).get('en', '')
    title_ar = item.get('title', {}).get('ar', '')
    
    # Check for Lorem Ipsum or common placeholders
    placeholders = ['lorem ipsum', 'test post', 'مثال لمقال', 'نص تجريبي']
    is_filler = False
    for p in placeholders:
        if p.lower() in content_ar.lower() or p.lower() in content_en.lower():
            is_filler = True
            break
            
    if is_filler:
        filler_ids.append(item_id)
        continue

    # Check for extremely short content (less than 100 chars)
    if len(content_ar) < 100 and len(content_en) < 100:
        low_quality_ids.append({
            "id": item_id,
            "title": title_ar,
            "length": len(content_ar)
        })

print(f"Filler IDs: {filler_ids}")
print(f"Low Quality Items: {json.dumps(low_quality_ids, indent=2, ensure_ascii=False)}")
