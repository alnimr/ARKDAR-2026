import json
import os

def clean_sql_string(val):
    if val is None: return ""
    if (val.startswith("'") and val.endswith("'")) or (val.startswith('"') and val.endswith('"')):
        val = val[1:-1]
    return val.replace("\\'", "'").replace('\\"', '"').replace("\\r\\n", "\n").replace("\\n", "\n")

def parse_sql_values(content):
    content = content.strip()
    if content.startswith('('): content = content[1:]
    if content.endswith('),'): content = content[:-2]
    if content.endswith(');'): content = content[:-2]
    values = []
    current = []
    in_quote = False
    quote_char = None
    escaped = False
    for char in content:
        if escaped:
            current.append(char)
            escaped = False
            continue
        if char == '\\':
            current.append(char)
            escaped = True
            continue
        if char in ("'", '"'):
            if not in_quote:
                in_quote = True
                quote_char = char
                current.append(char)
            elif char == quote_char:
                in_quote = False
                quote_char = None
                current.append(char)
            else:
                current.append(char)
        elif char == ',' and not in_quote:
            values.append("".join(current).strip())
            current = []
        else:
            current.append(char)
    values.append("".join(current).strip())
    return [clean_sql_string(v) for v in values]

input_file = r'C:\Users\Alnimr\Desktop\Database files\final_articles.json'
with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

types = {}
statuses = {}
lengths = {}

for entry in data:
    content = entry.get('content', '')
    if not content.startswith('('): continue
    try:
        vals = parse_sql_values(content)
        l = len(vals)
        lengths[l] = lengths.get(l, 0) + 1
        if l > 20:
            t = vals[20]
            s = vals[7]
            types[t] = types.get(t, 0) + 1
            statuses[s] = statuses.get(s, 0) + 1
        else:
            pass
    except:
        continue

print(f"Total entries: {len(data)}")
print(f"Lengths distribution: {lengths}")
print(f"Types: {types}")
print(f"Statuses: {statuses}")
