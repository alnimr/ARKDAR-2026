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
    <div className="flex h-screen bg-surface-dark overflow-hidden">
      {/* Tactical Sidebar */}
      <aside className="w-80 h-full border-r border-sovereign bg-surface-dark flex flex-col p-8 z-30">
         <div className="mb-12">
            <h1 className="text-2xl font-title text-white tracking-[6px] uppercase">
               ARK-PORTAL <span className="text-brand-primary">v3.0</span>
            </h1>
         </div>

         <nav className="flex-grow space-y-3">
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
                className={`flex items-center gap-4 px-6 py-5 text-[10px] font-bold uppercase tracking-[3px] transition-all font-body ${item.active ? 'bg-brand-primary text-white shadow-[0_4px_20px_rgba(145,16,16,0.3)]' : 'text-white/30 hover:bg-white/5 hover:text-white'}`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            ))}
         </nav>

         <div className="mt-auto">
            <div className="layer-1 p-6 border border-sovereign">
               <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest font-body">{t('connectivity')}</p>
                  <ShieldCheck size={14} className="text-brand-primary" />
               </div>
               <p className="text-xs text-white/60 font-medium leading-relaxed font-body">
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
