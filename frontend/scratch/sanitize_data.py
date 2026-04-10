import json
import re

file_path = r'c:\Users\Alnimr\Desktop\ARKDAR Platform\frontend\src\data\journal_data.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# 1. Remove ID 3102
data = [item for item in data if item.get('id') != '3102']

# 2. Sanitize content and fix ID 3416 excerpt
for item in data:
    # Fix ID 3416 excerpt
    if item.get('id') == '3416':
        item['excerpt'] = {
            "ar": "دليل شامل يأخذك من أولى خطواتك في عالم الرماية التقليدية حتى تصبح فارساً متمكناً في 30 يوماً.",
            "en": "A comprehensive guide that takes you from your first steps in traditional archery to becoming a skilled knight in 30 days.",
            "de": "Ein umfassender Leitfaden, der Sie von Ihren ersten Schritten im traditionellen Bogenschießen in 30 Tagen zu einem versierten Ritter macht.",
            "es": "Una guía completa que te lleva desde tus primeros pasos en el tiro con arco tradicional hasta convertirte en un caballero experto en 30 días."
        }

    # Sanitize content
    for lang in ['ar', 'en', 'de', 'es']:
        if lang in item['content']:
            content = item['content'][lang]
            
            # Remove add-to-cart links and button containers
            content = re.sub(r'<a[^>]+add-to-cart[^>]+>.*?</a>', '', content, flags=re.IGNORECASE | re.DOTALL)
            # Remove price tags like <bdi>5,90 kr</bdi>
            content = re.sub(r'<bdi>.*?</bdi>', '', content, flags=re.IGNORECASE)
            # Remove external product images or raw WordPress URLs if they look like artifacts
            content = re.sub(r'https://arkdar\.com/wp-content/uploads/.*?\.jpg', '', content)
            
            # Remove empty list items or containers left behind
            content = content.replace('<li>  </li>', '')
            content = content.replace('<ul> </ul>', '')
            
            # Clean up double spaces or residue
            content = re.sub(r'\s{2,}', ' ', content).strip()
            
            item['content'][lang] = content

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Sanitization complete.")
