import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

file_path = r'c:\Users\Alnimr\Desktop\ARKDAR Platform\frontend\src\data\journal_data.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

for item in data:
    if str(item.get('id')) == '2774':
        print(f"ID: {item.get('id')}")
        print(f"Title: {item.get('title', {}).get('ar')}")
        print(f"Content: {item.get('content', {}).get('ar', '')}")
        break
