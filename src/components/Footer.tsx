import { getTranslations } from 'next-intl/server';
import NextImage from 'next/image';
import { Link } from '@/i18n/routing';

export default async function Footer() {
  const t = await getTranslations('Footer');
  const navT = await getTranslations('Navigation');

  return (
    <footer className="mt-24 relative z-20 bg-[#140D0E]">

      {/* ── Top Brand Accent Line ── */}
      <div className="h-1 w-full gradient-brand-bar" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* ── Brand Info ── */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <NextImage
                src="/logo.png"
                alt="ARKDAR Logo"
                width={40}
                height={40}
                className="object-contain brightness-0 invert"
              />
              <h2 className="text-2xl font-serif font-bold tracking-wider text-white">ARKDAR</h2>
            </div>
            <p className="text-sm leading-relaxed max-w-sm text-footer-muted">
              {t('about')}
            </p>

            {/* Social Placeholder Links */}
            <div className="flex gap-3 mt-8">
              {['ig', 'fb', 'tw', 'yt'].map(s => (
                <Link
                  key={s}
                  href="/"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold uppercase transition-all duration-200 hover:opacity-80 bg-footer-icon text-footer-icon"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-6 text-white/40">
              {t('links')}
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="text-footer-link transition-colors hover:text-white">{navT('home')}</Link></li>
              <li><Link href="/heritage" className="text-footer-link transition-colors hover:text-white">{navT('heritage')}</Link></li>
              <li><Link href="/arenas" className="text-footer-link transition-colors hover:text-white">{navT('arenas')}</Link></li>
              <li><Link href="/gearup" className="text-footer-link transition-colors hover:text-white">{navT('gearup')}</Link></li>
              <li><Link href="/gathering" className="text-footer-link transition-colors hover:text-white">{navT('gathering')}</Link></li>
            </ul>
          </div>

          {/* ── Contact Info ── */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-6 text-white/40">
              {t('contact')}
            </h3>
            <ul className="space-y-3 text-sm text-footer-link">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">🇨🇭</span> Switzerland — Geneva Region
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">🇪🇬</span> Egypt — Cairo
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5">🇪🇸</span> Spain
              </li>
              <li className="pt-3">
                <a href="mailto:info@arkdar.com" className="text-brand-secondary text-sm font-medium hover:underline transition-colors">
                  ✉ info@arkdar.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs border-t border-footer-subtle text-footer-subtle">
          <p>{t('rights')}</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
