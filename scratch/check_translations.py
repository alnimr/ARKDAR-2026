import json
import os

def check_keys():
    base_file = 'messages/ar.json'
    with open(base_file, 'r', encoding='utf-8') as f:
        base_data = json.load(f)
    
    locales = ['en.json', 'de.json', 'es.json']
    
    for locale in locales:
        file_path = os.path.join('messages', locale)
        print(f"Checking {file_path}...")
        with open(file_path, 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
            except Exception as e:
                print(f"  Error loading {file_path}: {e}")
                continue
                
        for section, keys in base_data.items():
            if section not in data:
                print(f"  Missing section: {section}")
                continue
            for key in keys:
                if key not in data[section]:
                    print(f"  Missing key in {section}: {key}")

if __name__ == "__main__":
    check_keys()
