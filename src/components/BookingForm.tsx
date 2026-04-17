"use client";
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { 
  ChevronLeft, 
  Target, 
  Sword, 
  Shield, 
  Compass, 
  CheckCircle2,
  Calendar,
  Users,
  MapPin,
  User,
  Mail,
  Phone
} from 'lucide-react';
import { db } from '@/lib/arena/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import NextImage from 'next/image';

type ArenaID = 'interlaken' | 'cairo' | 'other';

interface Service {
  id: string;
  category: string;
  labelKey: string;
  icon: typeof Target;
  arenas?: ArenaID[]; // If empty, available in all
}

const SERVICES: Service[] = [
  // Archery
  { id: 'archery_ground', category: 'archery', labelKey: 'ground', icon: Target },
  { id: 'archery_mounted', category: 'archery', labelKey: 'mounted', icon: Target },
  { id: 'air_rifle', category: 'archery', labelKey: 'air_rifle', icon: Target, arenas: ['cairo'] },

  // Combat
  { id: 'sword_ground', category: 'combat', labelKey: 'sword_ground', icon: Sword },
  { id: 'sword_mounted', category: 'combat', labelKey: 'sword_mounted', icon: Sword },
  { id: 'spear_ground', category: 'combat', labelKey: 'spear_ground', icon: Shield },
  { id: 'spear_mounted', category: 'combat', labelKey: 'spear_mounted', icon: Shield },

  // Heritage
  { id: 'tent_pegging', category: 'heritage', labelKey: 'tent_pegging', icon: Compass },
  { id: 'bedouin_games', category: 'heritage', labelKey: 'bedouin_games', icon: Compass },

  // Journeys
  { id: 'horse_tour', category: 'journeys', labelKey: 'horse_tour', icon: Compass },
  { id: 'chariot_tour', category: 'journeys', labelKey: 'chariot_tour', icon: Compass },
];

