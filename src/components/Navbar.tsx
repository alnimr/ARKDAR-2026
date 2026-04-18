"use client";

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Link } from '@/i18n/routing';
import NextImage from 'next/image';
import Icon from './core/Icon';
import ThemeToggle from './ThemeToggle';

const LOCALES: { code: string; label: string }[] = [
  { code: 'ar', label: 'العربية' },
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
];

export default function Navbar() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLocale = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${newLocale}${pathWithoutLocale}`);
    setIsLangOpen(false);
  };

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/heritage', label: t('heritage') },
    { href: '/arenas', label: t('arenas') },
    { href: '/gearup', label: t('gearup') },
    { href: '/gathering', label: t('gathering') },
    { href: '/portal', label: t('portal') },
  ];

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-cine ease-feather ${
      isScrolled ? 'py-0' : 'py-10 px-6 md:px-16'
    } font-brand`}>
      <div className={`max-w-7xl mx-auto flex items-center justify-between px-10 py-6 transition-all duration-cine layer-1 border border-quiet depth-card rounded-none ${
        isScrolled ? 'border-gold bg-layer-0' : ''
      }`}>

        <Link href="/" className="flex items-center gap-6 group">
          <div className="relative h-9 w-32">
            <NextImage
              src="/images/brand/logo/ARKDAR_Logo_Gold.png"
              alt="ARKDAR Logo"
              fill
              className="object-contain cinema-lut group-hover:drop-shadow-[0_0_15px_rgba(184,146,42,0.4)] transition-all duration-cine"
              priority
            />
          </div>
          <span className="text-2xl font-brand font-bold tracking-[0.4em] text-gold uppercase">
            {locale === 'ar' ? 'أركدار' : 'ARKDAR'}
          </span>
        </Link>

        {/* ── Desktop Links ── */}
        <div className="hidden lg:flex items-center gap-12 text-[11px] font-brand font-bold tracking-[0.5em] uppercase">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href as '/'}
              className="text-primary/60 hover:text-gold transition-all duration-cine hover:tracking-[0.7em]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ── Actions ── */}
        <div className="flex items-center gap-6">
          <ThemeToggle />

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-4 px-6 py-4 text-[10px] font-brand font-bold tracking-[0.4em] text-primary/80 hover:bg-gold hover:text-black transition-all duration-cine border border-quiet uppercase rounded-none"
            >
              <Icon name="share" size="s" color="currentColor" className="rotate-90" />
              <span className="hidden sm:inline">{locale}</span>
              <Icon 
                name="arrow" 
                size={12} 
                className={`transition-transform duration-cine rotate-90 ${isLangOpen ? '-rotate-90' : 'rotate-90'}`} 
              />
            </button>

            {isLangOpen && (
              <div className="absolute top-full mt-4 end-0 layer-2 border border-quiet overflow-hidden w-64 depth-float z-50 rounded-none">
                {LOCALES.map(l => (
                  <button
                    key={l.code}
                    onClick={() => switchLocale(l.code)}
                    className={`w-full text-start px-8 py-5 text-[10px] font-brand font-bold tracking-[0.4em] transition-all duration-cine hover:bg-gold hover:text-black text-primary/60 uppercase rounded-none
                      ${l.code === locale ? 'text-gold layer-3' : ''}`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA Button */}
          <Link href="/mount-up" className="hidden xl:inline-flex btn-sovereign py-4 px-10">
            {t('mountUp')}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 text-gold hover:layer-2 transition-all duration-cine rounded-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <Icon name="close" size={32} /> : <Icon name="menu" size={32} />}
          </button>
        </div>
      </div>


      {/* ── Mobile Menu ── */}
      {isMenuOpen && (
        <div className="lg:hidden mt-6 px-10 mx-6 layer-2 border border-quiet py-12 flex flex-col gap-6 depth-float transition-all duration-cine animate-in fade-in slide-in-from-top-4 rounded-none">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href as '/'}
              onClick={() => setIsMenuOpen(false)}
              className="py-6 px-8 text-[11px] font-brand font-bold tracking-[0.5em] text-ghost/60 hover:text-gold hover:bg-layer-3 transition-all duration-cine border-b border-quiet/10 uppercase rounded-none"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/mount-up"
            onClick={() => setIsMenuOpen(false)}
            className="btn-sovereign mt-6 justify-center py-7 text-[12px] tracking-[0.6em] rounded-none"
          >
            {t('mountUp')}
          </Link>
        </div>
      )}
    </nav>
  );
}
