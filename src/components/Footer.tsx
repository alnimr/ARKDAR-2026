import { getTranslations, getLocale } from 'next-intl/server';
import NextImage from 'next/image';
import { Link } from '@/i18n/routing';
import Icon from './core/Icon';
import BackToTop from './BackToTop';
import { MamlukStar, SovereignDivider } from './core/MamlukOrnaments';

export default async function Footer() {
  const t = await getTranslations('Footer');
  const navT = await getTranslations('Navigation');
  const locale = await getLocale();

  return (
    <footer className="mt-48 relative z-20 layer-1 border-t border-quiet font-brand overflow-hidden">
      {/* ── Sovereign Watermark: Mamluk Star ── 4-8% Opacity */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none opacity-[0.06] select-none flex items-center justify-end">
        <MamlukStar type={16} size={600} degree="hidden" color="var(--color-gold)" className="-mr-64" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-40">
        <div className="grid grid-cols-12 gap-12 md:gap-24">

          {/* ── Brand Info ── */}
          <div className="col-span-12 md:col-span-12 lg:col-span-5">
            <div className="flex items-center gap-8 mb-16">
              <div className="relative h-9 w-32">
                <NextImage
                  src="/images/brand/logo/ARKDAR_Logo_Gold.png"
                  alt="ARKDAR Logo"
                  fill
                  className="object-contain cinema-lut"
                />
              </div>
              <h2 className="text-4xl font-brand font-bold tracking-[0.4em] text-gold uppercase">{locale === 'ar' ? 'أركدار' : 'ARKDAR'}</h2>
            </div>
            <p className="text-xl leading-relaxed max-w-sm text-ghost/60 font-brand font-light">
              {t('about')}
            </p>

            {/* Social Sovereign Links */}
            <div className="flex gap-4 mt-20">
              {['IG', 'FB', 'TW', 'YT'].map(s => (
                <Link
                  key={s}
                  href="/"
                  className="w-16 h-16 flex items-center justify-center transition-all duration-cine hover:-translate-y-2 hover:bg-gold hover:text-black layer-2 border border-quiet text-gold rounded-none"
                >
                  <Icon 
                    name={s === 'IG' ? 'instagram' : s === 'TW' ? 'twitter' : s === 'YT' ? 'youtube' : 'facebook'} 
                    size={20} 
                    color="currentColor" 
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div className="col-span-6 md:col-span-6 lg:col-span-3">
            <h3 className="text-[10px] font-brand font-bold tracking-[0.6em] mb-16 text-gold uppercase opacity-40">
              {t('links')}
            </h3>
            <ul className="space-y-8 text-[10px] font-brand font-bold tracking-[0.5em] uppercase">
              <li><Link href="/" className="text-ghost/60 transition-all duration-cine hover:text-gold hover:tracking-[0.7em] inline-block">{navT('home')}</Link></li>
              <li><Link href="/heritage" className="text-ghost/60 transition-all duration-cine hover:text-gold hover:tracking-[0.7em] inline-block">{navT('heritage')}</Link></li>
              <li><Link href="/arenas" className="text-ghost/60 transition-all duration-cine hover:text-gold hover:tracking-[0.7em] inline-block">{navT('arenas')}</Link></li>
              <li><Link href="/gearup" className="text-ghost/60 transition-all duration-cine hover:text-gold hover:tracking-[0.7em] inline-block">{navT('gearup')}</Link></li>
              <li><Link href="/gathering" className="text-ghost/60 transition-all duration-cine hover:text-gold hover:tracking-[0.7em] inline-block">{navT('gathering')}</Link></li>
            </ul>
          </div>

          {/* ── Contact Info ── */}
          <div className="col-span-6 md:col-span-6 lg:col-span-4">
            <h3 className="text-[10px] font-brand font-bold tracking-[0.6em] mb-16 text-gold uppercase opacity-40">
              {t('contact')}
            </h3>
            <BackToTop label={t('backToTop')} />
            <ul className="space-y-8 text-xl font-brand font-bold text-ghost/80 mt-16">
              <li className="flex items-center gap-6">
                <span className="cinema-lut opacity-50 text-2xl">{locale === 'ar' ? '🇨🇭' : '🇨🇭'}</span> <span className="tracking-[0.1em] uppercase">{t('interlaken')}</span>
              </li>
              <li className="flex items-center gap-6">
                <span className="cinema-lut opacity-50 text-2xl">{locale === 'ar' ? '🇪🇬' : '🇪🇬'}</span> <span className="tracking-[0.1em] uppercase">{t('cairo')}</span>
              </li>
              <li className="flex items-center gap-6">
                <div className="flex items-center gap-6">
                  <Link href="https://instagram.com/arkdar" target="_blank" className="p-3 border border-quiet hover:border-gold hover:text-gold transition-all duration-cine rounded-none">
                    <Icon name="instagram" size="s" color="currentColor" />
                  </Link>
                  <Link href="https://twitter.com/arkdar" target="_blank" className="p-3 border border-quiet hover:border-gold hover:text-gold transition-all duration-cine rounded-none">
                    <Icon name="twitter" size="s" color="currentColor" />
                  </Link>
                  <Link href="https://youtube.com/@arkdar" target="_blank" className="p-3 border border-quiet hover:border-gold hover:text-gold transition-all duration-cine rounded-none">
                    <Icon name="youtube" size="s" color="currentColor" />
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <SovereignDivider className="opacity-20 !my-24" />

        {/* ── Bottom Bar ── */}
        <div className="mt-12 pt-16 flex flex-col md:flex-row items-center justify-between gap-12 text-[10px] font-brand font-bold border-t border-quiet text-ghost/40 uppercase tracking-[0.6em]">
          <p>{t('rights')}</p>
          <div className="flex items-center gap-12">
            <Link href="/privacy" className="hover:text-gold transition-all duration-cine">{t('privacy')}</Link>
            <Link href="/terms" className="hover:text-gold transition-all duration-cine">{t('terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

