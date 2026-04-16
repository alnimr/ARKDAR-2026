import { getTranslations } from 'next-intl/server';
import NextImage from 'next/image';
import { Link } from '@/i18n/routing';

export default async function Footer() {
  const t = await getTranslations('Footer');
  const navT = await getTranslations('Navigation');

  return (
    <footer className="mt-32 relative z-20 glass-sovereign border-t border-brand-primary/10 transition-all duration-300">

      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-12 gap-16">

          {/* ── Brand Info ── */}
          <div className="col-span-12 md:col-span-12 lg:col-span-5">
            <div className="flex items-center gap-4 mb-8">
              <NextImage
                src="/images/brand/logo.png"
                alt="ARKDAR Logo"
                width={48}
                height={48}
                className="object-contain cinema-lut"
              />
              <h2 className="text-3xl font-title font-bold tracking-[0.2em] text-brand-primary uppercase">ARKDAR</h2>
            </div>
            <p className="text-base leading-relaxed max-w-sm text-foreground/60 font-body font-medium">
              {t('about')}
            </p>

            {/* Social Sovereign Links */}
            <div className="flex gap-4 mt-10">
              {['ig', 'fb', 'tw', 'yt'].map(s => (
                <Link
                  key={s}
                  href="/"
                  className="w-10 h-10 rounded-sovereign flex items-center justify-center text-[10px] font-bold uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-brand-primary/20 bg-brand-primary/5 border border-brand-primary/20 text-brand-primary"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className="col-span-6 md:col-span-6 lg:col-span-3">
            <h3 className="text-[12px] font-bold uppercase tracking-[0.3em] mb-10 text-brand-primary">
              {t('links')}
            </h3>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest font-body">
              <li><Link href="/" className="text-foreground/60 transition-all duration-300 hover:text-brand-primary hover:translate-x-2 inline-block">{navT('home')}</Link></li>
              <li><Link href="/heritage" className="text-foreground/60 transition-all duration-300 hover:text-brand-primary hover:translate-x-2 inline-block">{navT('heritage')}</Link></li>
              <li><Link href="/arenas" className="text-foreground/60 transition-all duration-300 hover:text-brand-primary hover:translate-x-2 inline-block">{navT('arenas')}</Link></li>
              <li><Link href="/gearup" className="text-foreground/60 transition-all duration-300 hover:text-brand-primary hover:translate-x-2 inline-block">{navT('gearup')}</Link></li>
              <li><Link href="/gathering" className="text-foreground/60 transition-all duration-300 hover:text-brand-primary hover:translate-x-2 inline-block">{navT('gathering')}</Link></li>
            </ul>
          </div>

          {/* ── Contact Info ── */}
          <div className="col-span-6 md:col-span-6 lg:col-span-4">
            <h3 className="text-[12px] font-bold uppercase tracking-[0.3em] mb-10 text-brand-primary">
              {t('contact')}
            </h3>
            <ul className="space-y-5 text-sm font-medium text-foreground/60 font-body">
              <li className="flex items-center gap-3">
                <span className="grayscale opacity-50">🇨🇭</span> <span className="font-numbers">Switzerland — Geneva Region</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="grayscale opacity-50">🇪🇬</span> <span className="font-numbers">Egypt — Cairo</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="grayscale opacity-50">🇪🇸</span> <span className="font-numbers">Spain</span>
              </li>
              <li className="pt-6">
                <a href="mailto:info@arkdar.com" className="text-brand-primary text-base font-bold hover:opacity-80 transition-all flex items-center gap-3 group">
                  <span className="w-10 h-10 rounded-sovereign bg-brand-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">✉</span> 
                  <span className="font-numbers">info@arkdar.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-24 pt-10 flex flex-col md:flex-row items-center justify-between gap-8 text-[11px] font-bold border-t border-brand-primary/10 text-foreground/40">
          <p className="font-numbers">{t('rights')}</p>
          <div className="flex items-center gap-8">
            <Link href="/privacy" className="hover:text-brand-primary transition-all uppercase tracking-[0.2em] font-body">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-primary transition-all uppercase tracking-[0.2em] font-body">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
