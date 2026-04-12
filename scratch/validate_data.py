import json
import os

def validate_articles():
    file_path = 'src/data/articles.json'
    if not os.path.exists(file_path):
        print(f"Error: {file_path} not found.")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        try:
            articles = json.load(f)
        except Exception as e:
            print(f"JSON Syntax Error: {e}")
            return

    slugs = {}
    ids = set()
    errors = []

    print(f"Total articles found: {len(articles)}")

    for index, art in enumerate(articles):
        # Check ID
        art_id = art.get('id')
        if not art_id:
            errors.append(f"Index {index}: Missing ID")
        elif art_id in ids:
            errors.append(f"Index {index}: Duplicate ID '{art_id}'")
        else:
            ids.add(art_id)

        # Check Slug
        slug = art.get('slug')
        if not slug:
            errors.append(f"Index {index} (ID: {art_id}): Missing Slug")
        elif slug in slugs:
            errors.append(f"Index {index} (ID: {art_id}): Duplicate Slug '{slug}' (Previous at Index {slugs[slug]})")
        else:
            slugs[slug] = index

        # Check Title Structure
        title = art.get('title')
        if not title:
            errors.append(f"Index {index} (ID: {art_id}): Missing Title object")
        elif not isinstance(title, dict):
            errors.append(f"Index {index} (ID: {art_id}): Title is not an object")
        else:
            for lang in ['ar', 'en', 'de', 'es']:
                if not title.get(lang):
                    # This is a warning/minor error depending on fallback logic
                    pass

    if errors:
        print("\nValidation Errors Found:")
        for err in errors[:20]: # Show first 20
            print(f" - {err}")
        if len(errors) > 20:
            print(f" ... and {len(errors) - 20} more errors.")
    else:
        print("\nNo critical validation errors found (Slugs and IDs are unique).")

if __name__ == "__main__":
    validate_articles()
