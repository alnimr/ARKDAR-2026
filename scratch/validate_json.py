import json
import os

files = ['messages/ar.json', 'messages/en.json', 'messages/de.json', 'messages/es.json']

for f in files:
    full_path = os.path.join(r'C:\Users\Alnimr\Desktop\ARKDAR Platform', f)
    try:
        with open(full_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
            print(f"OK: {f} is valid JSON")
            # Check for specifically missing keys in Heritage
            if 'Heritage' in data:
                keys = ['sidebar_date', 'sidebar_author', 'sidebar_readTime', 'sidebar_toc']
                for k in keys:
                    if k in data['Heritage']:
                        print(f"  - Heritage.{k}: found")
                    else:
                        print(f"  MISSING: Heritage.{k}")
            else:
                print(f"  MISSING: Heritage namespace")
    except Exception as e:
        print(f"FAILED: {f}: {e}")
