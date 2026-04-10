import { setRequestLocale } from 'next-intl/server';
import { Users, FileText, CalendarCheck, TrendingUp } from 'lucide-react';

export default async function AdminDashboard({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const stats = [
    { title: 'المقالات المنشورة', value: '25', icon: FileText, color: 'text-brand-secondary' },
    { title: 'طلبات الحجز الجديدة', value: '12', icon: CalendarCheck, color: 'text-brand-primary' },
    { title: 'المتدربين النشطين', value: '48', icon: Users, color: 'text-blue-400' },
    { title: 'مبيعات المعدات (The Collection)', value: '+14%', icon: TrendingUp, color: 'text-emerald-400' },
  ];

  return (
    <div className="space-y-8 animate-fade-up">
      <div>
        <h2 className="text-3xl font-serif text-white mb-2">مرحباً بك في مقر القيادة (HQ)</h2>
        <p className="text-white/40 text-sm">هنا يمكنك إدارة كل شيء يتعلق بمنصة أركدار ومختبر الذكاء الاصطناعي.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
              <div className="flex items-center justify-between mb-4">
                 <span className="text-white/50 text-sm font-medium">{stat.title}</span>
                 <Icon size={20} className={stat.color} />
              </div>
              <div className="text-4xl font-serif text-white">{stat.value}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Mock */}
      <div className="mt-12 p-8 rounded-3xl border border-white/5 bg-white/[0.01]">
         <h3 className="text-lg font-serif text-white mb-6">أحدث الأنشطة</h3>
         <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-white/60 p-4 bg-white/[0.02] rounded-xl border border-white/5">
              <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
              حجز جديد في فرع الرياض (دورة الرماية المتقدمة).
            </div>
            <div className="flex items-center gap-4 text-sm text-white/60 p-4 bg-white/[0.02] rounded-xl border border-white/5">
              <span className="w-2 h-2 rounded-full bg-brand-secondary" />
              المتدرب أحمد رفع فيديو أداء جديد لمراجعته.
            </div>
            <div className="flex items-center gap-4 text-sm text-white/60 p-4 bg-white/[0.02] rounded-xl border border-white/5">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              تم نشر مقال &quot;تاريخ القوس العربي&quot; في قسم الإرث بنجاح.
            </div>
         </div>
      </div>
    </div>
  );
}
