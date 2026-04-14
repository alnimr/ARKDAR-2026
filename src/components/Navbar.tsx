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
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      isScrolled ? 'navbar-solid py-0' : 'navbar-floating py-4 px-4 md:px-8'
    }`}>
      <div className={`max-w-7xl mx-auto flex items-center justify-between px-6 py-4 transition-all duration-300 ${
        isScrolled ? '' : 'glass rounded-2xl'
      }`}>

        {/* ── Brand Logo ── */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10">
            <NextImage
              src="/images/brand/logo.png"
              alt="ARKDAR Logo"
              width={40}
              height={40}
              className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
              priority
            />
          </div>
          <span className="text-xl font-serif font-bold tracking-wider text-brand-primary">
            ARKDAR
          </span>
        </Link>

        {/* ── Desktop Links ── */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href as '/'}
              className="text-text-primary transition-colors duration-200 hover:text-brand-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ── Actions ── */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-text-primary transition-all duration-200 ${
                isScrolled ? 'hover:bg-brand-primary/10' : 'hover:bg-white/50'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline uppercase">{locale}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <div className="absolute top-full mt-2 end-0 glass rounded-xl overflow-hidden w-36 shadow-lg z-50">
                {LOCALES.map(l => (
                  <button
                    key={l.code}
                    onClick={() => switchLocale(l.code)}
                    className={`w-full text-start px-4 py-2.5 text-sm font-medium transition-colors duration-150 hover:bg-white/60 text-text-primary
                      ${l.code === locale ? 'text-brand-primary font-bold' : ''}`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA Button */}
          <Link href="/mount-up" className="hidden md:inline-flex btn-nav">
            {t('mountUp')}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-text-primary transition-colors hover:bg-white/50"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {isMenuOpen && (
        <div className={`lg:hidden max-w-7xl mx-auto mt-2 px-6 py-4 flex flex-col gap-2 animate-fade-up ${
          isScrolled ? 'bg-background shadow-xl border-b border-brand-primary/10' : 'glass rounded-2xl'
        }`}>
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href as '/'}
              onClick={() => setIsMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg text-sm font-medium text-text-primary transition-colors hover:bg-white/50"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/mount-up"
            onClick={() => setIsMenuOpen(false)}
            className="btn-nav mt-2 justify-center"
          >
            {t('mountUp')}
          </Link>
          <div className="flex justify-center pt-2">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
