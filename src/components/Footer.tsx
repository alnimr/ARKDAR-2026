import { getTranslations } from 'next-intl/server';
import NextImage from 'next/image';
import { Link } from '@/i18n/routing';

export default async function Footer() {
  const t = await getTranslations('Footer');
  const navT = await getTranslations('Navigation');

  return (
    <footer className="mt-24 relative z-20 bg-brand-background dark:bg-background border-t border-brand-primary/10">

      {/* ── Top Brand Accent Line ── */}
      <div className="h-0.5 w-full bg-brand-primary" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* ── Brand Info ── */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <NextImage
                src="/images/brand/logo.png"
                alt="ARKDAR Logo"
                width={40}
                height={40}
                className="object-contain dark:invert"
              />
              <h2 className="text-2xl font-serif font-bold tracking-wider text-brand-primary">ARKDAR</h2>
            </div>
            <p className="text-sm leading-relaxed max-w-sm text-brand-secondary dark:text-[#EDF2F4] font-medium">
              {t('about')}
            </p>

            {/* Social Placeholder Links */}
            <div className="flex gap-3 mt-8">
              {['ig', 'fb', 'tw', 'yt'].map(s => (
                <Link
                  key={s}
                  href="/"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[10px] font-bold uppercase transition-all duration-300 hover:scale-110 bg-brand-primary text-white"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className="md:col-span-3">
            <h3 className="text-[10px] font-bold uppercase tracking-[3px] mb-6 text-brand-primary opacity-80">
              {t('links')}
            </h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link href="/" className="text-brand-secondary dark:text-[#EDF2F4] transition-all duration-300 hover:text-brand-primary">{navT('home')}</Link></li>
              <li><Link href="/heritage" className="text-brand-secondary dark:text-[#EDF2F4] transition-all duration-300 hover:text-brand-primary">{navT('heritage')}</Link></li>
              <li><Link href="/arenas" className="text-brand-secondary dark:text-[#EDF2F4] transition-all duration-300 hover:text-brand-primary">{navT('arenas')}</Link></li>
              <li><Link href="/gearup" className="text-brand-secondary dark:text-[#EDF2F4] transition-all duration-300 hover:text-brand-primary">{navT('gearup')}</Link></li>
              <li><Link href="/gathering" className="text-brand-secondary dark:text-[#EDF2F4] transition-all duration-300 hover:text-brand-primary">{navT('gathering')}</Link></li>
            </ul>
          </div>

          {/* ── Contact Info ── */}
          <div className="md:col-span-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[3px] mb-6 text-brand-primary opacity-80">
              {t('contact')}
            </h3>
            <ul className="space-y-3 text-sm font-medium text-brand-secondary dark:text-[#EDF2F4]">
              <li className="flex items-start gap-2 cursor-default">
                <span className="mt-0.5">🇨🇭</span> Switzerland — Geneva Region
              </li>
              <li className="flex items-start gap-2 cursor-default">
                <span className="mt-0.5">🇪🇬</span> Egypt — Cairo
              </li>
              <li className="flex items-start gap-2 cursor-default">
                <span className="mt-0.5">🇪🇸</span> Spain
              </li>
              <li className="pt-3">
                <a href="mailto:info@arkdar.com" className="text-brand-primary text-sm font-bold hover:opacity-80 transition-all duration-300 flex items-center gap-2">
                  <span>✉</span> info@arkdar.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-medium border-t border-brand-primary/10 text-brand-secondary dark:text-[#EDF2F4]/80">
          <p>{t('rights')}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-brand-primary transition-colors uppercase tracking-widest">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-primary transition-colors uppercase tracking-widest">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
