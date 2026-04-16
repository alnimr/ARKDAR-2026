/**
 * ARKDAR SOVEREIGN DESIGN SYSTEM (Royal DNA 2026)
 * Strict Compliance Theme Tokens - MOUNTED BY SOVEREIGN DIRECTIVE
 */

export const ARKDAR_SYSTEM = {
  // الحالة: سيادي (Sovereign)
  dark: {
    bg: "#121212", // يُضاف ملمس Noise 2%
    surface: "hsla(0,0%,100%, 0.08)",
    text: "#EDF2F4",
    heading: "#FFFFFF",
    glass: { 
      blur: "12px", 
      border: "1px hsla(0,0%,100%, 0.1)" 
    },
    accentGlow: "radial-gradient(circle, #911010 0%, transparent 70%)"
  },
  light: {
    bg: "#EDF2F4",
    surface: "hsla(0,0%,0%, 0.04)",
    text: "#121212",
    heading: "#121212",
    shadow: "0 8px 32px hsla(0,0%,0%, 0.12)"
  },
  brand: {
    redPrimary: "#911010",   // القرمزي المحترق
    redSecondary: "#840505", // الياقوتي الملكي
    redDeep: "#660000"       // الأوكس بلود
  },
  geometry: {
    radius: "6px",
    borderThin: "1px"
  },
  motion: {
    duration: "300ms",
    easing: "ease-in-out",
    fadeOffset: "15px"
  }
};
