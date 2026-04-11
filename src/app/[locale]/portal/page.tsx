import { getTranslations, setRequestLocale } from 'next-intl/server';
import { 
  LayoutDashboard, Activity, Users, Settings, Zap, 
  ShieldCheck 
} from 'lucide-react';
import PortalDashboardClient from '@/components/portal/PortalDashboardClient';
import LiveClock from '@/components/portal/LiveClock';
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
    <div className="flex h-screen bg-[#050505] overflow-hidden">
      {/* Tactical Sidebar */}
      <aside className="w-80 h-full border-r border-white/5 bg-[#080808] flex flex-col p-8 z-30">
         <div className="mb-12">
            <h1 className="text-2xl font-serif text-white tracking-widest uppercase">
               ARK-PORTAL <span className="text-brand-primary">v2.0</span>
            </h1>
         </div>

         <nav className="flex-grow space-y-2">
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
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all ${item.active ? 'bg-brand-primary text-white shadow-[0_0_30px_rgba(160,6,28,0.2)]' : 'text-white/30 hover:bg-white/5 hover:text-white'}`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            ))}
         </nav>

         <div className="mt-auto">
            <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
               <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{t('connectivity')}</p>
                  <ShieldCheck size={14} className="text-emerald-400" />
               </div>
               <p className="text-xs text-white/60 font-medium leading-relaxed">
                  {t('uplink')}
               </p>
            </div>
         </div>
      </aside>
      {/* Main Command Center */}
      <main className="flex-grow overflow-y-auto relative p-12">
        <PortalDashboardClient />

         <LiveClock />
       </main>
    </div>
  );
}
