/**
 * ARKDAR SOVEREIGN DESIGN SYSTEM (Royal DNA 2026)
 * Strict Compliance Theme Tokens - MOUNTED BY SOVEREIGN DIRECTIVE
 */

export const ARKDAR_SYSTEM = {
  // الحالة: سيادي (Sovereign DNA v3.1)
  dark: {
    bg: "#0D0B08",
    surface: "#111009",
    text: "#F2EBD9",
    gold: "#B8922A",
    goldLight: "#D4AF6A",
    goldDim: "#6B5119",
    border: "hsla(43, 64%, 45%, 0.25)",
    glass: { 
      blur: "12px", 
      border: "1px hsla(43, 64%, 45%, 0.1)" 
    }
  },
  light: {
    bg: "#F2EBD9",
    surface: "#EBE4D2",
    text: "#0D0B08",
    gold: "#B8922A",
    border: "rgba(184, 146, 42, 0.55)"
  },
  geometry: {
    radius: "0px", // الصرامة السيادية
    borderThin: "1px",
    maxWidth: "1280px",
    contentWidth: "960px",
    narrowWidth: "720px"
  },
  motion: {
    dur: {
      micro: "150ms",
      base: "250ms",
      mod: "350ms",
      exp: "500ms",
      cine: "800ms"
    },
    ease: {
      arrow: "cubic-bezier(0.76, 0, 0.24, 1)",
      feather: "cubic-bezier(0.34, 1.28, 0.64, 1)",
      draw: "cubic-bezier(0.4, 0, 0.2, 1)"
    }
  }
};
