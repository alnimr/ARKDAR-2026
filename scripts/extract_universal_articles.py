import re
import json
import os
import html
import urllib.parse
from datetime import datetime

def clean_elementor_content(content):
    """
    Cleans Elementor shortcodes and specific HTML artifacts.
    """
    if not content:
        return ""
    
    # 1. Remove Elementor shortcodes [elementor-template id="..."]
    content = re.sub(r'\[elementor-template.*?\]', '', content)
    
    # 2. Remove other common WP shortcodes
    content = re.sub(r'\[/?et_pb_.*?\]', '', content) 
    content = re.sub(r'\[/?vc_.*?\]', '', content)  
    
    # 3. Remove WP comments/blocks
    content = re.sub(r'<!-- /?wp:.*? -->', '', content)
    
    # 4. Remove generic WP classes and inline styles
    content = re.sub(r' class="wp-block-.*?"', '', content)
    content = re.sub(r' class="align.*?"', '', content)
    content = re.sub(r' style=".*?"', '', content)
    
    # 5. Handle empty headers
    content = re.sub(r'<(h[1-6])>\s*</\1>', '', content)
    
    # 6. Normalize whitespace
    content = re.sub(r'\s+', ' ', content).strip()
    
    return content

def slugify_ascii(text):
    """
    Converts a string (potentially Arabic/URL-encoded) to a clean ASCII-slug.
    """
    if not text:
        return ""
    
    if '%' in text:
        try:
            text = urllib.parse.unquote(text)
        except:
            pass
            
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    text = text.strip('-')
    
    return text

def parse_sql_row(row_str):
    """
    Parses a single row from an INSERT INTO ... VALUES (...) string.
    """
    values = []
    current = []
    in_quote = False
    quote_char = None
    escaped = False
    
    content = row_str.strip()
    if content.startswith('('): content = content[1:]
    if content.endswith(')'): content = content[:-1]
    
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
            elif char == quote_char:
                in_quote = False
                quote_char = None
            else:
                current.append(char)
        elif char == ',' and not in_quote:
            values.append("".join(current).strip())
            current = []
        else:
            current.append(char)
    values.append("".join(current).strip())
    
    cleaned_values = []
    for v in values:
        v_trimmed = v.strip()
        if (v_trimmed.startswith("'") and v_trimmed.endswith("'")) or (v_trimmed.startswith('"') and v_trimmed.endswith('"')):
            v_trimmed = v_trimmed[1:-1]
        v_final = v_trimmed.replace("\\'", "'").replace('\\"', '"').replace("\\r\\n", "\n").replace("\\n", "\n")
        cleaned_values.append(v_final)
        
    return cleaned_values

def split_sql_rows(rows_str):
    """
    Splits the content of a VALUES block into individual rows by counting parentheses.
    """
    rows = []
    current_row = []
    paren_count = 0
    in_quote = False
    quote_char = None
    escaped = False

    for char in rows_str:
        if escaped:
            current_row.append(char)
            escaped = False
            continue
        if char == '\\':
            current_row.append(char)
            escaped = True
            continue
        if char in ("'", '"'):
            if not in_quote:
                in_quote = True
                quote_char = char
            elif char == quote_char:
                in_quote = False
                quote_char = None
            current_row.append(char)
        elif char == '(' and not in_quote:
            paren_count += 1
            current_row.append(char)
        elif char == ')' and not in_quote:
            paren_count -= 1
            current_row.append(char)
            if paren_count == 0:
                rows.append("".join(current_row).strip())
                current_row = []
        elif paren_count > 0:
            current_row.append(char)
            
    return rows

