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
    <aside className={`fixed top-0 bottom-0 ${isRtl ? 'right-0' : 'left-0'} w-72 bg-surface-dark border-${isRtl ? 'l' : 'r'} border-sovereign z-50 flex flex-col`}>
      {/* Brand */}
      <div className="h-24 flex items-center px-8 border-b border-sovereign bg-gradient-to-b from-brand-primary/5 to-transparent">
        <span className="text-xl font-title text-white tracking-[5px] uppercase">
          ARKDAR <span className="text-brand-primary text-[10px] ml-2 font-body font-bold">HQ</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-5 py-4 transition-all duration-500 ${isRtl ? 'flex-row-reverse' : ''} ${
                isActive 
                ? 'bg-brand-primary text-white shadow-[0_4px_20px_rgba(145,16,16,0.3)] border border-brand-primary/20 scale-[1.02]' 
                : 'text-white/40 hover:bg-white/[0.05] hover:text-white/80'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-white' : 'text-inherit'} />
              <span className={`text-[11px] font-bold tracking-widest uppercase font-body ${isActive ? 'text-white' : 'text-inherit'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / User */}
      <div className="p-6 border-t border-sovereign bg-surface-dark/50">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-4 text-white/40 hover:bg-brand-primary hover:text-white transition-all duration-300 font-body border border-transparent hover:border-brand-primary/30"
        >
          <LogOut size={16} />
          <span className="text-[10px] font-bold uppercase tracking-[3px]">تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}
