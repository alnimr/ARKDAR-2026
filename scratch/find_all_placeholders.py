import json

file_path = r'c:\Users\Alnimr\Desktop\ARKDAR Platform\frontend\src\data\journal_data.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

placeholder_ids = []
for item in data:
    content_ar = item.get('content', {}).get('ar', '')
    if "قيد المراجعة" in content_ar or "undergoing review" in content_ar:
        placeholder_ids.append(item.get('id'))

print(f"Placeholder IDs found: {placeholder_ids}")
