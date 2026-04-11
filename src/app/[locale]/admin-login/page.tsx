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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/10 blur-[150px] rounded-full" />
      </div>

      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md p-10 rounded-[32px] bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="flex justify-center mb-10">
            <div className="w-16 h-16 rounded-full bg-brand-primary/10 border border-brand-primary/30 flex items-center justify-center text-brand-primary">
              <Shield size={28} />
            </div>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-2xl font-serif text-white mb-2 uppercase tracking-[4px]">ARKDAR HQ</h1>
            <p className="text-sm text-white/40">Authorized Personnel Only</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">
                {isRtl ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50 transition-colors"
                placeholder="admin@arkdar.com"
                dir="ltr"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-2">
                {isRtl ? 'كلمة المرور' : 'Password'}
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-primary/50 transition-colors"
                placeholder="••••••••"
                dir="ltr"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-white text-[#050505] hover:bg-white/90 disabled:opacity-50 py-4 rounded-xl font-bold uppercase tracking-[2px] text-sm transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#050505]/20 border-t-[#050505] rounded-full animate-spin" />
              ) : (
                <>
                  <Lock size={16} />
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
