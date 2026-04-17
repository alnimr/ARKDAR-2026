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
    <div className={`min-h-screen bg-black flex relative overflow-hidden ${isRtl ? 'dir-rtl text-right' : 'dir-ltr text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Sovereign Background Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 blur-[200px] opacity-20" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/5 blur-[150px] opacity-10" />
      </div>

      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md p-14 layer-1 border border-quiet depth-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-px bg-gold/30" />
          <div className="absolute top-0 right-0 w-px h-24 bg-gold/30" />
          
          <div className="flex justify-center mb-12">
            <div className="w-20 h-20 bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
              <Shield size={32} strokeWidth={1.5} />
            </div>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-2xl font-brand text-white mb-3 uppercase tracking-[0.4em]">ARKDAR HQ</h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ghost font-latin">Authorized Personnel Only</p>
          </div>

          {error && (
            <div className="mb-8 p-5 bg-gold/10 border border-gold/20 text-gold text-[10px] font-bold uppercase tracking-[0.2em] text-center font-latin">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="group">
              <label className="block text-[10px] font-bold text-ghost uppercase tracking-[0.2em] mb-3 font-latin group-focus-within:text-gold transition-colors duration-cine">
                {isRtl ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.02] border border-quiet px-5 py-5 text-white focus:outline-none focus:border-gold/50 transition-all duration-cine font-body text-sm"
                placeholder="admin@arkdar.com"
                dir="ltr"
              />
            </div>
            
            <div className="group">
              <label className="block text-[10px] font-bold text-ghost uppercase tracking-[0.2em] mb-3 font-latin group-focus-within:text-gold transition-colors duration-cine">
                {isRtl ? 'كلمة المرور' : 'Password'}
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.02] border border-quiet px-5 py-5 text-white focus:outline-none focus:border-gold/50 transition-all duration-cine font-body text-sm"
                placeholder="••••••••"
                dir="ltr"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-10 bg-gold text-black hover:bg-white hover:text-black disabled:opacity-50 py-6 font-bold uppercase tracking-[0.4em] text-[10px] transition-all duration-cine flex items-center justify-center gap-4 depth-card font-latin"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/20 border-t-black animate-spin" />
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
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <AdminLoginForm />
    </Suspense>
  );
}
