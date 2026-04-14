# ARKDAR Digital Design System (Elite Edition)

هذا المستند يمثل الدستور البصري لمنصة ARKDAR، لضمان اتساق الهوية البصرية الملكية عبر كافة التحديثات المستقبلية.

## 1. لوحة الألوان السيادية (The Sovereign Palette)

يتم استخدام مسميات `arkdar` للألوان الأساسية لضمان التميز:
- **Arkdar Crimson**: `#840505` (اللون الأساسي للسيادة، الحدود، والوهج).
- **Arkdar Oxblood**: `#660000` (الدرجة العميقة للتدرجات والخلفيات).
- **Arkdar Carmine**: `#911010` (درجة التباين العالي للعناوين والأزرار).
- **Surface Light**: `#EDF2F4` (الخلفية التراثية الفاتحة).
- **Surface Dark**: `#0A0A0A` (الخلفية النخبوية الداكنة).

## 2. الطوبوغرافيا (Typography Standards)

- **العناوين (Headings)**: يجب أن تستخدم خط `El Messiri` ولون `Arkdar Carmine` في الوضع الفاتح لضمان أقصى درجات الوضوح.
- **النصوص الطويلة (Body Text)**: في الوضع الداكن، تُستخدم الدرجة `#EDF2F4` (Light Gray) لراحة العين والفخامة.
- **الخطوط**:
  - `Serif`: El Messiri (للأصالة والتراث).
  - `Sans`: Tajawal (للعصرية والوضوح الرقمي).

## 3. العناصر التفاعلية (UI Components)

### الأزرار (Buttons)
يجب أن تتبع كافة الأزرار الأساسية التدرج التالي:
- **Gradient**: `linear-gradient(135deg, arkdar-carmine 0%, arkdar-oxblood 100%)`
- **Shadow**: استخدام الوهج (`var(--primary-glow)`) المعتمد على `arkdar-crimson`.

### البطاقات (Cards - Glassmorphism)
تعتمد البطاقات على نظام "الشفافية النخبوية":
- **الحدود**: يجب أن تكون دائماً `border-arkdar-crimson/20` (أو `/30` في الوضع الداكن).
- **التأثير**: `backdrop-blur` (بين 12px إلى 20px).
- **الظلال**: ظلال ناعمة بلون الكرموزي لتعزيز العمق.

## 4. قوانين الاستمرارية (Persistence)

- **اللغة**: تُحفظ في الكوكي `NEXT_LOCALE` و `arkdar_lang_detected`.
- **الثيم**: يُحفظ عبر `next-themes` في `theme` (localStorage/Cookie).
- **النافذة المنبثقة**: تُحفظ حالة الإغلاق في `arkdar_modal_dismissed`.

> [!IMPORTANT]
> أي إضافة برمجية جديدة يجب أن تحترم هذه المتغيرات الموجودة في `globals.css` ولا يُسمح باستخدام ألوان `Hardcoded` خارج هذه اللوحة.
