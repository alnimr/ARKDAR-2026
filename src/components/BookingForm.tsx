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
  Phone,
  ArrowRight,
  LucideIcon
} from 'lucide-react';
import { db } from '@/lib/arena/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// --- Types & Data ---

type ArenaID = 'interlaken' | 'cairo' | 'other';

interface Service {
  id: string;
  category: string;
  labelKey: string;
  icon: LucideIcon;
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

  // Handle URL selection (Skill: api-patterns)
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
      setStep(5); // Show success screen
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
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Path */}
      <div className="mb-12 flex justify-between items-center px-4">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2 
              ${step >= s ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'border-white/20 text-white/40'}`}>
              {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
            </div>
            {s < 5 && <div className={`w-8 h-px mx-2 md:w-16 ${step > s ? 'bg-brand-primary' : 'bg-white/10'}`} />}
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden min-h-[400px]">
        {/* Step 1: Arena Selection */}
        {step === 1 && (
          <div className="animate-fade-in space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-serif font-bold text-white mb-4">{t('arenas.label')}</h2>
              <p className="text-white/60">{t('arenas.description')}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { id: 'interlaken', label: t('locations.switzerland'), image: '/images/tours/swiss.jpg' },
                { id: 'cairo', label: t('locations.egypt'), image: '/images/tours/egypt.jpg' }
              ].map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => { setArena(loc.id as ArenaID); nextStep(); }}
                  className={`group relative overflow-hidden rounded-3xl h-64 transition-all duration-500 border-2 
                    ${arena === loc.id ? 'border-arkdar-royal ring-4 ring-arkdar-royal/20' : 'border-white/10'}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                  <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-1000 bg-secondary-900" />
                  <div className="absolute inset-0 flex flex-col justify-end p-8 z-20 text-start">
                    <span className="text-white/60 text-sm mb-2 flex items-center gap-2">
                       <MapPin className="w-4 h-4" /> ARKDAR ARENA
                    </span>
                    <h3 className="text-2xl font-bold text-white group-hover:text-brand-primary transition-colors">{loc.label}</h3>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Passion Selection */}
        {step === 2 && (
          <div className="animate-fade-in space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-serif font-bold text-white mb-4">{t('steps.passion')}</h2>
              <p className="text-white/60">{t('subtitle')}</p>
            </div>

            <div className="space-y-10">
              {categories.map((cat) => (
                <div key={cat} className="space-y-4">
                  <h4 className="text-brand-primary font-bold tracking-widest text-xs uppercase flex items-center gap-2">
                    <span className="w-8 h-px bg-brand-primary/30" />
                    {t(`services.${cat}.title`)}
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredServices.filter(s => s.category === cat).map(s => (
                      <button
                        key={s.id}
                        onClick={() => toggleService(s.id)}
                        className={`p-4 rounded-2xl flex flex-col items-center gap-3 transition-all duration-300 border 
                          ${selectedServices.includes(s.id) 
                            ? 'bg-arkdar-royal/10 border-arkdar-royal text-arkdar-royal shadow-[0_0_20px_rgba(132,5,5,0.15)]' 
                            : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'}`}
                      >
                        <s.icon className={`w-8 h-8 transition-transform ${selectedServices.includes(s.id) ? 'scale-110' : ''}`} />
                        <span className="text-xs font-medium text-center leading-tight">
                          {t(`services.${cat}.${s.labelKey}`)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-12 bg-secondary-950/50 p-6 rounded-3xl backdrop-blur-md sticky bottom-4 border border-white/5">
              <button onClick={prevStep} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                <ChevronLeft className="w-5 h-5" /> {t('actions.back')}
              </button>
              <button 
                disabled={selectedServices.length === 0}
                onClick={nextStep} 
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {t('actions.next')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Details */}
        {step === 3 && (
          <div className="animate-fade-in space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-serif font-bold text-white mb-4">{t('steps.details')}</h2>
            </div>
            
            <div className="glass p-8 rounded-3xl space-y-6 max-w-2xl mx-auto border-2 border-arkdar-royal/20 shadow-xl">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm text-white/70 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-primary" /> {t('fields.date')}
                  </label>
                   <input 
                    type="date" 
                    aria-label={t('fields.date')}
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 outline-none transition-all" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm text-white/70 flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-primary" /> {t('fields.count')}
                  </label>
                  <input 
                    type="number" 
                    placeholder="2"
                    aria-label={t('fields.count')}
                    title={t('fields.count')}
                    value={formData.count}
                    onChange={(e) => setFormData({...formData, count: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 outline-none transition-all placeholder:text-white/20" 
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm text-white/70 block">{t('fields.experience')}</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['beginner', 'amateur', 'professional'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setFormData({...formData, experience: level})}
                      className={`p-4 rounded-xl border text-xs font-medium transition-all text-center
                        ${formData.experience === level 
                          ? 'border-arkdar-royal bg-arkdar-royal/10 text-arkdar-royal shadow-md' 
                          : 'border-white/10 bg-white/5 text-white/50 hover:bg-white/10'}`}
                    >
                      {t(`experienceLevels.${level}`)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-8">
              <button onClick={prevStep} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                <ChevronLeft className="w-5 h-5" /> {t('actions.back')}
              </button>
              <button onClick={nextStep} className="btn-primary group">
                 {t('actions.next')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Profile */}
        {step === 4 && (
          <div className="animate-fade-in space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-serif font-bold text-white mb-4">{t('steps.profile')}</h2>
            </div>

            <div className="grid gap-6 max-w-2xl mx-auto glass p-8 rounded-3xl border-2 border-arkdar-royal/20 shadow-xl">
              <div className="space-y-2">
                <label className="text-sm text-white/70 flex items-center gap-2"><User className="w-3 h-3 text-brand-primary" /> {t('fields.name')}</label>
                <input 
                  type="text" 
                  title={t('fields.name')}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-brand-primary outline-none transition-all" 
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-white/70 flex items-center gap-2"><Mail className="w-3 h-3 text-brand-primary" /> {t('fields.email')}</label>
                  <input 
                    type="email" 
                    title={t('fields.email')}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-brand-primary outline-none transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/70 flex items-center gap-2"><Phone className="w-3 h-3 text-brand-primary" /> {t('fields.phone')}</label>
                  <input 
                    type="tel" 
                    title={t('fields.phone')}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-brand-primary outline-none transition-all placeholder:text-ltr" 
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-8">
              <button onClick={prevStep} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                <ChevronLeft className="w-5 h-5" /> {t('actions.back')}
              </button>
              <button 
                disabled={isSubmitting}
                onClick={handleBookingSubmit} 
                className="btn-primary group disabled:opacity-50"
              >
                 {isSubmitting ? '...' : t('steps.confirm')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Success/Processing */}
        {step === 5 && (
          <div className="animate-fade-in text-center space-y-8 py-12">
            <div className="w-24 h-24 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto ring-8 ring-brand-primary/5 animate-pulse">
              <CheckCircle2 className="w-12 h-12 text-brand-primary" />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-serif font-bold text-white">{t('home')}</h2>
              <p className="text-white/60 max-w-md mx-auto leading-relaxed">
                {t('messages.confirmation')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
               <button onClick={() => setStep(1)} className="px-8 py-4 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-all">
                  {t('home')}
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
