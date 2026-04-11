import json

file_path = r'c:\Users\Alnimr\Desktop\ARKDAR Platform\frontend\src\data\journal_data.json'
ids_to_remove = ['2257', '28', '29', '30', '503', '1324', '1325', '19', '20', '21']

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

original_len = len(data)
data = [item for item in data if str(item.get('id', '')) not in ids_to_remove]
new_len = len(data)

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Removed {original_len - new_len} zombie/filler articles. IDs: {ids_to_remove}")
