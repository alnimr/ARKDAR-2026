import fs from 'fs';
import path from 'path';

const JOURNAL_DATA_PATH = 'c:/Users/Alnimr/Desktop/ARKDAR Platform/frontend/src/data/journal_data.json';
const OUTPUT_PATH = 'c:/Users/Alnimr/Desktop/ARKDAR Platform/frontend/src/data/articles.json';

// Premium posts from mockJournal.ts (simplified for the script)
// (Same as before, truncated for brevity in this scratch script block)
const premiumPosts = [
  // ... (keeping the 6 premium posts I defined earlier)
  {
    id: "1",
    slug: "reclaiming-mamluk-legacy-archery",
    type: "article",
    categoryId: "heritage",
    title: {
      ar: "استعادة إرث المماليك: فنون الرماية من على ظهر الخيل",
      en: "Reclaiming the Mamluk Legacy: Archery from Horseback",
      de: "Das Erbe der Mamluken zurückgewinnen: Bogenschießen zu Pferd",
      es: "Recuperando el legado mameluco: tiro con arco a caballo"
    },
    excerpt: {
      ar: "نظرة عميقة في التقنيات العسكرية التي جعلت من الفرسان المماليك قوة لا تقهر في العصور الوسطى.",
      en: "A deep dive into the military techniques that made Mamluk knights an invincible force in the Middle Ages.",
      de: "Ein tiefer Einblick in die Militärtechniken, die die mamelukischen Ritter im Mittelalter zu einer unbesiegbaren Macht machten.",
      es: "Una inmersión profunda en las técnicas militares que convirtieron a los caballeros mamelucos en una fuerza invencible en la Edad Media."
    },
    content: {
      ar: "فنون القتال المملوكية لم تكن مجرد مهارات بدنية، بل كانت نظاماً روحياً وعقلياً متكاملاً يعرف بـ 'الفروشية'. في هذا المقال، نستكشف كيف أعاد فريق ARKDAR إحياء هذه الممارسات.\n\nمن خلال دراسة المخطوطات القديمة مثل كتاب 'منية الطُلاب في معرفة رَمي السِّهام'، تمكنا من استخلاص الزوايا الصحيحة للرمي وتوقيتات الحركة التي تتوافق مع إيقاع الحصان العربي. الرماية من فوق ظهر الخيل تتطلب تركيزاً يفوق الرماية التقليدية، حيث يصبح القوس امتداداً للنفس، والحصان امتداداً للإرادة.\n\nنحن في أكاديمية ARKDAR لا نكتفي بالمحاكاة التاريخية، بل نطبق هذه الدروس في بيئة تدريب عصرية تجمع بين الأصالة والاحترافية الرياضية العالية.",
      en: "Mamluk martial arts were not just physical skills, but an integrated spiritual and mental system known as 'Furusiyya'. In this article, we explore how the ARKDAR team has revived these practices.\n\nBy studying ancient manuscripts such as 'Munyat al-Tullab', we were able to extract the correct shooting angles and timing of movement that match the rhythm of the Arabian horse. Archery from horseback requires concentration beyond conventional archery, where the bow becomes an extension of the soul and the horse an extension of the will.\n\nAt ARKDAR academy, we don't just stop at historical simulation; we apply these lessons in a modern training environment that combines authenticity and high sports professionalism.",
      de: "Die Kampfkunst der Mamluken war nicht nur eine körperliche Fertigkeit, sondern ein ganzheitliches System. Bei ARKDAR lassen wir diese Traditionen wieder aufleben.",
      es: "Las artes marciales mamelucas no eran solo habilidades físicas, sino un sistema integral. En ARKDAR, revivimos estas tradiciones."
    },
    image: "https://images.unsplash.com/photo-1605281317010-fe5ffe798156?q=80&w=800",
    date: "2025-12-01",
    author: "Dr. Ahmed Mansour",
    featured: true
  },
  {
    id: "2",
    slug: "the-art-of-the-ottoman-bow",
    type: "article",
    categoryId: "craftsmanship",
    title: {
      ar: "هندسة القوس العثماني: عبقرية التصميم التاريخي",
      en: "Engineering the Ottoman Bow: Genius of Historical Design",
      de: "Die Technik des osmanischen Bogens: Genie des historischen Designs",
      es: "La ingeniería del arco otomano: Genio del diseño histórico"
    },
    excerpt: {
      ar: "لماذا يعتبر القوس العثماني المركب أعقد آلة قوية في تاريخ الأسلحة التقليدية؟",
      en: "Why is the Ottoman composite bow considered the most complex powerful machine in the history of traditional weapons?",
      de: "Warum gilt der osmanische Kompositbogen als die komplexeste Kraftmaschine in der Geschichte der traditionellen Waffen?",
      es: "¿Por qué el arco compuesto otomano se considera la máquina más compleja y potente de la historia de las armas tradicionales?"
    },
    content: {
      ar: "القوس العثماني هو ذروة ما وصل إليه ابتكار الإنسان في استخدام المواد الطبيعية لتوليد طاقة حركية هائلة. يتكون هذا القوس من طبقات مدروسة بعناية من الخشب والقرن والوتر، يتم تجميعها وترميمها في عمليات قد تستغرق عاماً كاملاً من التجفيف والضبط.\n\nفي مختبرات ARKDAR، قمنا بتحليل هذه المنحنيات المعقدة لفهم كيف يوزع القوس الضغط بشكل مثالي. الجمال في القوس العثماني ليس فقط في كفاءته القتالية، بل في كونه قطعة فنية تعكس فلسفة التوازن بين القوة والمرونة. نحن نوفر لطلابنا فرصة فريدة ليس فقط لاستخدام هذه الأقواس، بل لفهم أسرار صناعتها وصيانتها.",
      en: "The Ottoman bow is the pinnacle of human innovation in using natural materials to generate enormous kinetic energy. This bow consists of carefully studied layers of wood, horn, and sinew, assembled in processes that can take a whole year of drying and adjustment.\n\nIn ARKDAR labs, we analyzed these complex curves to understand how the bow distributes pressure perfectly. The beauty of the Ottoman bow is not only in its combat efficiency but in its being an artistic piece reflecting the philosophy of balance between strength and flexibility. We provide our students a unique opportunity not only to use these bows but to understand the secrets of their manufacture and maintenance.",
      de: "Der osmanische Bogen ist ein Meisterwerk der Ingenieurskunst. Aus Naturmaterialien gefertigt, bietet er enorme Durchschlagskraft. Entdecken Sie die Geheimnisse seiner Herstellung.",
      es: "El arco otomano es una obra maestra de la ingeniería. Fabricado con materiales naturales, ofrece una potencia enorme. Descubre los secretos de su fabricación."
    },
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=800",
    date: "2025-11-25",
    author: "Eng. Mariam Zaid"
  },
  {
    id: "3",
    slug: "the-modern-knight-ethics",
    type: "article",
    categoryId: "lifestyle",
    title: {
      ar: "أخلاقيات الفارس المعاصر: القوة والسكينة",
      en: "Ethics of the Modern Knight: Strength and Stillness",
      de: "Ethik des modernen Ritters: Stärke und Stille",
      es: "Ética del caballero moderno: fuerza y serenidad"
    },
    excerpt: {
      ar: "استكشاف فلسفة 'النبل الرقمي' وكيف نطبق قيم الفروسية القديمة في حياتنا اليومية.",
      en: "Exploring the philosophy of 'Digital Nobility' and how we apply ancient equestrian values to our daily lives.",
      de: "Erforschung der Philosophie des 'digitalen Adels' und wie wir alte ritterliche Werte in unserem täglichen Leben anwenden.",
      es: "Explorando la filosofía de la 'nobleza digital' y cómo aplicamos los antiguos valores de la caballería en nuestra vida diaria."
    },
    content: {
      ar: "الفروسية ليست مجرد ركوب خيل، بل هي حالة من الانضباط الذاتي والوعي المستمر. في عصر السرعة والتشتت الرقمي، يجد طلاب ARKDAR في تدريبات الرماية والفروسية ملاذاً لاستعادة التركيز وبناء شخصية متزنة.\n\nالقيم التي نغرسها - الصبر، الاحترام، الحكمة، والشجاعة - هي المحرك الحقيقي وراء كل سهم يطلق وكل صهوة تعلوها. نحن نؤمن أن 'الفارس الحقيقي' هو من يمتلك القوة لحماية الآخرين، والسكينة للتحكم في غضبه، والحكمة لاتخاذ القرار الصحيح في أصعب اللحظات.\n\nهذا المقال يغوص في منهجية 'ARKDAR Way' لبناء الإنسان قبل المقاتل.",
      en: "Knightly behavior is not just about horse riding; it's a state of self-discipline and continuous awareness. In an era of speed and digital distraction, ARKDAR students find in archery and equestrian training a refuge to regain focus and build a balanced personality.\n\nThe values we instill—patience, respect, wisdom, and courage—are the true driver behind every arrow shot and every mount ridden. We believe that a 'true knight' is one who possesses the strength to protect others, the stillness to control anger, and the wisdom to make the right decision in the most difficult moments.\n\nThis article dives into the 'ARKDAR Way' methodology of building the human before the fighter.",
      de: "Ritterlichkeit ist eine Lebenseinstellung. Bei ARKDAR lernen wir Disziplin und Fokus durch Bogenschießen und Reiten.",
      es: "La caballería es una actitud ante la vida. En ARKDAR aprendemos disciplina y enfoque mediante el tiro con arco y la equitación."
    },
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
    date: "2025-11-10",
    author: "Omar Bin Sulaiman"
  },
  {
    id: "4",
    slug: "horseback-archery-bootcamp-30-days",
    type: "article",
    categoryId: "equestrian",
    title: {
      ar: "معسكر الرماية من ظهر الخيل: رحلة الـ 30 يوماً",
      en: "Horseback Archery Bootcamp: The 30-Day Journey",
      de: "Bogenschießen zu Pferde: Die 30-Tage-Reise",
      es: "Tiro con arco a caballo: El viaje de 30 días"
    },
    excerpt: {
      ar: "برنامج تدريبي مكثف للمبتدئين للتحول من هاوٍ إلى فارس يجيد التعامل مع القوس العثماني.",
      en: "Intensive training program for beginners to transform from an amateur into a knight proficient in handling the Ottoman bow.",
      de: "Intensives Trainingsprogramm für Anfänger, um sich vom Amateur zum fähigen Bogenschützen zu entwickeln.",
      es: "Programa de entrenamiento intensivo para principiantes para transformarse de un aficionado en un caballero capaz."
    },
    content: {
      ar: "هل تساءلت يوماً كيف تبدأ رحلتك في عالم الرماية التاريخية؟ هذا الدليل يلخص تجربة معسكرنا المكثف.\n\n<h2>الأسبوع الأول: بناء الأساس</h2>\nنبدأ بالرماية الأرضية لإتقان السحب دون توتر، والرمية التاريخية 'الإفلات بالإبهام' التي تعطي الفارس سرعة فائقة في الإطلاق، وكيفية التنفس بعمق للوصول لحالة من السكون وسط صخب الميدان.\n\n<h2>الأسبوع الثاني: لغة جسد الخيل</h2>\nهنا تبدأ علاقتك مع شريكك؛ الحصان. نتعلم القراءة السيميائية لحركات الخيل، وكيفية التحكم في مساره بضغط الساقين دون الحاجة للأعنة، حيث ستكون يداك مشغولة بالقوس والسهم. الفارس الحقيقي يقود حصانه بعقله وقلبه قبل أطرافه.\n\n<h2>الأسبوع الثالث: التزامن الحركي</h2>\nالمرحلة الأكثر إثارة؛ الرماية أثناء 'الخبب' و'العدو'. نبدأ التدريب على سحب الوتر بالتزامن مع لحظة ارتفاع حوافر الحصان الأربعة عن الأرض (لحظة انعدام التوازن)، وهي اللحظة الوحيدة التي يكون فيها الجسد مستقراً في الهواء, والهدف في أوضح حالاته.\n\n<h2>الأسبوع الرابع: تعميد الفارس</h2>\nالأيام الأخيرة هي اختبار للتركيز تحت الضغط. الرماية المتتابعة على أهداف متعددة، رمية 'البارثيين' (الرماية للخلف)، وإطلاق السهام في مسارات متعرجة. بنهاية اليوم الثلاثين، لن تكون مجرد رامي سهام، بل ستكون 'فارساً' أدرك سر التوازن بين القوة والهدوء.",
      en: "Have you ever wondered how to start your journey in the world of historical archery? This guide summarizes our intensive bootcamp experience.\n\n<h2>Week One: Building the Foundation</h2>\nWe start with ground archery to master the draw without tension, the historical 'thumb ring release' that gives the knight superior firing speed, and how to breathe deeply to reach a state of stillness amidst the field's chaos.\n\n<h2>Week Two: Equine Body Language</h2>\nHere begin your relationship with your partner; the horse. We learn the semiotic reading of the horse's movements, how to control its motion with leg pressure without needing reins, as your hands will be occupied with the bow and arrow. A true knight guides his horse with his mind and heart before his limbs.\n\n<h2>Week Three: Kinetic Synchronization</h2>\nThe most exciting phase; shooting while 'trotting' and 'cantering.' We begin training to draw the string in synchronization with the moment the horse's four hooves leave the ground (the zero-balance moment). This is the only moment the body is stable in the air, and the target is at its clearest.\n\n<h2>Week Four: The Knight's Baptism</h2>\nThe final days are a test of focus under pressure. Sequential shooting at multiple targets, the Parthian Shot, and launching arrows in winding paths. By the end of the thirtieth day, you won't just be an archer; you will be a 'Knight' who has realized the secret of balance between power and calm.",
      de: "Bogenschießen zu Pferde in 30 Tagen. Eine Reise zur Meisterschaft.",
      es: "Tiro con arco a caballo en 30 días. Un viaje hacia la maestría."
    },
    image: "https://images.unsplash.com/photo-1461772728878-1875b862c1cd?q=80&w=800",
    date: "2025-11-15",
    author: "Ismail Abdel-Haq"
  },
  {
    id: "5",
    slug: "the-arabian-horse-legacy-of-beauty-and-strength",
    type: "article",
    categoryId: "equestrian",
    title: {
      ar: "الحصان العربي: إرث من الجمال والقوة الخالدة",
      en: "The Arabian Horse: A Legacy of Timeless Beauty and Strength",
      de: "Das Araberpferd: Ein Erbe von zeitloser Schönheit und Kraft",
      es: "El caballo árabe: Un legado de belleza y fuerza atemporal"
    },
    excerpt: {
      ar: "كيف تشكلت أقوى وأجمل سلالات الخيول في الصحراء العربية وكيف ندمجها في تدريباتنا.",
      en: "How the strongest and most beautiful horse breeds were formed in the Arabian desert and how we integrate them into our training.",
      de: "Wie die stärksten und schönsten Pferderassen der arabischen wüste entstanden sind und wie wir sie in unser Training einbinden.",
      es: "Cómo se formaron las razas de caballos más fuertes y hermosas en el desierto árabe y cómo las integramos en nuestro entrenamiento."
    },
    content: {
      ar: "يعتبر الحصان العربي قمة الأناقة والذكاء في عالم الخيول. بفضل تاريخه الذي يمتد لآلاف السنين في بيئة شبه الجزيرة العربية القاسية، طور هذا النسل قدرات استثنائية على التحمل والمرونة، إضافة إلى ارتباط وثيق وعاطفي بالبشر الذين شاركوه الخيام في ليالي الصحراء الباردة.\n\nمن الناحية الجسدية، يتميز الحصان العربي برأسه المقعر المنحوت، وظهره القصير، وذيله المرتفع بفخر، مما يجعله أيقونة لا تخطئها العين في أي مضمار. كما أن كثافة عظامه وقوة هيكله تجعله مناسباً جداً لتحمل الصدمات أثناء الرماية والقتال التكتيكي.\n\nفي أكاديميات ARKDAR، نحن لا نرى في الحصان مجرد مطية، بل هو شريك فاعل في التدريب. نعتمد بشكل كبير على سلالات الخيل العربية والمختلطة لقدرتها العالية على التعلم وسرعة استجابتها لمرونة الفارس أثناء الرماية بالأسلحة التاريخية.",
      en: "The Arabian horse is considered the pinnacle of elegance and intelligence in the equine world. Thanks to its history spanning thousands of years in the harsh environment of the Arabian Peninsula, this breed developed exceptional endurance and flexibility, in addition to a close and emotional bond with humans who shared their tents on cold desert nights.\n\nPhysically, the Arabian horse is distinguished by its finely chiseled concave head, short back, and proudly carried high tail, making it an unmistakable icon in any arena. The density of its bones and the strength of its structure also make it very suitable for absorbing shocks during archery and tactical combat.\n\nAt ARKDAR academies, we do not view the horse as a mere mount, but as an active partner in training. We rely heavily on pure Arabian and crossbred horses for their high capacity to learn and their quick response to the rider's flexibility while shooting historical weapons.",
      de: "Das Araberpferd gilt als Inbegriff von Elegance und Intelligenz in der Pferdewelt. Dank seiner jahrtausendelangen Geschichte in der rauen Umgebung der Arabischen Halbinsel entwickelte diese Rasse außergewöhnliche Ausdauer und Flexibilität.\n\nKörperlich zeichnet sich das Araberpferd durch seinen fein gemeißelten konkaven Kopf, den kurzen Rücken und den stolz getragenen hohen Schweif aus.\n\nIn den ARKDAR-Akademien betrachten wir das Pferد nicht nur als Reittier, sondern als aktiven Partner im Training. Wir verlassen uns stark auf arabische Pferde wegen ihrer hohen Lernfähigkeit.",
      es: "El caballo árabe está considerado el pináculo de la elegancia y la inteligencia en el mundo ecuestre. Gracias a su historia que abarca miles de años en el duro entorno de la Península Arábiga, esta raza desarrolló una resistencia y flexibilidad excepcionales.\n\nFísicamente, el caballo árabe se distingue por su cabeza cóncava finamente cincelada, dorso corto y cola alta y llevada con orgullo.\n\nEn las academias ARKDAR, no vemos al caballo como una simple montura, sino como un socio activo en el entrenamiento. Dependemos en gran medida de los caballos árabes por su alta capacidad de aprendizaje."
    },
    image: "https://images.unsplash.com/photo-1553532434-5ab5b6b84993?q=80&w=800",
    date: "2025-11-05",
    author: "Saleh Almuhairi"
  },
  {
    id: "6",
    slug: "comprehensive-handbook-mamluk-archery",
    type: "download",
    categoryId: "heritage",
    title: {
      ar: "الدليل الشامل للرماية المملوكية (ملف PDF)",
      en: "Comprehensive Handbook of Mamluk Archery (PDF)",
      de: "Umfassendes Handbuch des Mamlukischen Bogenschießens (PDF)",
      es: "Manual Integral de Tiro con Arco Mameluco (PDF)"
    },
    excerpt: {
      ar: "احصل على نسختك المجانية من الكتيب التعريفي الذي يشرح تاريخ وأساسيات القوس العثماني والمملوكي.",
      en: "Get your free copy of the introductory booklet explaining the history and basics of the Ottoman and Mamluk bow.",
      de: "Holen Sie sich Ihr kostenloses Exemplar der Einführungsbroschüre, die die Geschichte und Grundlagen des osmanischen und mamlukischen Bogens erklärt.",
      es: "Obtenga su copia gratuita del folleto introductorio que explica la historia y los conceptos básicos del arco otomano y mameluco."
    },
    content: {
      ar: "يقدم هذا الدليل المرجعي المجاني عصارة سنوات من البحث في المخطوطات القديمة والتجارب العملية. يحتوي الملف على توضيحات مصورة للوضعيات الصحيحة للرماية، أنواع السهام التاريخية، وطرق الصيانة للحفاظ على أداء القوس.\n\nسواء كنت مبتدئاً أو محترفاً، ستجد في هذا الدليل ما يعزز معرفتك ويوجهك نحو إتقان الفنون القتالية التاريخية بطرق علمية مدروسة وموثقة.",
      en: "This free reference guide offers the essence of years of research into ancient manuscripts and practical experiments. The file contains illustrated explanations of correct shooting postures, types of historical arrows, and maintenance methods to preserve the bow's performance.\n\nWhether you are a beginner or a professional, you will find in this guide what enhances your knowledge and guides you towards mastering historical martial arts in scientific, researched, and documented ways.",
      de: "Dieses kostenlose Nachschlagewerk bietet die Essenz jahrelanger Forschung in alten Manuskripten und praktischen Experimenten. Die Datei enthält bebilderte Erklärungen der korrekten Schusshaltung und Arten historischer Pfeile.\n\nEgal, ob Sie Anfänger oder Profi sind, in diesem Leitfaden finden Sie Wissen zur Beherrschung der historischen Kampfkünste.",
      es: "Esta guía de referencia gratuita ofrece la esencia de años de investigación en manuscritos antiguos y experimentos prácticos. El archivo contiene explicaciones ilustradas sobre las posturas de tiro correctas y los tipos de flechas históricas.\n\nYa sea usted un principiante o un profesional, encontrará en esta guía los conocimientos para dominar las artes marciales históricas."
    },
    image: "https://images.unsplash.com/photo-1582216503943-7f6424b9a71f?q=80&w=800",
    date: "2025-10-20",
    downloadUrl: "#"
  }
];

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')  // Remove all non-word chars
    .replace(/--+/g, '-');    // Replace multiple - with single -
}

