import json
import re
import os
import html
import urllib.parse

def clean_sql_string(val):
    if val is None:
        return ""
    # Remove leading/trailing quotes if it's a string
    if (val.startswith("'") and val.endswith("'")) or (val.startswith('"') and val.endswith('"')):
        val = val[1:-1]
    # Unescape SQL escapes
    val = val.replace("\\'", "'").replace('\\"', '"').replace("\\r\\n", "\n").replace("\\n", "\n")
    return val

def parse_sql_values(row_str):
    # Strip the leading '(' and trailing '),' or ');'
    content = row_str.strip()
    if content.startswith('('): content = content[1:]
    if content.endswith('),'): content = content[:-2]
    if content.endswith(');'): content = content[:-2]
    
    # Simple state machine to split by comma but respect quotes
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

def migrate():
    input_file = r'C:\Users\Alnimr\Desktop\Database files\final_articles.json'
    output_file = r'c:\Users\Alnimr\Desktop\ARKDAR Platform\frontend\src\data\journal_data.json'
    
    if not os.path.exists(input_file):
        print(f"Input file not found: {input_file}")
        return

    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    final_posts = []
    skipped_count = 0
    page_count = 0
    post_count = 0
    
    for entry in data:
        content_str = entry.get('content', '') or entry.get('raw_data', '')
        # Handle both list formats and single string formats if they appear
        if not content_str.strip().startswith('('):
            continue
            
        try:
            vals = parse_sql_values(content_str)
            # WordPress wp_posts schema mapping:
            # 0: ID, 1: post_author, 2: post_date, 4: post_content, 5: post_title, 6: post_excerpt, 7: post_status, 11: post_name (slug), 20: post_type
            if len(vals) < 21:
                skipped_count += 1
                continue
                
            post_status = vals[7]
            post_type = vals[20]
            
            # Include both posts and pages that are published
            if post_status == 'publish' and post_type in ['post', 'page']:
                post_id = vals[0]
                title = html.unescape(vals[5])
                content = html.unescape(vals[4])
                excerpt = html.unescape(vals[6])
                slug = vals[11]
                date = vals[2]
                
                if post_type == 'page':
                    page_count += 1
                else:
                    post_count += 1

                # Decode Arabic/Encoded slugs
                if '%' in slug:
                    try:
                        slug = urllib.parse.unquote(slug)
                    except:
                        pass
                
                # Robust sanitization
                # 1. Remove WP comments/blocks
                content = re.sub(r'<!-- /?wp:.*? -->', '', content)
                # 2. Remove generic WP classes and inline styles that might disrupt layout
                content = re.sub(r' class="wp-block-.*?"', '', content)
                content = re.sub(r' class="align.*?"', '', content)
                content = re.sub(r' style=".*?"', '', content)
                # 3. Handle empty columns/headers from Gutenberg
                content = re.sub(r'<h2></h2>', '', content)
                content = re.sub(r'<h3></h3>', '', content)
                # 4. Normalize whitespace
                content = re.sub(r'\s+', ' ', content).strip()
                
                # Extract first paragraph as excerpt if missing
                if not excerpt or len(excerpt.strip()) < 10:
                    first_para = re.search(r'<p>(.*?)</p>', content)
                    if first_para:
                        excerpt = re.sub(r'<.*?>', '', first_para.group(1))[:160] + "..."
                    else:
                        excerpt = re.sub(r'<.*?>', '', content)[:160] + "..."

                # Extract first image
                image_match = re.search(r'<img.*?src="(.*?)"', content)
                image = image_match.group(1) if image_match else "https://images.unsplash.com/photo-1599385310636-69a650d0354b?q=80&w=800"
                
                # Final post object matching JournalPost interface
                post = {
                    "id": post_id,
                    "slug": slug or f"{post_type}-{post_id}",
                    "categoryId": "heritage" if post_type == 'post' else "news",
                    "title": {
                        "ar": title,
                        "en": title,
                        "de": title,
                        "es": title
                    },
                    "excerpt": {
                        "ar": excerpt,
                        "en": excerpt,
                        "de": excerpt,
                        "es": excerpt
                    },
                    "content": {
                        "ar": content,
                        "en": content,
                        "de": content,
                        "es": content
                    },
                    "date": date.split(' ')[0],
                    "type": "article",
                    "image": image,
                    "author": "ARKDAR Heritage"
                }
                final_posts.append(post)
        except Exception as e:
            # print(f"Error parsing entry: {e}")
            continue

    # Sort by date descending
    final_posts.sort(key=lambda x: (x['date'] or ''), reverse=True)

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(final_posts, f, ensure_ascii=False, indent=2)
    
    print(f"Migration Complete:")
    print(f"- Total processed entries: {len(data)}")
    print(f"- Successfully migrated: {len(final_posts)}")
    print(f"  - Posts: {post_count}")
    print(f"  - Pages: {page_count}")
    print(f"- Saved to: {output_file}")

if __name__ == "__main__":
    migrate()
