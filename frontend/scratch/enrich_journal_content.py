import json

file_path = r'c:\Users\Alnimr\Desktop\ARKDAR Platform\frontend\src\data\journal_data.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Enrichment logic
def enrich_article(item):
    id = item.get('id')
    title_ar = item.get('title', {}).get('ar', 'Untitled')
    title_en = item.get('title', {}).get('en', 'Untitled')
    
    # Generate high-quality excerpts based on title
    if "Archery" in title_en or "الرماية" in title_ar:
        item['excerpt']['ar'] = f"استكشف أبعاداً جديدة في فن الرماية العربية العريقة، حيث يلتقي التركيز الروحي مع البراعة القتالية في رحلة لإحياء تراث الفرسان الأوائل."
        item['excerpt']['en'] = f"Explore new dimensions of ancient Arabic archery, where spiritual focus meets combat prowess in a journey to revive the legacy of the original knights."
    elif "Horse" in title_en or "الخيل" in title_ar:
        item['excerpt']['ar'] = f"علاقة الفارس بجواده هي جوهر الفروسية النخبوية. نغوص في أسرار اختيار وتدريب الخيل الأصيلة لتكون شريكاً حقيقياً في الميدان."
        item['excerpt']['en'] = f"The relationship between a rider and their horse is the core of elite horsemanship. We dive into the secrets of choosing and training noble steeds."
    else:
        item['excerpt']['ar'] = f"نافذة حصرية من ديوان أركدار تسلط الضوء على جوانب خفية من التراث والفروسية، مصاغة بأسلوب يجمع بين عراقة الماضي ودقة العصر."
        item['excerpt']['en'] = f"An exclusive window from the ARKDAR vault highlighting hidden aspects of heritage and horsemanship, crafted to blend past traditions with modern precision."

    # Add Elite Headers and Footers to Content
    premium_intro_ar = f"<p>باسم الله، نستهل حديثنا عن جزء أصيل من هويتنا الفروسية. في أركدار، نحن لا ندرِّس مجرد رياضة، بل نبني جسراً ثقافياً يربط بين نبل الماضي وتطلعات المستقبل.</p>"
    premium_outro_ar = f"<h2>تجلِّيات الفارس</h2><p>ختاماً، تبقى هذه المعرفة أمانة في أعناق من يسعون للتميز. نحن ندعوك للانضمام إلى مياديننا لتجسيد هذه القيم واقعاً ملموساً يفيض بالعزة والإقدام.</p>"
    
    premium_intro_en = f"<p>In the name of heritage and excellence, we explore an essential part of our equestrian identity. At ARKDAR, we don't just teach a sport; we build a cultural bridge connecting the nobility of the past with the aspirations of the future.</p>"
    premium_outro_en = f"<h2>The Knight's Manifest</h2><p>In conclusion, this knowledge remains a trust for those who seek excellence. We invite you to join our arenas to embody these values as a tangible reality filled with pride and courage.</p>"

    # Update content by wrapping the existing cleaned text
    if item['content'].get('ar'):
        item['content']['ar'] = f"{premium_intro_ar}\n{item['content']['ar']}\n{premium_outro_ar}"
    if item['content'].get('en'):
        item['content']['en'] = f"{premium_intro_en}\n{item['content']['en']}\n{premium_outro_en}"
        
    return item

# Apply enrichment to all 24 real articles
enriched_data = [enrich_article(item) for item in data]

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(enriched_data, f, indent=2, ensure_ascii=False)

print(f"Successfully enriched {len(enriched_data)} articles with premium heritage context.")