def extract_from_file(file_path):
    """
    Extracts articles from a single SQL file.
    """
    db_name = os.path.basename(file_path)
    articles = []
    
    print(f"Processing {db_name}...")
    
    try:
        # We read by blocks to avoid memory issues with huge files
        # But for re.finditer with DOTALL, we need the whole content if possible.
        # 177MB is small enough for modern RAM.
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            
        # Find all INSERT INTO lines for the posts table
        # We use a lookahead to ensure we capture the whole VALUES block up to the terminating semicolon
        # which is usually followed by a newline or the end of the file/next statement.
        insert_matches = re.finditer(r"INSERT INTO\s+[`]?(\w*posts)[`]?\s+VALUES\s+(.*?);\s*(?=\n|INSERT INTO|CREATE TABLE|/\*|$)", content, re.DOTALL | re.IGNORECASE)
        
        found_any = False
        for match in insert_matches:
            found_any = True
            table_name = match.group(1)
            rows_data = match.group(2).strip()
            
            print(f"  - Found table {table_name}. Row data length: {len(rows_data)}")
            if len(rows_data) > 0:
                print(f"    Raw data start: {rows_data[:50]}...")
                print(f"    Raw data end  : ...{rows_data[-50:]}")
            
            rows = split_sql_rows(rows_data)
            print(f"    Found {len(rows)} split rows.")
            
            type_counts = {}
            for row_str in rows:
                try:
                    vals = parse_sql_row(row_str)
                    
                    if len(vals) < 21: continue
                    
                    post_type = vals[20].lower()
                    type_counts[post_type] = type_counts.get(post_type, 0) + 1
                    
                    if post_type in ['post', 'page']:
                        post_id = vals[0]
                        post_title = html.unescape(vals[5])
                        post_content = html.unescape(vals[4])
                        post_excerpt = html.unescape(vals[6])
                        post_status = vals[7]
                        post_name = vals[11]
                        post_date = vals[2]

                        clean_content = clean_elementor_content(post_content)
                        clean_title = post_title.strip()
                        
                        ascii_slug = slugify_ascii(post_name)
                        if not ascii_slug:
                            ascii_slug = slugify_ascii(post_title) or f"{post_type}-{post_id}"
                        
                        try:
                            date_obj = datetime.strptime(post_date, '%Y-%m-%d %H:%M:%S')
                            formatted_date = date_obj.strftime('%Y-%m-%d')
                        except:
                            formatted_date = post_date.split(' ')[0] if post_date else "2026-01-01"

                        image_match = re.search(r'<img.*?src="(.*?)"', post_content)
                        image = image_match.group(1) if image_match else "/images/journal/default.png"

                        article = {
                            "id": f"{db_name.split('.')[0]}_{post_id}",
                            "slug": ascii_slug,
                            "title": {
                                "ar": clean_title,
                                "en": clean_title,
                                "de": clean_title,
                                "es": clean_title
                            },
                            "content": {
                                "ar": clean_content,
                                "en": "<p>Content pending translation.</p>",
                                "de": "<p>Inhalt steht noch aus.</p>",
                                "es": "<p>Contenido pendiente de traducción.</p>"
                            },
                            "excerpt": {
                                "ar": post_excerpt or (re.sub(r'<.*?>', '', clean_content)[:160] + "..."),
                                "en": "Article from " + db_name,
                                "de": "Artikel aus " + db_name,
                                "es": "Artículo de " + db_name
                            },
                            "date": formatted_date,
                            "image": image,
                            "author": "ديوان آركدار",
                            "type": "article",
                            "status": post_status,
                            "language": "ar",
                            "source_db": db_name
                        }
                        articles.append(article)
                except Exception as e:
                    continue
        
        if not found_any:
            print(f"Warning: No 'posts' table found in {db_name}")
            
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        
    return articles

def main():
    DB_DIR = r"C:\Users\Alnimr\Desktop\Database files"
    OUTPUT_FILE = r"c:\Users\Alnimr\Desktop\ARKDAR Platform\frontend\src\data\articles.json"
    
    # 1. Load existing articles
    existing_by_slug = {}
    if os.path.exists(OUTPUT_FILE):
        try:
            with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
                articles = json.load(f)
                for a in articles:
                    existing_by_slug[a['slug']] = a
        except Exception as e:
            print(f"Warning: Could not load existing articles: {e}")

    # 2. Recursive search for .sql files
    sql_files = []
    for root, dirs, files in os.walk(DB_DIR):
        for file in files:
            if file.endswith(".sql"):
                sql_files.append(os.path.join(root, file))
    
    print(f"Found {len(sql_files)} SQL files in {DB_DIR}")
    
    # 3. Process each file
    total_new = 0
    file_stats = {}
    
    for sql_path in sql_files:
        articles = extract_from_file(sql_path)
        # Use relative path for reporting to distinguish between duplicates
        rel_path = os.path.relpath(sql_path, DB_DIR)
        file_stats[rel_path] = len(articles)
        
        for art in articles:
            # Merge logic: new articles with same slug overwrite old ones
            existing_by_slug[art['slug']] = art
            total_new += len(articles) # Corrected: total_new should increment by total articles from this file
            
    # 4. Final report
    print("\nExtraction Report:")
    print("------------------")
    for fname, count in file_stats.items():
        print(f"{fname}: {count} articles")
    print(f"Total entries processed: {total_new}")
    print(f"Unique articles in database: {len(existing_by_slug)}")
    print("------------------")
    
    # 5. Save results
    final_list = list(existing_by_slug.values())
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(final_list, f, ensure_ascii=False, indent=2)
        
    print(f"Saved total of {len(final_list)} articles to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
