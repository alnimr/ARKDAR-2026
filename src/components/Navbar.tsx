"use client";

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Link } from '@/i18n/routing';
import NextImage from 'next/image';
import Icon from './core/Icon';
import ThemeToggle from './ThemeToggle';
import { MamlukStar } from './core/MamlukOrnaments';

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
      isScrolled ? 'py-0 px-2 md:px-0' : 'py-2 md:py-8 px-2 md:px-16'
    } font-brand animate-feather`}>
      <div className={`s-container flex items-center justify-between px-4 md:px-10 py-3 md:py-6 transition-all duration-cine border border-quiet depth-card ${
        isScrolled ? 'border-gold bg-layer-1 layer-sovereign' : 'bg-layer-1'
      }`}>

        <Link href="/" className="flex items-center gap-3 md:gap-6 group relative">
          <div className="absolute -inset-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-exp flex items-center justify-center">
            <MamlukStar type={12} size={140} degree="hidden" color="var(--color-gold-light)" opacity={0.6} />
          </div>
          <div className="relative h-6 md:h-9 w-24 md:w-32">
            <NextImage
              src="/images/brand/logo/ARKDAR_Logo_Gold.png"
              alt="ARKDAR Logo"
              fill
              className="object-contain cinema-lut group-hover:drop-shadow-[0_0_15px_rgba(184,146,42,0.4)] transition-all duration-cine"
              priority
            />
          </div>
          <span className={`text-lg md:text-2xl font-brand font-semibold text-gold uppercase hidden sm:inline-block ${locale === 'ar' ? 'tracking-normal' : 'tracking-[0.3em]'}`}>
            {locale === 'ar' ? 'أركدار' : 'ARKDAR'}
          </span>
        </Link>

        {/* ── Desktop Links ── */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-12 text-[10px] xl:text-[11px] font-brand font-bold tracking-[0.3em] xl:tracking-[0.5em] uppercase">
          {navLinks.map(link => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href as '/'}
                className={`relative flex items-center gap-2 transition-all duration-cine uppercase group/item
                  ${isActive ? 'text-gold' : 'text-primary/60 hover:text-gold'}
                  ${locale === 'ar' ? 'tracking-normal' : 'tracking-[0.3em] hover:tracking-[0.5em]'}
                `}
              >
                {isActive && (
                  <MamlukStar type={8} size={10} degree="divider" className="absolute -start-4" color="var(--color-gold-light)" />
                )}
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* ── Actions ── */}
        <div className="flex items-center gap-2 md:gap-6">
          <ThemeToggle />

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`flex items-center gap-2 px-3 md:px-6 py-2.5 md:py-4 text-[8px] md:text-[10px] font-brand font-semibold text-primary/80 hover:bg-gold hover:text-black transition-all duration-cine border border-quiet uppercase ${locale === 'ar' ? 'tracking-normal' : 'tracking-[0.3em]'}`}
            >
              <Icon name="share" size={14} color="currentColor" className="rotate-90" />
              <span className="hidden lg:inline">{locale}</span>
              <Icon 
                name="arrow" 
                size={10} 
                className={`transition-transform duration-cine rotate-90 ${isLangOpen ? '-rotate-90' : 'rotate-90'}`} 
              />
            </button>

            {isLangOpen && (
              <div className="absolute top-full mt-4 end-0 layer-2 border border-quiet overflow-hidden w-48 md:w-64 depth-float z-50 animate-in fade-in zoom-in-95 duration-200">
                {LOCALES.map(l => (
                  <button
                    key={l.code}
                    onClick={() => switchLocale(l.code)}
                    className={`w-full text-start px-6 md:px-8 py-4 md:py-5 text-[9px] md:text-[10px] font-brand font-semibold transition-all duration-cine hover:bg-gold hover:text-black text-primary/60 uppercase
                      ${l.code === locale ? 'text-gold bg-layer-3' : ''}
                      ${locale === 'ar' ? 'tracking-normal' : 'tracking-[0.3em]'}
                    `}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA Button */}
          <Link href="/mount-up" className="hidden lg:inline-flex btn-sovereign py-3 px-8 text-[9px]">
            {t('mountUp')}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gold hover:bg-gold/5 transition-all duration-cine"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <Icon name="close" size={24} /> : <Icon name="menu" size={24} />}
          </button>
        </div>
      </div>


      {/* ── Mobile Menu ── */}
      {isMenuOpen && (
        <div className="lg:hidden mt-6 px-10 mx-6 layer-2 border border-quiet py-12 flex flex-col gap-6 depth-float transition-all duration-cine animate-in fade-in slide-in-from-top-4">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href as '/'}
              onClick={() => setIsMenuOpen(false)}
              className={`py-6 px-8 text-[11px] font-brand font-semibold text-ghost/60 hover:text-gold hover:bg-layer-3 transition-all duration-cine border-b border-quiet/10 uppercase ${locale === 'ar' ? 'tracking-normal' : 'tracking-[0.4em]'}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/mount-up"
            onClick={() => setIsMenuOpen(false)}
            className={`btn-sovereign mt-6 justify-center py-7 text-[12px] ${locale === 'ar' ? 'tracking-normal' : 'tracking-[0.6em]'}`}
          >
            {t('mountUp')}
          </Link>
        </div>
      )}
    </nav>
  );
}