function cleanContent(content) {
  if (!content) return content;
  
  if (typeof content === 'object') {
    const cleaned = {};
    for (const [lang, text] of Object.entries(content)) {
      if (!text) {
        cleaned[lang] = "";
        continue;
      }

      let t = text;
      
      // 1. Remove CSS blocks
      t = t.replace(/\.elementor-[\s\S]*?}/g, '');
      
      // 2. Remove standard branding header if it exists
      const arHeader = "<p>باسم الله، نستهل حديثنا عن جزء أصيل من هويتنا الفروسية. في أركدار، نحن لا ندرِّس مجرد رياضة، بل نبني جسراً ثقافياً يربط بين نبل الماضي وتطلعات المستقبل.</p>";
      const enHeader = "<p>In the name of heritage and excellence, we explore an essential part of our equestrian identity. At ARKDAR, we don't just teach a sport; we build a cultural bridge connecting the nobility of the past with the aspirations of the future.</p>";
      
      t = t.replace(arHeader, '');
      t = t.replace(enHeader, '');
      
      // 3. Remove standard branding footer if it exists
      const arFooter = /<h2>تجلِّيات الفارس<\/h2><p>ختاماً، تبقى هذه المعرفة أمانة في أعناق من يسعون للتميز. نحن ندعوك للانضمام إلى مياديننا لتجسيد هذه القيم واقعاً ملموساً يفيض بالعزة والإقدام.<\/p>/g;
      const enFooter = /<h2>The Knight's Manifest<\/h2><p>In conclusion, this knowledge remains a trust for those who seek excellence. We invite you to join our arenas to embody these values as a tangible reality filled with pride and courage.<\/p>/g;
      
      t = t.replace(arFooter, '');
      t = t.replace(enFooter, '');
      
      // 4. Remove generic WordPress boilerplate and introduction fragments
      t = t.replace(/Read More »/g, '');
      t = t.replace(/Introduction/gi, '');
      t = t.replace(/Greetings, fellow adventurers and [\s\S]*?!/gi, '');
      t = t.replace(/Howdy, fellow [\s\S]*?!/gi, '');
      t = t.replace(/Welcome to Horseback Archery/gi, '');
      t = t.replace(/Know More about Our (Work Shops|Services)/gi, '');
      t = t.replace(/View our (workshops|Menu)/gi, '');
      t = t.replace(/Book your (workshop|tour)/gi, '');
      t = t.replace(/جدول المحتويات/g, '');
      t = t.replace(/ملخص سريع:/g, '');
      
      // 5. Cleanup whitespace
      t = t.replace(/\n\s*\n/g, '\n\n').trim();
      
      // 6. If content starts with a repetition of the excerpt, try to remove it (heuristically)
      // This is harder, so we'll skip for now unless we see it's a huge issue.
      
      cleaned[lang] = t;
    }
    return cleaned;
  }
  return content;
}

