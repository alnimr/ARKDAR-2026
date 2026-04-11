'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  CalendarCheck, 
  Users, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/arena/firebase';
import { useRouter } from 'next/navigation';

export default function AdminSidebar({ locale }: { locale: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const isRtl = locale === 'ar';

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push(`/${locale}/admin-login`);
    } catch (e) {
      console.error('Logout error', e);
    }
  };

  const navItems = [
    { href: `/${locale}/admin`, icon: LayoutDashboard, label: 'لوحة القيادة' },
    { href: `/${locale}/admin/heritage`, icon: FileText, label: 'المجلة والديوان' },
    { href: `/${locale}/admin/bookings`, icon: CalendarCheck, label: 'الحجوزات' },
    { href: `/${locale}/admin/trainees`, icon: Users, label: 'مختبر الذكاء الاصطناعي' },
    { href: `/${locale}/admin/settings`, icon: Settings, label: 'الإعدادات' },
  ];

  return (
    <aside className={`fixed top-0 bottom-0 ${isRtl ? 'right-0' : 'left-0'} w-72 bg-[#0a0a0a] border-${isRtl ? 'l' : 'r'} border-white/5 z-50 flex flex-col`}>
      {/* Brand */}
      <div className="h-20 flex items-center px-8 border-b border-white/5">
        <span className="text-xl font-serif text-white tracking-[5px] uppercase">
          ARKDAR <span className="text-brand-primary text-xs ml-2">HQ</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${isRtl ? 'flex-row-reverse' : ''} ${
                isActive 
                ? 'bg-brand-primary/10 text-brand-secondary border border-brand-primary/20' 
                : 'text-white/40 hover:bg-white/[0.02] hover:text-white/80'
              }`}
            >
              <Icon size={18} />
              <span className="text-sm font-bold tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / User */}
      <div className="p-4 border-t border-white/5">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white/40 hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOut size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}
