import { setRequestLocale } from 'next-intl/server';
import AdminSidebar from '@/components/admin/Sidebar';
import AuthGuard from '@/components/admin/AuthGuard';

export default async function AdminLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isRtl = locale === 'ar';

  return (
    <AuthGuard locale={locale}>
      <div className="min-h-screen bg-black flex selection:bg-gold selection:text-black pt-sovereign-nav" dir={isRtl ? 'rtl' : 'ltr'}>
        {/* Sidebar */}
        <AdminSidebar locale={locale} />
      
        {/* Main Content Area */}
        <main className={`flex-1 min-h-screen ${isRtl ? 'mr-72' : 'ml-72'} bg-black`}>
          {/* Admin Header */}
          <header className="h-24 border-b border-quiet layer-1 flex items-center px-12 sticky-stacked-nav">
            <h1 className="text-gold font-brand text-xl uppercase tracking-[0.2em] leading-none pt-1">
              {isRtl ? 'مركز القيادة الموحد' : 'Unified Command Center'}
            </h1>
          </header>

          {/* Dynamic Content */}
          <div className="p-16 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
