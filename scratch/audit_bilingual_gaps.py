import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

file_path = r'c:\Users\Alnimr\Desktop\ARKDAR Platform\frontend\src\data\journal_data.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

for item in data:
    id = item.get('id')
    title = item.get('title', {}).get('ar', 'Untitled')
    ar_content = item.get('content', {}).get('ar', '')
    en_content = item.get('content', {}).get('en', '')
    
    if len(ar_content) < 500 or len(en_content) < 500:
        print(f"ID: {id}")
        print(f"Title: {title}")
        print(f"AR Len: {len(ar_content)}")
        print(f"EN Len: {len(en_content)}")
        print("-" * 30)
