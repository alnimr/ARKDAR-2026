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
    <main className="relative min-h-screen pt-sovereign-nav pb-32 overflow-hidden layer-0 selection:bg-gold selection:text-black font-brand">
      
      {/* Sovereign Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black z-10" />
        <NextImage 
          src="/images/hero/mount-up-bg.jpg"
          alt="Equestrian Arts Background"
          fill
          priority
          className="object-cover object-center grayscale opacity-40 transition-all duration-cine scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-gold/[0.05] z-10" />
      </div>

      <div className="max-w-7xl mx-auto relative z-20 px-8">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-24 transition-all duration-cine">
          <span className="text-[11px] font-brand font-bold uppercase tracking-[0.6em] text-gold/60 mb-8 block">
            {t('tag')}
          </span>
          <h1 className="text-5xl md:text-9xl font-brand font-bold text-gold mb-12 tracking-tighter leading-none uppercase">
            {t('title')}
          </h1>
          <div className="w-40 h-px bg-gold/20 mx-auto mb-12" />
          <p className="text-2xl text-ghost leading-relaxed font-brand font-light opacity-70">
            {t('subtitle')}
          </p>
        </div>

        {/* The Multi-Step Portal */}
        <section className="layer-1 border border-quiet p-8 md:p-16 depth-card transition-all duration-cine">
          <BookingForm />
        </section>
      </div>
    </main>
  );
}
