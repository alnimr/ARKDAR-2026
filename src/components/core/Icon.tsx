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
  | 'play'
  | 'sun'
  | 'moon'
  | 'globe'
  | 'shield'
  | 'shield-check'
  | 'shield-alert'
  | 'message'
  | 'message-square'
  | 'link'
  | 'send'
  | 'more'
  | 'clock'
  | 'gauge'
  | 'activity'
  | 'chevron'
  | 'target'
  | 'graduation-cap'
  | 'users'
  | 'instagram'
  | 'facebook'
  | 'twitter'
  | 'youtube'
  | 'hammer'
  | 'tree-pine'
  | 'crown'
  | 'sword'
  | 'quote'
  | 'star'
  | 'compass'
  | 'lock'
  | 'file-text'
  | 'calendar-check'
  | 'trending-up'
  | 'upload'
  | 'camera'
  | 'download'
  | 'save'
  | 'info'
  | 'layout-dashboard'
  | 'settings' 
  | 'logout'
  | 'zap'
  | 'activity'
  | 'video'
  | 'newspaper'
  | 'arrow-left'
  | 'arrow-right';

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
              <path d="M19 5 C27 5 33 11 33 19 C33 27 27 33 19 33 C11 33 5 27 5 19 C5 11 11 5 19 5 Z M19 8 C25 8 30 13 30 19 C30 25 25 30 19 30 C13 30 8 25 8 19 C8 13 13 8 19 8 Z" fill={color} fillRule="evenodd"/>
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
      
      case 'sun':
        return (
          <>
            <circle cx="24" cy="24" r="8" stroke={color} strokeWidth="2.5" fill="none"/>
            <circle cx="24" cy="24" r="3" fill="var(--color-gold-light)"/>
            {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
              <path 
                key={angle}
                d="M24 10 L24 4" 
                stroke={color} 
                strokeWidth="2.5" 
                strokeLinecap="round"
                transform={`rotate(${angle} 24 24)`}
              />
            ))}
            <circle cx="24" cy="4" r="1.5" fill="var(--color-gold-light)" transform="rotate(45 24 24)"/>
            <circle cx="24" cy="4" r="1.5" fill="var(--color-gold-light)" transform="rotate(225 24 24)"/>
          </>
        );

      case 'moon':
        return (
          <>
            <path d="M32 12 C24 12 18 18 18 26 C18 34 24 40 32 40 C28 40 12 36 12 26 C12 16 28 12 32 12 Z" fill={color}/>
            <path d="M32 12 C24 12 18 18 18 26 C18 34 24 40 32 40 C26 38 22 32 22 26 C22 20 26 14 32 12 Z" fill="var(--color-gold-light)" opacity="0.3"/>
            <circle cx="15" cy="20" r="1.5" fill="var(--color-gold-light)" opacity="0.6"/>
            <circle cx="22" cy="34" r="1" fill="var(--color-gold-light)" opacity="0.4"/>
          </>
        );

      case 'globe':
        return (
          <>
            <circle cx="24" cy="24" r="20" stroke={color} strokeWidth="2.5" fill="none"/>
            <ellipse cx="24" cy="24" rx="8" ry="20" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5"/>
            <line x1="4" y1="24" x2="44" y2="24" stroke={color} strokeWidth="1.5" opacity="0.5"/>
            <path d="M10 12 Q24 8 38 12" stroke={color} strokeWidth="1" opacity="0.3" fill="none"/>
            <path d="M10 36 Q24 40 38 36" stroke={color} strokeWidth="1" opacity="0.3" fill="none"/>
            <circle cx="24" cy="24" r="3" fill="var(--color-gold-light)"/>
            <path d="M24 4 L24 44" stroke="var(--color-gold-light)" strokeWidth="0.5" opacity="0.4"/>
          </>
        );

      case 'shield':
        return (
          <>
            <path d="M24 4 L40 8 V20 C40 32 32 40 24 44 C16 40 8 32 8 20 V8 L24 4 Z" stroke={color} strokeWidth="2.5" fill="none"/>
            <path d="M24 4 L40 8 V20 C40 32 32 40 24 44 C16 40 8 32 8 20 V8 L24 4 Z" fill={color} opacity="0.05"/>
            <path d="M24 12 V36" stroke="var(--color-gold-light)" strokeWidth="0.5" opacity="0.4"/>
            <path d="M12 20 H36" stroke="var(--color-gold-light)" strokeWidth="0.5" opacity="0.2"/>
            <circle cx="24" cy="20" r="2.5" fill="var(--color-gold-light)"/>
          </>
        );

      case 'message':
        return (
          <>
            <path d="M8 8 H40 V32 H16 L8 40 V8 Z" stroke={color} strokeWidth="2.5" fill="none"/>
            <path d="M8 8 H40 V32 H16 L8 40 V8 Z" fill={color} opacity="0.05"/>
            <circle cx="16" cy="20" r="2" fill="var(--color-gold-light)"/>
            <circle cx="24" cy="20" r="2" fill="var(--color-gold-light)"/>
            <circle cx="32" cy="20" r="2" fill="var(--color-gold-light)"/>
          </>
        );

      case 'link':
        return (
          <>
            <path d="M18 18 Q12 12 12 24 Q12 36 18 30 L24 24" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M30 30 Q36 36 36 24 Q36 12 30 18 L24 24" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <circle cx="24" cy="24" r="2" fill="var(--color-gold-light)"/>
          </>
        );

      case 'send':
        return (
          <>
            <path d="M4 24 L44 4 L38 44 L28 28 L4 24 Z" stroke={color} strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
            <path d="M44 4 L28 28" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="44" cy="4" r="2" fill="var(--color-gold-light)"/>
          </>
        );

      case 'more':
        return (
          <>
            <circle cx="10" cy="24" r="3" fill={color}/>
            <circle cx="24" cy="24" r="3" fill={color}/>
            <circle cx="38" cy="24" r="3" fill={color}/>
            <circle cx="24" cy="24" r="1.5" fill="var(--color-gold-light)"/>
          </>
        );

      case 'clock':
        return (
          <>
            <circle cx="24" cy="24" r="20" stroke={color} strokeWidth="2.5" fill="none"/>
            <path d="M24 12 V24 L32 32" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="24" cy="24" r="2.5" fill="var(--color-gold-light)"/>
          </>
        );

      case 'gauge':
        return (
          <>
            <path d="M8 32 C8 24 16 12 24 12 C32 12 40 24 40 32" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <line x1="8" y1="32" x2="40" y2="32" stroke={color} strokeWidth="1.5" opacity="0.3"/>
            <path d="M24 32 L36 20" stroke="var(--color-gold-light)" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="24" cy="32" r="3" fill="var(--color-gold-light)"/>
          </>
        );
      
      case 'activity':
        return (
          <path d="M4 24 H12 L18 10 L30 38 L36 24 H44" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        );

      case 'chevron':
        return (
          <path d="M18 12 L30 24 L18 36" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        );

      case 'target':
        return (
          <>
            <circle cx="24" cy="24" r="20" stroke={color} strokeWidth="1.5" fill="none" opacity="0.3"/>
            <circle cx="24" cy="24" r="12" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6"/>
            <circle cx="24" cy="24" r="4" fill="var(--color-gold-light)"/>
            <path d="M24 4 V8 M24 40 V44 M4 24 H8 M40 24 H44" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          </>
        );

      case 'message-square':
        return (
          <path d="M8 8 H40 V32 H20 L8 40 V8 Z" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        );

      case 'graduation-cap':
        return (
          <>
            <path d="M4 16 L24 8 L44 16 L24 24 Z" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 20 V32 C12 32 18 36 24 36 C30 36 36 32 36 32 V20" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M44 16 V28" stroke="var(--color-gold-light)" strokeWidth="1.5" strokeLinecap="round"/>
          </>
        );

      case 'users':
        return (
          <>
            <circle cx="16" cy="14" r="5" stroke={color} strokeWidth="2" fill="none"/>
            <path d="M6 34 V30 C6 24 10 21 16 21 C22 21 26 24 26 30 V34" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>
            <circle cx="32" cy="14" r="5" stroke="var(--color-gold-light)" strokeWidth="2" fill="none"/>
            <path d="M22 34 V30 C22 24 26 21 32 21 C38 21 42 24 42 30 V34" stroke="var(--color-gold-light)" strokeWidth="2" fill="none" strokeLinecap="round"/>
          </>
        );

      case 'share':
        return (
          <>
            <circle cx="36" cy="12" r="6" stroke={color} strokeWidth="2.5" fill="none"/>
            <circle cx="12" cy="24" r="6" stroke={color} strokeWidth="2.5" fill="none"/>
            <circle cx="36" cy="36" r="6" stroke={color} strokeWidth="2.5" fill="none"/>
            <path d="M18 21 L30 15" stroke={color} strokeWidth="2" strokeLinecap="round"/>
            <path d="M18 27 L30 33" stroke={color} strokeWidth="2" strokeLinecap="round"/>
            <circle cx="36" cy="12" r="2" fill="var(--color-gold-light)"/>
            <path d="M12 24 L14 24" stroke="var(--color-gold-light)" strokeWidth="1" strokeLinecap="round"/>
          </>
        );

      case 'filter':
        if (opticalSize === 's') {
          return <path d="M4 10 H44 L28 24 V40 L20 36 V24 Z" stroke={color} strokeWidth="5" fill="none"/>;
        }
        return (
          <>
            <path d="M6 10 H42 L28 24 V38 L20 34 V24 Z" fill={color} opacity="0.05"/>
            <path d="M6 10 H42 L28 24 V38 L20 34 V24 Z M9 13 H39 L26.5 24.5 V35.5 L21.5 33 V24.5 Z" fill={color} fillRule="evenodd"/>
            <circle cx="24" cy="10" r="2.5" fill="var(--color-gold-light)"/>
            <path d="M14 10 Q24 7 34 10" stroke="var(--color-gold-light)" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
          </>
        );

      case 'instagram':
        return (
          <>
            <rect x="8" y="8" width="32" height="32" rx="8" stroke={color} strokeWidth="2.5" fill="none"/>
            <circle cx="24" cy="24" r="7" stroke={color} strokeWidth="2.5" fill="none"/>
            <circle cx="34" cy="14" r="1.5" fill="var(--color-gold-light)"/>
          </>
        );

      case 'facebook':
        return (
          <path d="M30 8 H26 C22 8 20 10 20 14 V40 M20 24 H30" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        );

      case 'twitter':
        return (
          <path d="M12 8 L24 22 L36 8 M12 40 L24 26 L36 40 M24 22 V26" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        );

      case 'youtube':
        return (
          <>
            <rect x="4" y="10" width="40" height="28" rx="6" stroke={color} strokeWidth="2.5" fill="none"/>
            <path d="M20 18 L30 24 L20 30 Z" fill="var(--color-gold-light)"/>
          </>
        );

      case 'shield-check':
        return (
          <>
            <path d="M24 4 L6 10 V24 C6 34 14 41 24 44 C34 41 42 34 42 24 V10 L24 4 Z" stroke={color} strokeWidth="2.5" fill="none"/>
            <path d="M16 24 L21 29 L32 18" stroke="var(--color-gold-light)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </>
        );

      case 'shield-alert':
        return (
          <>
            <path d="M24 4 L6 10 V24 C6 34 14 41 24 44 C34 41 42 34 42 24 V10 L24 4 Z" stroke={color} strokeWidth="2.5" fill="none"/>
            <path d="M24 16 V28 M24 34 H24.01" stroke="var(--color-gold-light)" strokeWidth="3" fill="none" strokeLinecap="round"/>
          </>
        );

      case 'hammer':
        return (
          <path d="M28 6 L42 20 L36 26 L22 12 L28 6 Z M26 16 L10 32 L16 38 L32 22" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        );

      case 'tree-pine':
        return (
          <path d="M24 4 L8 32 H16 L12 40 H36 L32 32 H40 L24 4 Z M24 40 V44" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        );

      case 'crown':
        return (
          <path d="M4 36 L8 12 L16 24 L24 8 L32 24 L40 12 L44 36 H4 Z" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        );

      case 'sword':
        return (
          <path d="M36 4 L12 28 M8 32 L4 36 L12 44 L16 40 M10 30 L18 38" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        );

      case 'quote':
        return (
          <path d="M8 12 H20 V24 H12 C12 30 16 34 20 36 M28 12 H40 V24 H32 C32 30 36 34 40 36" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        );

      case 'star':
        return (
          <path d="M24 4 L30 16 L44 18 L34 28 L36 42 L24 36 L12 42 L14 28 L4 18 L18 16 Z" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        );

      case 'compass':
        return (
          <>
            <circle cx="24" cy="24" r="20" stroke={color} strokeWidth="2.5" fill="none"/>
            <path d="M28 20 L24 32 L20 28 L32 24 Z" fill="var(--color-gold-light)"/>
          </>
        );

      case 'lock':
        return (
          <>
            <rect x="10" y="20" width="28" height="20" rx="4" stroke={color} strokeWidth="2.5" fill="none"/>
            <path d="M16 20 V14 C16 10 20 6 24 6 C28 6 32 10 32 14 V20" stroke={color} strokeWidth="2.5" fill="none"/>
          </>
        );

      case 'file-text':
        return (
          <>
            <path d="M8 4 H32 L40 12 V44 H8 Z" stroke={color} strokeWidth="2.5" fill="none"/>
            <path d="M16 16 H24 M16 24 H32 M16 32 H32" stroke="var(--color-gold-light)" strokeWidth="2" fill="none"/>
          </>
        );

      case 'calendar-check':
        return (
          <>
            <rect x="8" y="10" width="32" height="30" rx="4" stroke={color} strokeWidth="2.5" fill="none"/>
            <path d="M16 6 V14 M32 6 V14 M8 20 H40" stroke={color} strokeWidth="2.5" fill="none"/>
            <path d="M20 30 L23 33 L28 28" stroke="var(--color-gold-light)" strokeWidth="2.5" fill="none"/>
          </>
        );

      case 'trending-up':
        return (
          <path d="M4 40 L16 28 L24 36 L44 16 M44 16 H34 M44 16 V26" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        );

      case 'upload':
        return (
          <>
            <path d="M24 32 V8 M14 18 L24 8 L34 18" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 32 V40 H40 V32" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="24" cy="8" r="1.5" fill="var(--color-gold-light)"/>
          </>
        );

      case 'camera':
        return (
          <>
            <rect x="6" y="14" width="36" height="26" rx="4" stroke={color} strokeWidth="2.5" fill="none"/>
            <path d="M16 14 L18 8 H30 L32 14" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="24" cy="27" r="6" stroke={color} strokeWidth="2" fill="none"/>
            <circle cx="36" cy="18" r="1.5" fill="var(--color-gold-light)"/>
          </>
        );

      case 'download':
        return (
          <>
            <path d="M24 8 V32 M14 22 L24 32 L34 22" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 32 V40 H40 V32" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="24" cy="32" r="1.5" fill="var(--color-gold-light)"/>
          </>
        );

      case 'save':
        return (
          <>
            <path d="M10 6 H34 L40 12 V42 H10 Z" stroke={color} strokeWidth="2.5" fill="none"/>
            <rect x="16" y="6" width="16" height="12" stroke={color} strokeWidth="1.5" fill="none"/>
            <rect x="14" y="24" width="20" height="18" stroke={color} strokeWidth="1.5" fill="none"/>
            <circle cx="24" cy="33" r="2.5" fill="var(--color-gold-light)"/>
          </>
        );

      case 'info':
        return (
          <>
            <circle cx="24" cy="24" r="20" stroke={color} strokeWidth="2.5" fill="none"/>
            <path d="M24 24 V34 M24 14 H24.01" stroke={color} strokeWidth="3" strokeLinecap="round"/>
            <circle cx="24" cy="14" r="1.5" fill="var(--color-gold-light)"/>
          </>
        );

      case 'layout-dashboard':
        return (
          <>
            <rect x="6" y="6" width="16" height="16" stroke={color} strokeWidth="2.5" fill="none"/>
            <rect x="26" y="6" width="16" height="16" stroke={color} strokeWidth="2.5" fill="none"/>
            <rect x="6" y="26" width="16" height="16" stroke={color} strokeWidth="2.5" fill="none"/>
            <rect x="26" y="26" width="16" height="16" stroke={color} strokeWidth="2.5" fill="none"/>
            <circle cx="14" cy="14" r="1.5" fill="var(--color-gold-light)"/>
            <circle cx="34" cy="34" r="1.5" fill="var(--color-gold-light)"/>
          </>
        );

      case 'settings':
        return (
          <>
            <circle cx="24" cy="24" r="8" stroke={color} strokeWidth="2.5" fill="none"/>
            <path d="M24 6 V12 M24 36 V42 M6 24 H12 M36 24 H42 M11.3 11.3 L15.5 15.5 M32.5 32.5 L36.7 36.7 M11.3 36.7 L15.5 32.5 M32.5 15.5 L36.7 11.3" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="24" cy="24" r="1.5" fill="var(--color-gold-light)"/>
          </>
        );

      case 'logout':
        return (
          <>
            <path d="M28 8 H40 V40 H28 M12 24 H32 M22 14 L32 24 L22 34" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="32" cy="24" r="1.5" fill="var(--color-gold-light)"/>
          </>
        );

      case 'zap':
        return (
          <>
            <path d="M30 4 L14 26 H24 L18 44 L34 22 H24 L30 4 Z" stroke={color} strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
            <circle cx="24" cy="24" r="1.5" fill="var(--color-gold-light)"/>
          </>
        );

      case 'activity':
        return (
          <>
            <path d="M6 24 H12 L18 10 L30 38 L36 24 H42" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="24" cy="24" r="1.5" fill="var(--color-gold-light)"/>
          </>
        );

      case 'video':
        return (
          <>
            <rect x="4" y="10" width="28" height="28" rx="4" stroke={color} strokeWidth="2.5" fill="none"/>
            <path d="M32 18 L44 12 V36 L32 30" stroke={color} strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
            <circle cx="12" cy="18" r="1.5" fill="var(--color-gold-light)"/>
          </>
        );

      case 'newspaper':
        return (
          <>
            <path d="M4 10 H44 V38 H4 Z" stroke={color} strokeWidth="2.5" fill="none"/>
            <path d="M10 18 H20 M10 26 H20 M10 30 H20 M28 18 H38 M28 22 H38 M28 26 H38 M28 30 H38" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
            <rect x="28" y="18" width="10" height="6" stroke="var(--color-gold-light)" strokeWidth="1" fill="none"/>
          </>
        );

      case 'arrow-left':
        return (
          <>
            <path d="M40 24 H8 M18 14 L8 24 L18 34" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="8" cy="24" r="1.5" fill="var(--color-gold-light)"/>
          </>
        );

      case 'arrow-right':
        return (
          <>
            <path d="M8 24 H40 M30 14 L40 24 L30 34" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="40" cy="24" r="1.5" fill="var(--color-gold-light)"/>
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
