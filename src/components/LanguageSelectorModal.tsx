'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './core/Icon';

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

  const handleConfirm = () => {
    const farFuture = 60 * 60 * 24 * 365;
    document.cookie = `arkdar_modal_dismissed=true; path=/; max-age=${farFuture}; SameSite=Lax`;
    document.cookie = `arkdar_lang_detected=true; path=/; max-age=${farFuture}; SameSite=Lax`;
    document.cookie = `NEXT_LOCALE=${selectedLocale}; path=/; max-age=${farFuture}; SameSite=Lax`;
    
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
          className="absolute inset-0 bg-black/95"
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ scale: 0.98, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.98, opacity: 0, y: 10 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl layer-3 border border-quiet depth-card rounded-none"
        >
          <div className="relative p-12 md:p-20 text-center">
            {/* Header Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 mb-10 layer-1 border border-gold">
              <Icon name="globe" size={40} color="var(--color-gold)" />
            </div>

            <h2 className="text-3xl md:text-5xl font-brand font-bold mb-8 text-gold tracking-[0.2em] uppercase">
              {t('title')}
            </h2>
            
            <p className="text-white/40 mb-12 text-lg font-brand font-light leading-relaxed max-w-sm mx-auto uppercase tracking-wide">
              {t('subtitle')}
            </p>

            {/* Language Grid */}
            <div className="grid grid-cols-2 gap-4 mb-16">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLocale(lang.code)}
                  className={`flex items-center gap-4 p-6 border transition-all duration-cine rounded-none ${
                    selectedLocale === lang.code 
                    ? 'bg-gold border-gold text-black depth-card' 
                    : 'layer-1 border-quiet text-white/40 hover:text-gold hover:border-gold hover:tracking-widest font-bold'
                  }`}
                >
                  <span className="text-2xl cinema-lut">{lang.flag}</span>
                  <span className="font-brand font-bold uppercase tracking-[0.4em] text-[10px]">{lang.name}</span>
                </button>
              ))}
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              className="btn-sovereign w-full py-6 text-[11px] uppercase tracking-[0.5em] rounded-none"
            >
              <span className="flex items-center justify-center gap-4">
                {t('confirm')}
                <Icon name="arrow" size={20} className="group-hover:translate-x-2 transition-transform duration-cine" />
              </span>
            </button>

            <div className="mt-12 flex items-center justify-center gap-4 text-white/10 text-[9px] font-brand font-bold uppercase tracking-[0.5em]">
              <Icon name="shield" size={16} color="var(--color-gold)" opacity="0.2" />
              <span>ARKDAR DIGITAL SOVEREIGNTY PROTECTED</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
