import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D0A43',
        accent: '#F2DCA6',
        body: '#585165',
        background: {
          primary: '#FFFFFF',
          secondary: '#F6F4EF'
        }
      },
      transitionDuration: {
        400: '400ms',
        800: '800ms',
        1800: '1800ms'
      },
      keyframes: {
        fade: {
          '0%': {
            opacity: '0'
          },
          '100%': {
            opacity: '1'
          }
        },
        'right-slide': {
          '0%': { transform: 'translateX(200px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'left-slide': {
          '0%': { transform: 'translateX(-200px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'exit-to-right': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(200px)', opacity: '0' }
        },
        'exit-to-left': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-200px)', opacity: '0' }
        },
        'scale-in-content': {
          '0%': { transform: 'rotateX(-30deg) scale(0.9)', opacity: '0' },
          '100%': { transform: 'rotateX(0deg) scale(1)', opacity: '1' }
        },
        'scale-out-content': {
          '0%': { transform: 'rotateX(0deg) scale(1)', opacity: '1' },
          '100%': { transform: 'rotateX(-10deg) scale(0.95)', opacity: '0' }
        }
      },
      animation: {
        'fade-in': 'fade 700ms linear forwards',
        'fade-out': 'fade 700ms linear backwards',
        'enter-from-right': 'right-slide 0.25s ease forwards',
        'enter-from-left': 'left-slide 0.25s ease forwards',
        'exit-to-right': 'right-slide 0.25s ease backwards',
        'exit-to-left': 'left-slide 0.25s ease backwards',
        'scale-in-content': 'scale-in-content 0.2s ease',
        'scale-out-content': 'scale-out-content 0.2s ease'
      }
    }
  },
  plugins: []
} satisfies Config;
