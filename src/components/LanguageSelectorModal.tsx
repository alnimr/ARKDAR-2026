'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LanguageSelectorModal() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('LanguageModal');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedLocale, setSelectedLocale] = useState(locale);

  useEffect(() => {
    // Check if the modal should be shown
    const checkCookie = () => {
      const cookies = document.cookie.split(';').map(c => c.trim());
      const detectedCookie = cookies.find(c => c.startsWith('arkdar_lang_detected='));
      
      if (detectedCookie && detectedCookie.split('=')[1] === 'false') {
        const modalHidden = cookies.find(c => c.startsWith('arkdar_modal_dismissed='));
        if (!modalHidden) {
          setIsOpen(true);
        }
      }
    };

    checkCookie();
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    setSelectedLocale(newLocale);
  };

  const handleConfirm = () => {
    // Set cookie to dismiss modal
    document.cookie = 'arkdar_modal_dismissed=true; path=/; max-age=' + (60 * 60 * 24 * 365);
    document.cookie = 'arkdar_lang_detected=true; path=/; max-age=' + (60 * 60 * 24 * 365);
    
    // Redirect to the new locale
    router.push(pathname, { locale: selectedLocale });
    setIsOpen(false);
  };

  const languages = [
    { code: 'ar', name: t('ar'), flag: '🇸🇦' },
    { code: 'en', name: t('en'), flag: '🇬🇧' },
    { code: 'de', name: t('de'), flag: '🇩🇪' },
    { code: 'es', name: t('es'), flag: '🇪🇸' },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg overflow-hidden bg-[#141414] border-2 border-brand-crimson rounded-2xl shadow-[0_0_50px_rgba(132,5,5,0.3)]"
        >
          {/* Decorative Pattern Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none brand-pattern-waves" />
          
          <div className="relative p-8 md:p-12 text-center text-[#EDF2F4]">
            {/* Header Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-brand-primary/20 border border-brand-primary/50">
              <Globe className="w-8 h-8 text-brand-primary" />
            </div>

            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 tracking-tight">
              {t('title')}
            </h2>
            
            <p className="text-[#7C7C7C] mb-8 text-lg font-sans max-w-md mx-auto">
              {t('subtitle')}
            </p>

            {/* Language Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${
                    selectedLocale === lang.code 
                    ? 'bg-brand-primary border-brand-primary text-white shadow-[0_0_15px_rgba(132,5,5,0.4)]' 
                    : 'bg-[#1A1A1A] border-white/10 text-[#7C7C7C] hover:border-brand-primary/50 hover:text-white'
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="font-semibold">{lang.name}</span>
                </button>
              ))}
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              className="btn-primary w-full py-4 justify-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {t('confirm')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-[#7C7C7C] text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>ARKDAR Digital Sovereignty Protected</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
