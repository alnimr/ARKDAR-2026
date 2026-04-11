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
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
        <ShieldAlert size={48} className="text-brand-primary/50 animate-pulse mb-6" />
        <h2 className="text-xl font-serif tracking-[5px] uppercase text-white/50">ARKDAR SECURE CHECK</h2>
        <div className="mt-8 w-48 h-1 bg-white/5 rounded-full overflow-hidden">
           <div className="h-full bg-brand-primary/50 rounded-full animate-progress" />
        </div>
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
}