export default function BookingForm() {
  const t = useTranslations('MountUp');
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [arena, setArena] = useState<ArenaID | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    count: '',
    experience: 'amateur'
  });

  useEffect(() => {
    const serviceId = searchParams.get('service');
    if (serviceId) {
      const foundService = SERVICES.find(s => s.id === serviceId);
      if (foundService) {
        const timer = setTimeout(() => {
          setSelectedServices([serviceId]);
          if (foundService.arenas && foundService.arenas.length === 1) {
            setArena(foundService.arenas[0]);
          }
          setStep(2);
        }, 10);
        return () => clearTimeout(timer);
      }
    }
  }, [searchParams]);

  const handleBookingSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const bookingData = {
        ...formData,
        arena,
        services: selectedServices,
        status: 'pending',
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'bookings'), bookingData);
      setStep(5);
    } catch (err) {
      console.error('Booking Submission Error:', err);
      alert('Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
     window.scrollTo({ top: 0, behavior: 'smooth' });
     setStep(s => s + 1);
  };
  const prevStep = () => {
     window.scrollTo({ top: 0, behavior: 'smooth' });
     setStep(s => s - 1);
  };

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const filteredServices = SERVICES.filter(s => 
    !s.arenas || (arena && s.arenas.includes(arena))
  );

  const categories = Array.from(new Set(filteredServices.map(s => s.category)));

  return (
    <div className="w-full max-w-4xl mx-auto selection:bg-gold selection:text-black">
      {/* Sovereign Progress Path */}
      <div className="mb-16 flex justify-between items-center px-4">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-14 h-14 flex items-center justify-center transition-all duration-cine border font-brand font-bold text-lg
              ${step >= s ? 'bg-gold border-gold text-black scale-105' : 'border-quiet text-ghost/20'}`}>
              {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
            </div>
            {s < 5 && <div className={`w-8 h-px mx-4 md:w-20 transition-colors duration-cine ${step > s ? 'bg-gold' : 'bg-quiet'}`} />}
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden min-h-[400px]">
        {/* Step 1: Arena Selection */}
        {step === 1 && (
          <div className="animate-fade-in space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-brand text-gold mb-6 uppercase tracking-[0.3em]">{t('arenas.label')}</h2>
              <p className="text-secondary font-body text-sm max-w-xl mx-auto opacity-80">{t('arenas.description')}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              {[
                { id: 'interlaken', label: t('locations.switzerland'), image: '/images/tours/swiss.jpg' },
                { id: 'cairo', label: t('locations.egypt'), image: '/images/tours/egypt.jpg' }
              ].map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => { setArena(loc.id as ArenaID); nextStep(); }}
                  className={`group relative overflow-hidden h-80 transition-all duration-cine border depth-card
                    ${arena === loc.id ? 'border-gold' : 'border-quiet hover:border-gold/40'}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                  <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-cine bg-black cinema-lut">
                    <NextImage 
                      src={loc.image} 
                      alt={loc.label} 
                      fill 
                      className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-cine"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-10 z-20 text-start">
                    <span className="text-gold text-[10px] font-brand font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                       <MapPin className="w-4 h-4" strokeWidth={1.5} /> ARKDAR ARENA
                    </span>
                    <h3 className="text-3xl font-brand text-white group-hover:text-gold transition-colors duration-cine uppercase tracking-tighter">{loc.label}</h3>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Passion Selection */}
        {step === 2 && (
          <div className="animate-fade-in space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-brand text-gold mb-6 uppercase tracking-[0.3em]">{t('steps.passion')}</h2>
              <p className="text-secondary font-body text-sm max-w-xl mx-auto opacity-80">{t('subtitle')}</p>
            </div>

            <div className="space-y-16">
              {categories.map((cat) => (
                <div key={cat} className="space-y-8">
                  <h4 className="text-gold font-brand font-bold tracking-[0.4em] text-[10px] uppercase flex items-center gap-4">
                    <span className="w-12 h-px bg-gold/30" />
                    {t(`services.${cat}.title`)}
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredServices.filter(s => s.category === cat).map(s => (
                      <button
                        key={s.id}
                        onClick={() => toggleService(s.id)}
                        className={`p-8 flex flex-col items-center gap-4 transition-all duration-cine border depth-card
                          ${selectedServices.includes(s.id) 
                            ? 'bg-gold/5 border-gold text-gold' 
                            : 'layer-1 border-quiet text-ghost/40 hover:bg-gold/[0.02] hover:border-gold/20'}`}
                      >
                        <s.icon className={`w-10 h-10 transition-all duration-cine ${selectedServices.includes(s.id) ? 'scale-110 text-gold' : 'grayscale opacity-20'}`} strokeWidth={1} />
                        <span className="text-[10px] font-brand font-bold uppercase tracking-widest text-center leading-tight">
                          {t(`services.${cat}.${s.labelKey}`)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-20 layer-2 p-8 border border-quiet z-50 depth-card">
              <button onClick={prevStep} className="flex items-center gap-3 text-ghost font-brand font-bold uppercase tracking-widest text-[10px] hover:text-gold transition-colors duration-cine">
                <ChevronLeft className="w-5 h-5" /> {t('actions.back')}
              </button>
              <button 
                disabled={selectedServices.length === 0}
                onClick={nextStep} 
                className="btn-sovereign px-16 disabled:opacity-20 disabled:cursor-not-allowed"
              >
                {t('actions.next')}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Details */}
        {step === 3 && (
          <div className="animate-fade-in space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-brand text-gold mb-6 uppercase tracking-[0.3em]">{t('steps.details')}</h2>
            </div>
            
            <div className="layer-1 p-12 space-y-10 max-w-2xl mx-auto border border-quiet depth-card">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-brand font-bold uppercase tracking-widest text-ghost flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gold/60" strokeWidth={1.5} /> {t('fields.date')}
                  </label>
                   <input 
                    type="date" 
                    aria-label={t('fields.date')}
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-black border border-quiet px-6 py-5 text-white focus:border-gold outline-none transition-all duration-cine font-body text-sm" 
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-brand font-bold uppercase tracking-widest text-ghost flex items-center gap-3">
                    <Users className="w-4 h-4 text-gold/60" strokeWidth={1.5} /> {t('fields.count')}
                  </label>
                  <input 
                    type="number" 
                    placeholder="2"
                    aria-label={t('fields.count')}
                    title={t('fields.count')}
                    value={formData.count}
                    onChange={(e) => setFormData({...formData, count: e.target.value})}
                    className="w-full bg-black border border-quiet px-6 py-5 text-white focus:border-gold outline-none transition-all duration-cine placeholder:text-white/5 font-body text-sm" 
                  />
                </div>
              </div>

              <div className="space-y-6">
                <label className="text-[10px] font-brand font-bold uppercase tracking-widest text-ghost block">{t('fields.experience')}</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['beginner', 'amateur', 'professional'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setFormData({...formData, experience: level})}
                      className={`py-5 border text-[10px] font-brand font-bold uppercase tracking-widest transition-all duration-cine depth-card
                        ${formData.experience === level 
                          ? 'border-gold bg-gold text-black' 
                          : 'border-quiet bg-black text-ghost hover:border-gold/40'}`}
                    >
                      {t(`experienceLevels.${level}`)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center max-w-2xl mx-auto pt-10">
              <button onClick={prevStep} className="flex items-center gap-3 text-ghost font-brand font-bold uppercase tracking-widest text-[10px] hover:text-gold transition-colors duration-cine">
                <ChevronLeft className="w-5 h-5" /> {t('actions.back')}
              </button>
              <button onClick={nextStep} className="btn-sovereign px-16">
                 {t('actions.next')}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Profile */}
        {step === 4 && (
          <div className="animate-fade-in space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-brand text-gold mb-6 uppercase tracking-[0.3em]">{t('steps.profile')}</h2>
            </div>

            <div className="grid gap-10 max-w-2xl mx-auto layer-1 p-12 border border-quiet depth-card">
              <div className="space-y-4">
                <label className="text-[10px] font-brand font-bold uppercase tracking-widest text-ghost flex items-center gap-3"><User className="w-4 h-4 text-gold/60" strokeWidth={1.5} /> {t('fields.name')}</label>
                <input 
                  type="text" 
                  title={t('fields.name')}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black border border-quiet px-8 py-6 text-white focus:border-gold outline-none transition-all duration-cine font-body text-sm" 
                />
              </div>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-brand font-bold uppercase tracking-widest text-ghost flex items-center gap-3"><Mail className="w-4 h-4 text-gold/60" strokeWidth={1.5} /> {t('fields.email')}</label>
                  <input 
                    type="email" 
                    title={t('fields.email')}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-black border border-quiet px-8 py-6 text-white focus:border-gold outline-none transition-all duration-cine font-body text-sm" 
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-brand font-bold uppercase tracking-widest text-ghost flex items-center gap-3"><Phone className="w-4 h-4 text-gold/60" strokeWidth={1.5} /> {t('fields.phone')}</label>
                  <input 
                    type="tel" 
                    title={t('fields.phone')}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-black border border-quiet px-8 py-6 text-white focus:border-gold outline-none transition-all duration-cine font-body text-sm" 
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center max-w-2xl mx-auto pt-10">
              <button onClick={prevStep} className="flex items-center gap-3 text-ghost font-brand font-bold uppercase tracking-widest text-[10px] hover:text-gold transition-colors duration-cine">
                <ChevronLeft className="w-5 h-5" /> {t('actions.back')}
              </button>
              <button 
                disabled={isSubmitting}
                onClick={handleBookingSubmit} 
                className={`btn-sovereign px-20 disabled:opacity-20 ${isSubmitting ? 'animate-pulse' : ''}`}
              >
                 {isSubmitting ? '...' : t('steps.confirm')}
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Success/Processing */}
        {step === 5 && (
          <div className="animate-fade-in text-center space-y-12 py-24 border border-gold/10 depth-card layer-1">
            <div className="w-32 h-32 bg-gold/5 flex items-center justify-center mx-auto ring-1 ring-gold/10 animate-pulse border border-gold/20">
              <CheckCircle2 className="w-16 h-16 text-gold" strokeWidth={1} />
            </div>
            <div className="space-y-8">
              <h2 className="text-5xl font-brand text-gold uppercase tracking-[0.4em]">{t('home')}</h2>
              <p className="text-secondary max-w-lg mx-auto leading-relaxed font-body text-base opacity-80">
                {t('messages.confirmation')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-12">
               <button onClick={() => setStep(1)} className="btn-sovereign px-20 py-6">
                  {t('home')}
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
