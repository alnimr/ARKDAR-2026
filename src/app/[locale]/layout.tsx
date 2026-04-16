import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { El_Messiri, Cairo, Montserrat } from 'next/font/google';
import '../globals.css';

const elMessiri = El_Messiri({
  subsets: ['arabic'],
  weight: ['700'],
  variable: '--font-el-messiri',
});

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-cairo',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-montserrat',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

import {ThemeProvider} from '@/components/ThemeProvider';
import LanguageSelectorModal from '@/components/LanguageSelectorModal';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }
  
  setRequestLocale(locale);
  const messages = await getMessages();
  
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html 
      lang={locale} 
      dir={direction} 
      suppressHydrationWarning
      className={`${elMessiri.variable} ${cairo.variable} ${montserrat.variable}`}
    >
      <head>
        <title>ARKDAR</title>
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <div className="flex flex-col min-h-screen">
              {/* Header / Navbar Component */}
              <Navbar />
              
              {/* Main Content Area */}
              <main className="flex-grow relative z-10">{children}</main>
              
              {/* Enterprise Footer Component */}
              <Footer />

              {/* Advanced Language Selector */}
              <LanguageSelectorModal />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
