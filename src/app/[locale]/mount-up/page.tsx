import { getTranslations } from 'next-intl/server';
import NextImage from 'next/image';
import BookingForm from '@/components/BookingForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MountUp' });
  return {
    title: `${t('title')} | ARKDAR`,
    description: t('subtitle')
  };
}

export default async function MountUpPage() {
  const t = await getTranslations('MountUp');

  return (
    <main className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-secondary-950/80 backdrop-blur-sm z-10" />
        <NextImage 
          src="/images/hero/mount-up-bg.jpg"
          alt="Equestrian Arts Background"
          fill
          priority
          className="object-cover object-center transition-all duration-1000 scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-secondary-950 to-transparent z-10" />
      </div>

      <div className="container relative z-20 px-4">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* The Multi-Step Portal */}
        <section className="animate-fade-up animation-delay-300">
          <BookingForm />
        </section>
      </div>
    </main>
  );
}