async function main() {
  try {
    const rawData = fs.readFileSync(JOURNAL_DATA_PATH, 'utf8');
    const migratedPosts = JSON.parse(rawData);
    
    // Sort migrated posts by date descending if possible
    migratedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    const processedMigrated = migratedPosts.map(post => {
      // Generate slug if missing
      let slug = post.slug || "";
      if (!slug) {
        const titleSource = post.title.en || post.title.ar || "article-" + post.id;
        slug = slugify(titleSource);
      }
      
      return {
        ...post,
        slug: slug,
        content: cleanContent(post.content),
        excerpt: cleanContent(post.excerpt)
      };
    });
    
    // Merge premium posts (at the beginning) with migrated posts
    const allArticles = [...premiumPosts, ...processedMigrated];
    
    // Remove duplicates by ID
    const uniqueArticles = [];
    const seenIds = new Set();
    
    allArticles.forEach(article => {
      if (!seenIds.has(article.id)) {
        uniqueArticles.push(article);
        seenIds.add(article.id);
      }
    });
    
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(uniqueArticles, null, 2), 'utf8');
    console.log(`Successfully created ${OUTPUT_PATH} with ${uniqueArticles.length} articles.`);
    
  } catch (error) {
    console.error("Error processing articles:", error);
  }
}

main();
