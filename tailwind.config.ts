import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'], 
  theme: {
    extend: {
      colors: {
        'neutral-300': '#C0C0C0',
        'primary-300': '#15DFFD',
        'secondary-400': '#761BB3',
        'neutral-1000': '#1E1E1E',
        'linear-tm': '#112D60',
        
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '3xl': '24px',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-sm': {
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.25)',
        },
        '.text-shadow-md': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        },
        '.hover-gradient': {
          '@apply hover:bg-gradient-primary hover:from-primary-300 hover:to-secondary-400': {},
        }
      })
    }),
  ],
}
export default config
