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
    <aside className={`fixed top-0 bottom-0 ${isRtl ? 'right-0' : 'left-0'} w-72 bg-black border-${isRtl ? 'l' : 'r'} border-quiet z-50 flex flex-col selection:bg-gold selection:text-black`}>
      {/* Brand */}
      <div className="h-24 flex items-center px-10 border-b border-quiet layer-1">
        <span className="text-xl font-brand text-white tracking-[0.25em] uppercase">
          ARKDAR <span className="text-gold text-[10px] ml-2 font-bold tracking-widest">HQ</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-12 px-6 space-y-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-5 px-6 py-5 transition-all duration-cine ${isRtl ? 'flex-row-reverse' : ''} ${
                isActive 
                ? 'bg-gold text-black depth-card' 
                : 'text-ghost hover:bg-gold/5 hover:text-white border border-transparent hover:border-quiet'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-black' : 'text-inherit'} strokeWidth={isActive ? 2 : 1.5} />
              <span className={`text-[11px] font-brand font-bold uppercase tracking-[0.2em] ${isActive ? 'text-black' : 'text-inherit'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / User */}
      <div className="p-8 border-t border-quiet layer-1">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 px-6 py-5 text-ghost hover:text-white transition-all duration-cine font-brand border border-quiet hover:bg-gold hover:text-black hover:border-gold"
        >
          <LogOut size={16} />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}
