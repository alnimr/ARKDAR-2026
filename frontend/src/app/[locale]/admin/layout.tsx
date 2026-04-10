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
      <div className="min-h-screen bg-surface-dark flex" dir={isRtl ? 'rtl' : 'ltr'}>
        {/* Sidebar */}
      <AdminSidebar locale={locale} />
      
      {/* Main Content Area */}
      <main className={`flex-1 min-h-screen ${isRtl ? 'mr-72' : 'ml-72'} bg-[#050505]`}>
        {/* Admin Header Context (optional) */}
        <header className="h-20 border-b border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md flex items-center px-8 sticky top-0 z-40">
          <h1 className="text-white/70 font-semibold text-lg">بوابة التحكم الموحدة</h1>
        </header>

        {/* Dynamic Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
    </AuthGuard>
  );
}
