/**
 * @file MamlukOrnaments.tsx
 * @description High-fidelity React components for Mamluk geometric ornaments.
 * Implements the mathematical star generation logic from the ARKDAR Brand Strategy.
 */

import React from 'react';

type StarType = 8 | 10 | 12 | 16;

interface OrnamentProps {
    type?: StarType;
    size?: number | string;
    degree?: 'hidden' | 'divider' | 'sovereign';
    className?: string;
    color?: string;
    opacity?: number;
}

// Mathematical helpers
const getInnerRatio = (n: StarType): number => {
    switch (n) {
        case 8: return 0.414;
        case 10: return 0.382;
        case 12: return 0.268;
        case 16: return 0.199;
        default: return 0.268;
    }
};

const starPath = (cx: number, cy: number, R: number, r: number, n: number, rotation = -Math.PI / 2) => {
    const pts = [];
    const step = Math.PI / n;
    for (let i = 0; i < 2 * n; i++) {
        const angle = rotation + i * step;
        const radius = i % 2 === 0 ? R : r;
        pts.push(`${(cx + radius * Math.cos(angle)).toFixed(3)},${(cy + radius * Math.sin(angle)).toFixed(3)}`);
    }
    return `M ${pts.join(' L ')} Z`;
};

/**
 * MamlukStar Component
 * Generates a single high-fidelity Mamluk star based on the specified degree.
 */
export const MamlukStar: React.FC<OrnamentProps> = ({
    type = 12,
    size = 120,
    degree = 'divider',
    className = '',
    color = 'var(--color-gold)',
    opacity = 1
}) => {
    const n = type;
    const innerRatio = getInnerRatio(n);
    const cx = 100, cy = 100, R = 88, r = R * innerRatio;
    const accentColor = 'var(--color-gold-light)';

    if (degree === 'hidden') {
        return (
            <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={`pointer-events-none select-none ${className}`} style={{ opacity }}>
                <path d={starPath(cx, cy, R, r, n)} fill={color} />
                <path d={starPath(cx, cy, R, r, n)} stroke={color} strokeWidth="1" fill="none" />
            </svg>
        );
    }

    if (degree === 'divider') {
        return (
            <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className} style={{ opacity }}>
                <path d={starPath(cx, cy, R, r, n)} fill={color} className="opacity-[0.12]" />
                <path d={starPath(cx, cy, R, r, n)} stroke={color} strokeWidth="1.2" fill="none" className="animate-draw" />
                <circle cx={cx} cy={cy} r="4" fill={accentColor} className="opacity-[0.7]" />
            </svg>
        );
    }

    // Sovereign Degree: Full complexity + Construction Animation
    return (
        <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className} style={{ opacity }}>
            {/* Background layers */}
            {[0, 1, 2].map((ring) => {
                const rScale = 1 - ring * 0.3;
                return (
                    <path 
                        key={ring}
                        d={starPath(cx, cy, R * rScale, r * rScale, n, -Math.PI / 2 + ring * Math.PI / (n * 2))}
                        fill={color}
                        className="transition-opacity duration-exp"
                        style={{ opacity: 0.06 + ring * 0.04 }}
                    />
                );
            })}

            {/* Guide circles */}
            {[R, R * 0.7, R * 0.4].map((radius, i) => (
                <circle 
                    key={i}
                    cx={cx} cy={cy} r={radius}
                    stroke={color} strokeWidth="0.5" fill="none"
                    className="opacity-[0.15] animate-pulse"
                    style={{ animationDelay: `${i * 200}ms` }}
                />
            ))}

            {/* Construction lines */}
            {Array.from({ length: n }).map((_, i) => {
                const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
                const p1 = { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
                const j = (i + Math.floor(n / 3)) % n;
                const a2 = -Math.PI / 2 + (2 * Math.PI * j) / n;
                const p2 = { x: cx + R * Math.cos(a2), y: cy + R * Math.sin(a2) };
                return (
                    <line 
                        key={i}
                        x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                        stroke={color} strokeWidth="0.4" className="opacity-[0.2] animate-draw"
                        style={{ animationDelay: `${i * 50}ms` }}
                    />
                );
            })}

            {/* Main star */}
            <path d={starPath(cx, cy, R, r, n)} stroke={accentColor} strokeWidth="1.5" fill="none" className="animate-draw" />

            {/* Secondary star rotated */}
            <path 
                d={starPath(cx, cy, R * 0.6, r * 0.6, n, -Math.PI / 2 + Math.PI / n)} 
                stroke={color} strokeWidth="0.8" fill="none" className="opacity-[0.55] animate-draw" 
                style={{ animationDelay: '300ms' }}
            />

            {/* Center */}
            <circle cx={cx} cy={cy} r="4" fill={accentColor} className="opacity-[0.7] animate-feather" />
        </svg>
    );
};

/**
 * SovereignDivider Component
 * A sophisticated section divider using Mamluk stars and lines.
 */
export const SovereignDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
    <div className={`flex items-center gap-6 my-12 ${className}`}>
        <div className="flex-1 h-[1px] bg-quiet opacity-30" />
        <MamlukStar type={12} size={24} degree="divider" />
        <div className="flex-1 h-[1px] bg-quiet opacity-30" />
        <MamlukStar type={8} size={18} degree="divider" color="var(--color-gold-light)" opacity={0.5} />
        <div className="flex-1 h-[1px] bg-quiet opacity-30" />
        <MamlukStar type={12} size={32} degree="divider" />
        <div className="flex-1 h-[1px] bg-quiet opacity-30" />
        <MamlukStar type={8} size={18} degree="divider" color="var(--color-gold-light)" opacity={0.5} />
        <div className="flex-1 h-[1px] bg-quiet opacity-30" />
        <MamlukStar type={12} size={24} degree="divider" />
        <div className="flex-1 h-[1px] bg-quiet opacity-30" />
    </div>
);
