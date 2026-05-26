/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Brand palette — also overrides the built-in `blue` scale so
           every `text-blue-600`, `bg-blue-700`, `from-blue-600` etc.
           automatically picks up our brand colors. */
        blue: {
          50:  '#EEF7FC',
          100: '#CCE8F5',
          200: '#99D1EB',
          300: '#66BAE1',
          400: '#33A3D7',
          500: '#1795C7',
          600: '#1795C7',
          700: '#183765',
          800: '#122A4E',
          900: '#0C1D37',
          950: '#071526',
        },
        brand: {
          50:  '#EEF7FC',
          100: '#CCE8F5',
          200: '#99D1EB',
          300: '#66BAE1',
          400: '#33A3D7',
          500: '#1795C7',
          600: '#1795C7',
          700: '#183765',
          800: '#122A4E',
          900: '#0C1D37',
        },
      },
      fontFamily: {
        sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        '3xl': '0 32px 64px rgba(0,0,0,0.10), 0 16px 32px rgba(0,0,0,0.07)',
        'glow-blue': '0 0 40px rgba(23,149,199,0.25), 0 0 80px rgba(23,149,199,0.10)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'float-slow': 'float 8s ease-in-out infinite 1s',
        'slide-up': 'slide-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in': 'fade-in 0.4s ease forwards',
      },
    },
  },
  plugins: [],
};
