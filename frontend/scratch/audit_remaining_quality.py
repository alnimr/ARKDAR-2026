import json
import sys

# Force UTF-8 output for Windows console
sys.stdout.reconfigure(encoding='utf-8')

file_path = r'c:\Users\Alnimr\Desktop\ARKDAR Platform\frontend\src\data\journal_data.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

remove_ids = ['3105', '2340', '2341', '2342', '2343', '1913', '18']
remaining = [item for item in data if str(item.get('id', '')) not in remove_ids]

quality_report = []

for item in remaining:
    title = item.get('title', {}).get('ar', 'Untitled')
    content_ar = item.get('content', {}).get('ar', '')
    excerpt_ar = item.get('excerpt', {}).get('ar', '')
    
    quality_report.append({
        "id": item.get('id'),
        "title": title,
        "content_length": len(content_ar),
        #"excerpt": excerpt_ar[:50], # Truncate to avoid too much text
        "is_short": len(content_ar) < 600
    })

print(json.dumps(quality_report, indent=2, ensure_ascii=False))
