import json
import re

def strip_tags(text):
    return re.sub(r'<[^>]+>', '', text).strip()

file_path = r'c:\Users\Alnimr\Desktop\ARKDAR Platform\frontend\src\data\journal_data.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

zombie_ids = ['3105', '2340', '2341', '2342', '2343', '1913', '18']
report = []

for item in data:
    id = item.get('id')
    if id in zombie_ids: continue
    
    title = item.get('title', {}).get('ar', 'Untitled')
    content_ar = item.get('content', {}).get('ar', '')
    clean_content = strip_tags(content_ar)
    
    report.append({
        "id": id,
        "title": title,
        "raw_len": len(content_ar),
        "clean_len": len(clean_content),
        "sample": clean_content[:150] + "..."
    })

# Check for articles where CLEAN content is less than 500 chars
short_report = [r for r in report if r['clean_len'] < 500]

print(f"Total non-zombie articles: {len(report)}")
print(f"Short articles (<500 clean chars): {len(short_report)}")
print(json.dumps(short_report, indent=2, ensure_ascii=False))
