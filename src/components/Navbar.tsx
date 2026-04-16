"use client";

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Link } from '@/i18n/routing';
import NextImage from 'next/image';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
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
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-surface-base/90 backdrop-blur-md border-b border-brand-primary/20 py-2' : 'py-6 px-6 md:px-12'
    }`}>
      <div className={`max-w-7xl mx-auto flex items-center justify-between px-6 py-4 transition-all duration-300 ${
        isScrolled ? '' : 'glass'
      }`}>

        {/* ── Brand Logo ── */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10">
            <NextImage
              src="/images/brand/logo.png"
              alt="ARKDAR Logo"
              width={40}
              height={40}
              className="object-contain cinema-lut group-hover:scale-110 transition-transform duration-500"
              priority
            />
          </div>
          <span className="text-xl font-serif font-bold tracking-widest text-brand-primary">
            ARKDAR
          </span>
        </Link>

        {/* ── Desktop Links ── */}
        <div className="hidden lg:flex items-center gap-10 text-xs font-bold uppercase tracking-widest">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href as '/'}
              className="text-text-sovereign/70 transition-all duration-300 hover:text-brand-primary hover:tracking-[0.2em]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ── Actions ── */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-sovereign text-[10px] font-bold uppercase tracking-widest text-text-sovereign/80 hover:bg-brand-primary/10 transition-all border border-transparent hover:border-brand-primary/20"
            >
              <Globe className="w-4 h-4 text-brand-primary" />
              <span className="hidden sm:inline">{locale}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <div className="absolute top-full mt-2 end-0 glass border-brand-primary/20 overflow-hidden w-40 shadow-2xl z-50 animate-fade-up">
                {LOCALES.map(l => (
                  <button
                    key={l.code}
                    onClick={() => switchLocale(l.code)}
                    className={`w-full text-start px-5 py-3 text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-brand-primary/20 text-text-sovereign
                      ${l.code === locale ? 'text-brand-primary bg-brand-primary/5' : ''}`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA Button */}
          <Link href="/mount-up" className="hidden md:inline-flex btn-sovereign px-6 py-2.5 text-[10px]">
            {t('mountUp')}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-sovereign text-brand-primary hover:bg-brand-primary/10 transition-all"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 px-6 mx-6 glass border-brand-primary/20 py-8 flex flex-col gap-4 animate-fade-up">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href as '/'}
              onClick={() => setIsMenuOpen(false)}
              className="py-3 px-4 rounded-sovereign text-xs font-bold uppercase tracking-widest text-text-sovereign hover:bg-brand-primary/10 transition-all border border-transparent hover:border-brand-primary/20"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/mount-up"
            onClick={() => setIsMenuOpen(false)}
            className="btn-sovereign mt-4 justify-center"
          >
            {t('mountUp')}
          </Link>
        </div>
      )}
    </nav>
  );
}
