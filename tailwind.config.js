/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#818cf8',
          DEFAULT: '#6366f1',
          dark: '#4f46e5',
        },
        accent: {
          1: '#06b6d4',
          2: '#14b8a6',
          3: '#22c55e',
        },
        background: {
          light: '#f0f9ff',
          DEFAULT: '#e0f2fe',
          dark: '#bae6fd',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))',
        'gradient-accent': 'linear-gradient(135deg, var(--accent-1), var(--accent-2), var(--accent-3))',
      },
      typography: {
        DEFAULT: {
          css: {
            h1: { fontFamily: 'Outfit, system-ui, sans-serif' },
            h2: { fontFamily: 'Outfit, system-ui, sans-serif' },
            h3: { fontFamily: 'Outfit, system-ui, sans-serif' },
            h4: { fontFamily: 'Outfit, system-ui, sans-serif' },
          }
        }
      }
    },
  },
  plugins: [],
};