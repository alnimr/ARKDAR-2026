/**
 * ARKDAR SOVEREIGN DESIGN SYSTEM (Royal DNA 2026)
 * Strict Compliance Theme Tokens
 */

export const ARKDAR_THEME = {
  dark: {
    background: "#121212", // Applied with 2% Noise texture
    surface: "hsla(0,0%,100%, 0.08)", 
    text: "#EDF2F4",
    textHeading: "#FFFFFF",
    glassBlur: "12px",
    glassBorder: "1px hsla(0,0%,100%, 0.1)",
    glowAccent: "radial-gradient(circle at center, #911010 0%, transparent 70%)",
  },
  light: {
    background: "#EDF2F4",
    surface: "hsla(0,0%,0%, 0.04)",
    text: "#121212",
    textHeading: "#121212",
    glassShadow: "0 8px 32px hsla(0,0%,0%, 0.12)",
    accentShadow: "0 4px 16px hsla(0,100%,30%, 0.4)", // Based on #660000
  },
  common: {
    primaryRed: "#911010",   // Burnt Carmine (Headings)
    secondaryRed: "#840505", // Royal Ruby (Buttons)
    tertiaryRed: "#660000",  // Oxblood (Gradients/Shadows)
    borderRadius: "6px",
    motionDuration: "300ms",
    motionEasing: "ease-in-out",
  }
}
