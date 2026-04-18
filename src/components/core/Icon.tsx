'use client';

import React from 'react';

export type IconName = 
  | 'search' 
  | 'location' 
  | 'arrow' 
  | 'menu' 
  | 'calendar' 
  | 'warrior' 
  | 'notify' 
  | 'close' 
  | 'share' 
  | 'filter' 
  | 'favourite' 
  | 'play';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | 's' | 'm' | 'l';
  color?: string;
}

export default function Icon({ name, size = 'm', color = 'currentColor', className, ...props }: IconProps) {
  // Determine optical size based on pixel value or alias
  const getOpticalSize = () => {
    if (typeof size === 'string') return size;
    if (size <= 18) return 's';
    if (size <= 38) return 'm';
    return 'l';
  };

  const opticalSize = getOpticalSize();
  const pixelSize = typeof size === 'number' ? size : (size === 's' ? 14 : size === 'm' ? 24 : 44);

  // Render logic for each icon based on name and optical size
  const renderIconContent = () => {
    switch (name) {
      case 'search':
        if (opticalSize === 's') {
          return (
            <>
              <circle cx="19" cy="19" r="11.5" stroke={color} strokeWidth="5" fill="none"/>
              <line x1="27" y1="27" x2="43" y2="43" stroke={color} strokeWidth="6" strokeLinecap="round"/>
            </>
          );
        }
        if (opticalSize === 'm') {
          return (
            <>
              <path d="M19 5 C27 5 33 11 33 19 C33 27 27 33 19 33 C11 33 5 27 5 19 C11 5 11 5 19 5 Z M19 8 C25 8 30 13 30 19 C30 25 25 30 19 30 C13 30 8 25 8 19 C8 13 13 8 19 8 Z" fill={color} fillRule="evenodd"/>
              <path d="M28 28 L44 44" stroke={color} strokeWidth="3" strokeLinecap="round"/>
              <circle cx="44" cy="44" r="2.5" fill="var(--color-gold-light)"/>
            </>
          );
        }
        return (
          <>
            <path d="M19 5 C26.5 5 32 9 33.5 15 C35 21 32 27 26.5 30 C21 33 14 32 10 27.5 C6 23 6 16 9.5 11.5 C12.5 7.5 15.5 5 19 5 Z M19 8 C25 8 29.5 11.5 31 17 C32.5 22.5 29.5 28 24.5 30.5 C19.5 33 13.5 31.5 10.5 27 C7.5 22.5 8 16.5 11 12.5 C13.5 9 16 8 19 8 Z" fill={color} fillRule="evenodd"/>
            <path d="M29 29 L29.5 30.5 L44 44.5 L43 45.5 L28 31 L27.5 29.5 Z" fill={color}/>
            <path d="M27 28 L29.5 30.5" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M42 43 L46 46 L43 47 Z" fill="var(--color-gold-light)"/>
            <path d="M25 8.5 Q31 11 32 17" stroke="var(--color-gold-light)" strokeWidth="0.75" strokeLinecap="round" opacity="0.5"/>
            <circle cx="19" cy="6.5" r="1.5" fill="var(--color-gold-light)" opacity="0.6"/>
          </>
        );

      case 'location':
        if (opticalSize === 's') {
          return <path d="M20 3 Q35 3 35 17 Q35 29 20 45 Q5 29 5 17 Q5 3 20 3 Z" fill={color}/>;
        }
        if (opticalSize === 'm') {
          return (
            <>
              <path d="M20 3 Q35 3 35 17 Q35 29 20 45 Q5 29 5 17 Q5 3 20 3 Z M20 7 Q31 7 31 17 Q31 27 20 40 Q9 27 9 17 Q9 7 20 7 Z" fill={color} fillRule="evenodd"/>
              <circle cx="20" cy="17" r="4" fill="var(--color-gold-light)" opacity="0.8"/>
            </>
          );
        }
        return (
          <>
            <path d="M24 4 C31.5 4 38 10 38 18 C38 26 32 33 24 44 C16 33 10 26 10 18 C10 10 16.5 4 24 4 Z" fill={color} opacity="0.1"/>
            <path d="M24 4 C31.5 4 38 10 38 18 C38 26 32 33 24 44 C16 33 10 26 10 18 C10 10 16.5 4 24 4 Z M24 7.5 C29.5 7.5 34.5 12 34.5 18 C34.5 25 29 31.5 24 40 C19 31.5 13.5 25 13.5 18 C13.5 12 18.5 7.5 24 7.5 Z" fill={color} fillRule="evenodd"/>
            <circle cx="24" cy="18" r="5.5" stroke="var(--color-gold-light)" strokeWidth="1.5" fill="none"/>
            <circle cx="24" cy="18" r="2.5" fill="var(--color-gold-light)"/>
            <path d="M20 14 Q24 11 28 14" stroke="var(--color-gold-light)" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
          </>
        );

      case 'arrow':
        if (opticalSize === 's') {
          return (
            <>
              <line x1="4" y1="20" x2="44" y2="20" stroke={color} strokeWidth="5" strokeLinecap="round"/>
              <path d="M30 6 L44 20 L30 34" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </>
          );
        }
        if (opticalSize === 'm') {
          return (
            <>
              <path d="M5 19 C12 18.5 28 18 40 18 L40 20 C28 20 12 19.5 5 19 Z" fill={color}/>
              <path d="M5 19 L8 17 L8 21 Z" fill={color}/>
              <path d="M36 10 L44 19 L36 28 L38 19 Z" fill={color}/>
              <circle cx="5" cy="19" r="2" fill="var(--color-gold-light)"/>
            </>
          );
        }
        return (
          <>
            <path d="M5 23 C8 22.5 18 22 32 22 L32 24 C18 24 8 23.5 5 23 Z" fill={color}/>
            <path d="M5 23 L7 21.5 L7 24.5 Z" fill={color}/>
            <path d="M30 14 L42 23 L30 32 L32 23 Z" fill={color}/>
            <path d="M33 17 L40 23 L33 29" fill="var(--color-gold-light)" opacity="0.6"/>
            <circle cx="5.5" cy="23" r="2.5" fill="var(--color-gold-light)"/>
            <path d="M8 22.5 C18 22 28 22 32 22" stroke="var(--color-gold-light)" strokeWidth="0.5" strokeLinecap="round" opacity="0.4"/>
          </>
        );

      case 'menu':
        if (opticalSize === 's') {
          return (
            <>
              <line x1="5" y1="14" x2="43" y2="14" stroke={color} strokeWidth="6" strokeLinecap="round"/>
              <line x1="5" y1="24" x2="33" y2="24" stroke={color} strokeWidth="6" strokeLinecap="round"/>
              <line x1="5" y1="34" x2="43" y2="34" stroke={color} strokeWidth="6" strokeLinecap="round"/>
            </>
          );
        }
        // Medium and Large follow same calligraphic style
        return (
          <>
            <path d="M5 13.5 C14 13 30 13 43 13.5 L43 15.5 C30 15 14 15 5 15.5 Z" fill={color}/>
            <path d="M5 14.5 L7 12.5 L7 16.5 Z" fill={color}/>
            <circle cx="43" cy="14.5" r="2" fill="var(--color-gold-light)"/>
            <path d="M5 22.5 C14 22 26 22 36 22.5 L36 24.5 C26 24 14 24 5 24.5 Z" fill={color} opacity="0.8"/>
            <path d="M5 23.5 L7 21.5 L7 25.5 Z" fill={color} opacity="0.8"/>
            <circle cx="36" cy="23.5" r="2" fill="var(--color-gold-light)" opacity="0.8"/>
            <path d="M5 31.5 C14 31 30 31 43 31.5 L43 33.5 C30 33 14 33 5 33.5 Z" fill={color} opacity="0.55"/>
            <path d="M5 32.5 L7 30.5 L7 34.5 Z" fill={color} opacity="0.55"/>
            <circle cx="43" cy="32.5" r="2" fill="var(--color-gold-light)" opacity="0.55"/>
          </>
        );

      case 'calendar':
        if (opticalSize === 's') {
          return (
            <path d="M6 12 Q24 6 42 12 L42 40 Q42 44 38 44 L10 44 Q6 44 6 40 Z" stroke={color} strokeWidth="5" fill="none"/>
          );
        }
        return (
          <>
            <path d="M6 18 Q6 12 24 12 Q42 12 42 18 L42 40 Q42 43 39 43 L9 43 Q6 43 6 40 Z" fill={color} opacity="0.07"/>
            <path d="M6 18 Q6 11 24 11 Q42 11 42 18 L42 40 Q42 44 39 44 L9 44 Q6 44 6 40 Z M8 18 Q8 14 24 14 Q40 14 40 18 L40 40 Q40 41.5 39 41.5 L9 41.5 Q8 41.5 8 40 Z" fill={color} fillRule="evenodd"/>
            <path d="M6 23 L42 23" stroke={color} strokeWidth="1.25" opacity="0.3"/>
            <path d="M16 6 L16 17" stroke={color} strokeWidth="2" strokeLinecap="round"/>
            <path d="M32 6 L32 17" stroke={color} strokeWidth="2" strokeLinecap="round"/>
            <path d="M13 7 Q16 4 19 7" stroke="var(--color-gold-light)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M29 7 Q32 4 35 7" stroke="var(--color-gold-light)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <circle cx="16" cy="6" r="2.5" fill="var(--color-gold-light)"/>
            <circle cx="32" cy="6" r="2.5" fill="var(--color-gold-light)"/>
            <circle cx="16" cy="31" r="2" fill="var(--color-gold-light)" opacity="0.6"/>
            <circle cx="24" cy="31" r="2" fill="var(--color-gold-light)" opacity="0.6"/>
            <circle cx="32" cy="31" r="2" fill="var(--color-gold-light)" opacity="0.6"/>
          </>
        );

      case 'warrior':
        if (opticalSize === 's') {
          return (
            <>
              <circle cx="24" cy="14" r="8" fill={color}/>
              <path d="M4 44 Q4 30 24 30 Q44 30 44 44" stroke={color} strokeWidth="5" strokeLinecap="round" fill="none"/>
            </>
          );
        }
        return (
          <>
            <path d="M24 5 C30 5 35 10 35 16 C35 22 30 27 24 27 C18 27 13 22 13 16 C13 10 18 5 24 5 Z M24 8 C28.5 8 32 11.5 32 16 C32 20.5 28.5 24 24 24 C19.5 24 16 20.5 16 16 C16 11.5 19.5 8 24 8 Z" fill={color} fillRule="evenodd"/>
            <path d="M17 10 Q20 7 24 7" stroke="var(--color-gold-light)" strokeWidth="0.75" strokeLinecap="round" opacity="0.5"/>
            <path d="M4 44 C4 34 10 30 24 30 C38 30 44 34 44 44" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>
            <path d="M4 44 C4 34 10 30 24 30 C38 30 44 34 44 44 L42 44 C42 35 37 32.5 24 32.5 C11 32.5 6 35 6 44 Z" fill={color} opacity="0.15"/>
            <circle cx="4" cy="44" r="2" fill="var(--color-gold-light)"/>
            <circle cx="44" cy="44" r="2" fill="var(--color-gold-light)"/>
            <path d="M20 20 Q24 18 28 20" stroke="var(--color-gold-light)" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5"/>
          </>
        );

      case 'notify':
        if (opticalSize === 's') {
          return (
            <path d="M24 6 Q35 6 35 18 L38 34 L10 34 L13 18 Q13 6 24 6 Z" stroke={color} strokeWidth="5" fill="none"/>
          );
        }
        return (
          <>
            <path d="M24 8 Q35 8 37 20 L39 34 L9 34 L11 20 Q13 8 24 8 Z" fill={color} opacity="0.08"/>
            <path d="M24 8 Q35 8 37 20 L39 34 L9 34 L11 20 Q13 8 24 8 Z M24 11 Q33 11 35 21 L37 31 L11 31 L13 21 Q15 11 24 11 Z" fill={color} fillRule="evenodd"/>
            <path d="M17 8 Q24 3 31 8" stroke="var(--color-gold-light)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <path d="M7 34 L41 34" stroke={color} strokeWidth="2" strokeLinecap="round"/>
            <path d="M19 38 Q24 42 29 38" stroke={color} strokeWidth="1.75" fill="none" strokeLinecap="round"/>
            <circle cx="24" cy="5.5" r="2.5" fill="var(--color-gold-light)"/>
            <circle cx="24" cy="5.5" r="4" stroke="var(--color-gold-light)" strokeWidth="0.5" fill="none" opacity="0.3"/>
          </>
        );

      case 'close':
        return (
          <>
            <path d="M8 8 L11 7 L25.5 21 L39.5 7 L42 9.5 L26.5 24 L42 39 L39.5 41 L25 26.5 L11 41 L8 38.5 L22.5 24 L8 10 Z" fill={color}/>
            <circle cx="25" cy="24" r="3" fill={color}/>
            <circle cx="8.5" cy="8.5" r="1.5" fill="var(--color-gold-light)" opacity="0.6"/>
            <circle cx="41.5" cy="8.5" r="1.5" fill="var(--color-gold-light)" opacity="0.6"/>
            <circle cx="8.5" cy="39.5" r="1.5" fill="var(--color-gold-light)" opacity="0.6"/>
            <circle cx="41.5" cy="39.5" r="1.5" fill="var(--color-gold-light)" opacity="0.6"/>
          </>
        );

      case 'favourite':
        if (opticalSize === 's') {
          return <path d="M24 40 Q8 28 8 17 Q8 8 17 8 Q20.5 8 24 12 Q27.5 8 31 8 Q40 8 40 17 Q40 28 24 40 Z" fill={color}/>;
        }
        return (
          <>
            <path d="M24 40 Q8 28 8 17 Q8 8 17 8 Q20.5 8 24 12 Q27.5 8 31 8 Q40 8 40 17 Q40 28 24 40 Z" fill="var(--color-crimson)" opacity="0.12"/>
            <path d="M24 40 Q8 28 8 17 Q8 8 17 8 Q20.5 8 24 12 Q27.5 8 31 8 Q40 8 40 17 Q40 28 24 40 Z M24 36 Q11 25 11 17 Q11 11 17 11 Q20 11 24 14 Q28 11 31 11 Q37 11 37 17 Q37 25 24 36 Z" fill={color} fillRule="evenodd"/>
            <path d="M22 39 L24 43 L26 39" fill="var(--color-gold-light)" opacity="0.6"/>
            <circle cx="24" cy="41" r="2" fill="var(--color-gold-light)"/>
          </>
        );

      case 'play':
        return (
          <>
            <path d="M24 4 C36 4 44 12 44 24 C44 36 36 44 24 44 C12 44 4 36 4 24 C4 12 12 4 24 4 Z M24 7.5 C34 7.5 40.5 14 40.5 24 C40.5 34 34 40.5 24 40.5 C14 40.5 7.5 34 7.5 24 C7.5 14 14 7.5 24 7.5 Z" fill={color} fillRule="evenodd"/>
            <path d="M16 8 Q24 5 32 8" stroke="var(--color-gold-light)" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
            <path d="M18 15 L36 24 L18 33 L21 24 Z" fill={color}/>
            <path d="M21 22 L30 24 L21 26" fill="var(--color-gold-light)" opacity="0.5"/>
            <circle cx="24" cy="5.5" r="1.75" fill="var(--color-gold-light)" opacity="0.7"/>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <svg
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {renderIconContent()}
    </svg>
  );
}
