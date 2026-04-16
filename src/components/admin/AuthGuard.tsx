'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/arena/firebase';
import { ShieldAlert } from 'lucide-react';

export default function AuthGuard({ children, locale }: { children: React.ReactNode, locale: string }) {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.warn('Unauthorized access attempt detected, redirecting to login HQ.');
        router.push(`/${locale}/admin-login`);
      } else {
        // Simple Admin Check (Skill: authorization-patterns)
        // Including the user's specific admin email
        const isAdmin = user.email?.endsWith('@arkdar.com') || 
                        user.email === 'admin@arkdar.com' ||
                        user.email === 'alnimr000@gmail.com';
        
        if (isAdmin) {
          setIsAuthorized(true);
          setLoading(false);
        } else {
          console.error('Non-admin user tried to access HQ:', user.email);
          router.push(`/${locale}/admin-login?error=unauthorized`);
        }
      }
    });

    return () => unsubscribe();
  }, [locale, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-dark flex flex-col items-center justify-center text-white">
        <ShieldAlert size={48} className="text-brand-primary/80 animate-pulse mb-6 drop-shadow-[0_0_20px_rgba(145,16,16,0.3)]" />
        <h2 className="text-xl font-title tracking-[8px] uppercase text-white/50">ARKDAR SECURE CHECK</h2>
        <div className="mt-8 w-64 h-[1px] bg-white/5 relative overflow-hidden">
           <div className="absolute top-0 left-0 h-full bg-brand-primary w-1/3 animate-loading-bar" />
        </div>
        <p className="mt-6 text-[10px] font-bold uppercase tracking-[4px] text-white/20 font-body">Authorized Personnel Only</p>
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
}
