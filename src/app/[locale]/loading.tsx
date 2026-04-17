import NextImage from 'next/image';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center font-brand">
      <div className="relative w-32 h-32">
        {/* Sovereign Movement Arrow - Gold */}
        <div className="absolute inset-0 animate-spin-slow">
          <NextImage
            src="/images/brand/movement/Movement_Arrow_Gold.png"
            alt="ARKDAR Loading"
            fill
            className="object-contain cinema-lut"
          />
        </div>
        
        {/* Center Glow */}
        <div className="absolute inset-4 bg-gold/10 blur-2xl rounded-full animate-pulse" />
      </div>
      
      <div className="absolute bottom-20 text-gold text-[10px] font-bold tracking-[1em] uppercase animate-pulse">
        Sovereignty Loading
      </div>
    </div>
  );
}
