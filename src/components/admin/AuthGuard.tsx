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
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white selection:bg-gold selection:text-black">
        <ShieldAlert size={64} className="text-gold animate-pulse mb-8 opacity-80" strokeWidth={1.5} />
        <h2 className="text-2xl font-brand tracking-[0.3em] uppercase text-gold">ARKDAR SECURE CHECK</h2>
        <div className="mt-10 w-80 h-[2px] bg-quiet relative overflow-hidden">
           <div className="absolute top-0 left-0 h-full bg-gold w-1/3 animate-loading-bar" />
        </div>
        <p className="mt-8 text-[11px] font-brand font-bold uppercase tracking-[0.5em] text-ghost opacity-40">Authorized Personnel Only</p>
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
}
