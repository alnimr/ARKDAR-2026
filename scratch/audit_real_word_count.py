import json
import re

def strip_tags(text):
    # Remove all HTML tags
    clean = re.sub(r'<[^>]+>', '', text)
    # Remove weird elementor/wordpress comments
    clean = re.sub(r'/\*.*?\*/', '', clean, flags=re.DOTALL)
    # Remove extra whitespace
    clean = re.sub(r'\s+', ' ', clean).strip()
    return clean

file_path = r'c:\Users\Alnimr\Desktop\ARKDAR Platform\frontend\src\data\journal_data.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

zombie_ids = ['3105', '2340', '2341', '2342', '2343', '1913', '18']
report = []

for item in data:
    id = item.get('id')
    title_ar = item.get('title', {}).get('ar', 'Untitled')
    content_ar = item.get('content', {}).get('ar', '')
    
    clean_content_ar = strip_tags(content_ar)
    word_count_ar = len(clean_content_ar.split())
    
    report.append({
        "id": id,
        "is_zombie": id in zombie_ids,
        "title": title_ar,
        "ar_word_count": word_count_ar,
        "is_suspicious": word_count_ar < 100 and id not in zombie_ids,
        "content_preview": clean_content_ar[:100] + "..."
    })

suspicious = [r for r in report if r['is_suspicious']]

print(f"Total articles: {len(report)}")
print(f"Suspiciously short articles (<100 words): {len(suspicious)}")
print(json.dumps(suspicious, indent=2, ensure_ascii=False))
