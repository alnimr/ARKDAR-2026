"use client";

import { Users, FileText, CalendarCheck, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const stats = [
    { title: 'المقالات المنشورة', value: '25', icon: FileText, color: 'text-gold' },
    { title: 'طلبات الحجز الجديدة', value: '12', icon: CalendarCheck, color: 'text-secondary' },
    { title: 'المتدربين النشطين', value: '48', icon: Users, color: 'text-ghost' },
    { title: 'مبيعات المعدات (THE COLLECTION)', value: '+14%', icon: TrendingUp, color: 'text-ghost' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-12 selection:bg-gold selection:text-black"
    >
      <div className="border-b border-quiet pb-8">
        <h2 className="text-4xl font-brand text-gold mb-3 uppercase tracking-tight">مقر القيادة السيادية</h2>
        <p className="text-ghost text-sm font-body opacity-60 uppercase tracking-widest">إدارة المنصة المركزية ومختبر الذكاء الاصطناعي</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="p-10 layer-1 border border-quiet hover:border-gold/30 transition-all duration-cine depth-card group"
            >
              <div className="flex items-center justify-between mb-6">
                 <span className="text-ghost text-[10px] font-brand font-bold uppercase tracking-[0.2em] opacity-50 group-hover:opacity-100 transition-opacity duration-cine">{stat.title}</span>
                 <Icon size={24} className={`${stat.color} opacity-40 group-hover:opacity-100 transition-all duration-cine`} strokeWidth={1.5} />
              </div>
              <div className="text-5xl font-brand text-gold tracking-tighter group-hover:scale-105 transition-transform duration-cine origin-left">{stat.value}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="mt-16 p-12 layer-1 border border-quiet depth-card relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] -mr-20 -mt-20 pointer-events-none" />
         <h3 className="text-xl font-brand text-white mb-10 uppercase tracking-widest border-s-2 border-gold ps-6">سجل العمليات الأخير</h3>
         <div className="space-y-6">
            <div className="flex items-center gap-6 text-sm text-secondary p-6 layer-2 border border-quiet hover:border-gold/20 transition-all duration-cine group">
              <span className="w-3 h-3 bg-gold shadow-[0_0_15px_rgba(212,175,55,0.4)] animate-pulse shrink-0" />
              <div className="flex flex-col gap-1">
                <span className="text-white font-brand text-[11px] uppercase tracking-widest">حجز جديد - فرع الرياض</span>
                <span className="text-ghost text-[10px] uppercase opacity-50">دورة الرماية المتقدمة</span>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-secondary p-6 layer-2 border border-quiet hover:border-gold/20 transition-all duration-cine group">
              <span className="w-3 h-3 bg-secondary shrink-0" />
              <div className="flex flex-col gap-1">
                <span className="text-white font-brand text-[11px] uppercase tracking-widest">تحديث ملف أداء</span>
                <span className="text-ghost text-[10px] uppercase opacity-50">المتدرب أحمد: مراجعة فيديو الرماية</span>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-secondary p-6 layer-2 border border-quiet hover:border-gold/20 transition-all duration-cine group">
              <span className="w-3 h-3 bg-ghost shrink-0" />
              <div className="flex flex-col gap-1">
                <span className="text-white font-brand text-[11px] uppercase tracking-widest">نشر محتوى جديد</span>
                <span className="text-ghost text-[10px] uppercase opacity-50">مقال: تاريخ القوس العربي - قسم الإرث</span>
              </div>
            </div>
         </div>
      </div>
    </motion.div>
  );
}
