import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

file_path = r'c:\Users\Alnimr\Desktop\ARKDAR Platform\frontend\src\data\journal_data.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

for item in data:
    id = item.get('id')
    title = item.get('title', {}).get('ar', 'Untitled')
    content = item.get('content', {}).get('ar', '')
    
    print(f"ID: {id}")
    print(f"Title: {title}")
    # Show more content to see if it's "incomplete"
    print(f"Content: {content[:1000]}")
    print("-" * 50)
