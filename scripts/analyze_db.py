import json
import re

def parse_sql_values(row_str):
    content = row_str.strip()
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
    return values

def analyze():
    input_file = r'C:\Users\Alnimr\Desktop\Database files\final_articles.json'
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    post_types = {}
    post_statuses = {}
    
    for entry in data:
        content_str = entry.get('content', '')
        if not content_str.startswith('('):
            continue
        try:
            vals = parse_sql_values(content_str)
            if len(vals) > 20:
                ptype = vals[20].strip("'\"")
                pstatus = vals[7].strip("'\"")
                post_types[ptype] = post_types.get(ptype, 0) + 1
                post_statuses[pstatus] = post_statuses.get(pstatus, 0) + 1
        except:
            continue

    print("Post Types:")
    for k, v in post_types.items():
        print(f"  {k}: {v}")
    print("\nPost Statuses:")
    for k, v in post_statuses.items():
        print(f"  {k}: {v}")

if __name__ == "__main__":
    analyze()
