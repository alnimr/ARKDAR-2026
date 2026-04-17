'use client';

import { useState, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/arena/firebase';
import { Shield, Lock } from 'lucide-react';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const locale = pathname.includes('/ar') ? 'ar' : 'en';
  const isRtl = locale === 'ar';

  const [error, setError] = useState(searchParams?.get('error') === 'unauthorized' 
    ? (isRtl ? 'عذراً، هذا الحساب لا يملك صلاحيات وصول للمسؤولين.' : 'Unauthorized: This account does not have admin privileges.')
    : ''
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push(`/${locale}/admin`);
    } catch (err: unknown) {
      console.error('Login error', err);
      setError(isRtl ? 'بيانات الدخول غير صحيحة، أو غير مصرح لك.' : 'Invalid credentials or unauthorized.');
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-surface-dark flex relative overflow-hidden ${isRtl ? 'dir-rtl text-right' : 'dir-ltr text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/10 blur-[150px]" />
      </div>

      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md p-10 bg-surface-dark border border-sovereign shadow-2xl">
          <div className="flex justify-center mb-10">
            <div className="w-16 h-16 bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary">
              <Shield size={28} />
            </div>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-2xl font-title text-white mb-2 uppercase tracking-[6px]">ARKDAR HQ</h1>
            <p className="text-[10px] font-bold uppercase tracking-[4px] text-white/30 font-body">Authorized Personnel Only</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest text-center font-body">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2 font-body">
                {isRtl ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.03] border border-sovereign px-4 py-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-body"
                placeholder="admin@arkdar.com"
                dir="ltr"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2 font-body">
                {isRtl ? 'كلمة المرور' : 'Password'}
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.03] border border-sovereign px-4 py-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-body"
                placeholder="••••••••"
                dir="ltr"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 bg-brand-primary text-white hover:bg-brand-secondary disabled:opacity-50 py-5 font-bold uppercase tracking-[4px] text-[10px] transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(145,16,16,0.3)] font-body"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white animate-spin" />
              ) : (
                <>
                  <Lock size={14} />
                  {isRtl ? 'تسجيل الدخول للقيادة' : 'Login to HQ'}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AdminLogin() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-dark" />}>
      <AdminLoginForm />
    </Suspense>
  );
}
