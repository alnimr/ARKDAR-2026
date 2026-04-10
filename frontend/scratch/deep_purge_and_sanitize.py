import json
import re

def strip_tags(text):
    if not text: return ""
    # Remove Elementor specific CSS / JS comments
    text = re.sub(r'/\*.*?\*/', '', text, flags=re.DOTALL)
    # Remove all HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    # Remove multiple spaces/newlines
    text = re.sub(r'\s+', ' ', text).strip()
    return text

file_path = r'c:\Users\Alnimr\Desktop\ARKDAR Platform\frontend\src\data\journal_data.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# The 7 final zombie/placeholder IDs to remove
zombie_ids = ['3105', '2340', '2341', '2342', '2343', '1913', '18']

refined_data = []

for item in data:
    id = str(item.get('id', ''))
    if id in zombie_ids:
        continue
    
    # Sanitizing content and excerpts
    for lang in ['ar', 'en', 'de', 'es']:
        if lang in item['content']:
            item['content'][lang] = strip_tags(item['content'][lang])
        if lang in item['excerpt']:
            item['excerpt'][lang] = strip_tags(item['excerpt'][lang])
            
    refined_data.append(item)

# Save back to journal_data.json
with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(refined_data, f, indent=2, ensure_ascii=False)

print(f"Purged {len(data) - len(refined_data)} zombie articles.")
print(f"Remaining real articles: {len(refined_data)}")
