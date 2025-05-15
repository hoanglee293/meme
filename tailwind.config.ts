import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  darkMode: "class",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Custom Colors
        'linear': {
          '200': '#5558FF',
        },
        // HSL Variables
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom Colors
        'secondary-400': '#761BB3',
        'neutral-1000': '#1E1E1E',
        'linear-tm': '#112D60',
        green: {
          '200': '#1FC16B',
        },
        neutral: {
          '100': '#eeeeee',
          '200': '#D7D7D7',
          '300': '#C0C0C0',
          '900': '#5558FF',
          '1000': '#1E1E1E',
          '2000': '#112D60',
        },
        black: {
          '100': '#0F0F0F',
        },
        
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(0deg, #112D60 0%, #83E 100%)',
        'gradient-hover': 'linear-gradient(90deg, #15DFFD 3.63%, #761BB3 100.06%)',
      },
      backgroundColor: {
        'linear-tm': '#112D60',
        'linear-100': '#0F0F0F',
        'linear-200': '#5558FF',
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      fontWeight: {
        'normal': '400',
      },
      fontSize: {
        '10': '10px'
      },
      gap: {
        '15': '60px',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderColor: {
        'linear-200': '#5558FF',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        '4xl': '2rem',
        '3xl': '24px',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        'custom': '0px 0px 4px 0px rgba(232, 232, 232, 0.50)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addUtilities, theme }) {
      addUtilities({
        '.text-shadow-sm': {
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.25)',
        },
        '.text-shadow-md': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        },
        '.hover-gradient': {
          '&:hover': {
            background: 'linear-gradient(90deg, #15DFFD 3.63%, #761BB3 100.06%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }
        },
        '.linear-gradient-connect': {
          background: 'linear-gradient(93deg, rgba(17, 45, 96, 0.50) 2.14%, rgba(136, 51, 238, 0.50) 98.03%)',
          borderRadius: '24px',
          fontSize: '0.875rem',
          fontWeight: '500',
        },
        '.text-linear-200': {
          color: '#5558FF',
        },
        '.shadow-custom': {
          boxShadow: '0px 0px 4px 0px rgba(232, 232, 232, 0.50)',
        },
      })
    }),
  ],
}

export default config
