import { getTranslations, setRequestLocale } from 'next-intl/server';
import { 
  LayoutDashboard, Activity, Users, Settings, Zap, 
  ShieldCheck 
} from 'lucide-react';
import PortalDashboardClient from '@/components/portal/PortalDashboardClient';
import { Link } from '@/i18n/routing';

export default async function PortalPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Portal');

  return (
    <div className="flex h-screen layer-0 overflow-hidden selection:bg-gold selection:text-black font-brand">
      {/* Tactical Sidebar */}
      <aside className="w-80 h-full border-l border-quiet layer-1 flex flex-col p-12 z-30 shadow-2xl relative">
         <div className="mb-20">
            <h1 className="text-2xl font-brand font-bold text-white tracking-[0.5em] uppercase leading-none">
               ARK-PORTAL <span className="text-gold">3.0</span>
            </h1>
         </div>

         <nav className="flex-grow space-y-6">
            {[
              { name: t('navOverview'), icon: LayoutDashboard, active: true, href: '/portal' },
              { name: t('navMetrics'), icon: Activity, href: '#' },
              { name: t('navMembers'), icon: Users, href: '#' },
              { name: t('navLab'), icon: Zap, href: '/portal/lab' },
              { name: t('navSettings'), icon: Settings, href: '#' },
            ].map(item => (
              <Link 
                href={item.href as '/'} 
                key={item.name} 
                className={`flex items-center gap-6 px-8 py-6 text-[11px] font-brand font-bold uppercase tracking-[0.4em] transition-all duration-cine ${item.active ? 'bg-gold text-black depth-card' : 'text-ghost/60 hover:bg-white/5 hover:text-white hover:ps-10'}`}
              >
                <item.icon size={20} strokeWidth={item.active ? 2 : 1} />
                {item.name}
              </Link>
            ))}
         </nav>

         <div className="mt-auto">
            <div className="layer-2 p-10 border border-quiet depth-card group hover:border-gold/30 transition-all duration-cine">
               <div className="flex items-center justify-between mb-6">
                  <p className="text-[11px] text-gold font-brand font-bold uppercase tracking-[0.4em]">{t('connectivity')}</p>
                  <ShieldCheck size={16} className="text-gold" />
               </div>
               <p className="text-[12px] text-ghost font-brand font-light leading-relaxed opacity-70">
                  {t('uplink')}
               </p>
            </div>
         </div>
      </aside>

      {/* Main Command Center */}
      <main className="flex-grow overflow-y-auto relative p-20 layer-0">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-gold/[0.03] to-transparent pointer-events-none" />
        <PortalDashboardClient />
      </main>
    </div>
  );
}
