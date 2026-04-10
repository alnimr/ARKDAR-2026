// This theme config holds our raw design tokens.
// They are mapped into Tailwind CSS in globals.css, but this object is 
// useful for JS-based styling (like charts, Mapbox, or Canvas elements).

export const THEME = {
  colors: {
    brand: {
      primary: '#A0061C', // Deep Red
      secondary: '#D90429', // Crimson
      light: '#EDF2F4', // Light Gray
    },
    surface: {
      glass: 'rgba(237, 242, 244, 0.1)',
      dark: '#140D0E',
      light: '#FFFFFF',
    },
    text: {
      primary: '#140D0E',
      muted: '#64748B',
      onBrand: '#FFFFFF',
    }
  },
  typography: {
    fontFamily: {
      heading: ['El Messiri', 'serif'],
      body: ['Tajawal', 'sans-serif'],
      dashboard: ['Inter', 'sans-serif'],
    }
  },
  animation: {
    transitionMedium: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    glassBlur: 'backdrop-blur-lg',
  }
} as const;

export type ThemeType = typeof THEME;
