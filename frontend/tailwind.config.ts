import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        slateink: {
          DEFAULT: '#1F2D3D',
          muted: '#5A6B7B',
          soft: '#8496A6',
        },
        accent: {
          DEFAULT: '#22B8CF',
          hover: '#179DB3',
          soft: '#E6F9FC',
          ring: 'rgba(34, 184, 207, 0.35)',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F8FCFD',
        },
        canvas: '#F8FCFD',
        hairline: '#E6F2F5',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.4rem, 4.6vw, 3.6rem)', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(1.95rem, 3.6vw, 3rem)', { lineHeight: '1.12', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.625rem, 3vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(31, 45, 61, 0.04), 0 8px 24px -12px rgba(31, 45, 61, 0.10)',
        'card-hover': '0 2px 4px rgba(31, 45, 61, 0.05), 0 18px 40px -18px rgba(31, 45, 61, 0.18)',
        cta: '0 8px 20px -8px rgba(34, 184, 207, 0.55)',
        header: '0 1px 0 0 #E6F2F5, 0 8px 24px -20px rgba(31, 45, 61, 0.25)',
      },
      maxWidth: {
        content: '1200px',
        prose: '68ch',
      },
      spacing: {
        section: '6rem',
        'section-lg': '8rem',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'accordion-down': {
          from: { height: '0', opacity: '0' },
          to: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
          to: { height: '0', opacity: '0' },
        },
        'marquee-x': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'accordion-down': 'accordion-down 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
        'accordion-up': 'accordion-up 0.22s cubic-bezier(0.22, 1, 0.36, 1)',
        marquee: 'marquee-x 32s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
