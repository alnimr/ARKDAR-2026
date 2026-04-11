# ARKDAR Digital Platform - Project Brain & Context

هذا الملف هو "الحقيقة المصدرية" الوحيدة لمشروع ARKDAR. يجب قراءته في بداية أي جلسة تطوير جديدة لضمان المزامنة الكاملة مع الأهداف التصميمية والتقنية.

## 1. جوهر المشروع (Project Essence)

ARKDAR هي منصة رقمية نخبوية تجمع بين **التراث الفروسي التقليدي** و**التكنولوجيا الحديثة**. فلسفتنا التصميمية هي **"نخبوية الهجين" (Hybrid Elite)**.

## 2. النظام التصميمي (Design System - Elite)

يتم التحكم في التصميم عبر `src/app/globals.css` باستخدام Tailwind CSS v4.

### الألوان الملكية

- **Primary**: `#A0061C` (Deep Crimson) - يرمز للقوة والشرف.
- **Surface Dark**: `#140D0E` - للخلفيات الفاخرة.
- **Glassmorphism**: استخدام تأثيرات الزجاج (Glass) لإعطاء شعور بالحداثة.

### الخطوط (Typography)

- **العناوين**: `El Messiri` (Serif) - للطابع التراثي.
- **النصوص العربية**: `Tajawal` (Sans).
- **لوحة التحكم**: `Inter`.

### العناصر البصرية المميزة

- **Crimson Bow Separator**: فاصل أحمر متدرج بقطعة ماسية في المنتصف. (CSS: `.brand-sep-bow`)
- **Horse Watermark**: علامة مائية للحصان العربي في الخلفية.

## 3. البنية التقنية (Tech Stack)

- **Framework**: Next.js 15 (App Router).
- **Localization**: `next-intl` (يدعم: ar, en, de, es).
- **State Management**: React Server Components + Client Hooks.
- **Animations**: `framer-motion`.
- **Icons**: `lucide-react`.

## 4. البنية المجلدات وأهم الملفات

- `src/app/[locale]/`: المجلد الرئيسي للمسارات المترجمة.
- `src/data/`: يحتوي على البيانات التجريبية (Mock Data).
    - `mockJournal.ts`: يحتوي على المقالات المهاجرة من WordPress.
- `src/components/`: المكونات المعاد استخدامها (Navbar, Footer, JournalGrid).
- `src/i18n/`: إعدادات التوجيه واللغات.

## 5. المسارات المفعلة (Active Routes)

- `/`: الصفحة الرئيسية.
- `/[locale]/heritage`: صفحة الديوان (المقالات).
- `/[locale]/heritage/[slug]`: صفحة المقال الفردي.
- `/[locale]/arenas`: الميادين (حصرياً للفرسان).
- `/[locale]/gearup`: العتاد.

## 6. حالة الربط والبيانات

- **WordPress Migration**: تم نقل المقالات بنجاح إلى `mockJournal.ts`.
- **Firebase**: المهيئات موجودة في `src/lib/firebase` (قيد التطوير لبوابة المدرب والمتدرب).

## 8. تفضيلات المساعد الذكي (Model Preferences)

- **لغة التواصل التقنية**: يتم عرض خطط التنفيذ (Implementation Plans) والتقارير باللغة **العربية**.
- **منهجية العمل**: اتباع أسلوب "نخبوية الهجين" في كافة الحلول البرمجية.

## 9. معايير الاستقرار التقني (Stability Standards)

- **Data Protection**: نستخدم نمط `Optional Chaining` (`?.`) بشكل إلزامي عند الوصول لبيانات المقالات والترجمات في ملفات `JSON` لمنع انهيار الموقع عند نقص البيانات.
- **Build Mode**: تم ضبط مسار المقالات الفردية ليعمل بنمط `force-dynamic` لضمان الاستقرار الكلي أثناء عملية البناء والتجربة الحية.
- **Sanitized Slugs**: الروابط (Slugs) يجب أن تخضع دائماً للتطهير (ASCII) لضمان التوافق مع خوادم النشر (Vercel).

---

*هذا الملف ملك لـ ARKDAR Platform - تم التحديث في 2026-04-11*
