/** @type {import('tailwindcss').Config} */

import { fontFamily } from 'tailwindcss/defaultTheme';

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  prefix: '',
  theme: {
    screens: {
      xl: '1366px',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      colors: {
        border: 'hsl(var(--border)/<alpha-value>)',
        input: 'hsl(var(--input)/<alpha-value>)',
        ring: 'hsl(var(--ring)/<alpha-value>)',
        background: 'hsl(var(--background)/<alpha-value>)',
        foreground: 'hsl(var(--foreground)/<alpha-value>)',
        surface: 'hsl(var(--surface)/<alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--primary)/<alpha-value>)',
          foreground: 'hsl(var(--primary-foreground)/<alpha-value>)',
          light: 'hsl(var(--primary-light)/<alpha-value>)',
          'super-light': 'hsl(var(--primary-super-light)/<alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary)/<alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground)/<alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive)/<alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground)/<alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted)/<alpha-value>)',
          foreground: 'hsl(var(--muted-foreground)/<alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent)/<alpha-value>)',
          foreground: 'hsl(var(--accent-foreground)/<alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card)/<alpha-value>)',
          foreground: 'hsl(var(--card-foreground)/<alpha-value>)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
