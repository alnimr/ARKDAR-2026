import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

file_path = r'c:\Users\Alnimr\Desktop\ARKDAR Platform\frontend\src\data\journal_data.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Sort by id to be systematic
data.sort(key=lambda x: str(x.get('id', '')))

for item in data[:10]: # Check first 10
    id = item.get('id')
    title = item.get('title', {}).get('ar', 'Untitled')
    content = item.get('content', {}).get('ar', '')
    excerpt = item.get('excerpt', {}).get('ar', '')
    
    print(f"ID: {id}")
    print(f"Title: {title}")
    print(f"Excerpt: {excerpt[:100]}...")
    print(f"Content Start: {content[:300]}...")
    print("-" * 50)
