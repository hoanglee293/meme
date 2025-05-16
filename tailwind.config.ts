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
        // Theme Colors
        'theme': {
          'primary': {
            '300': '#15DFFD', // Light blue
            '400': '#02B7D2', // Primary blue
            '500': '#112D60', // Dark blue
          },
          'secondary': {
            '200': '#BA72EA', // Light purple
            '300': '#761BB3', // Medium purple
            '400': '#8833EE', // Bright purple
          },
          'neutral': {
            '100': '#eeeeee',
            '200': '#D7D7D7',
            '300': '#C0C0C0',
            '900': '#353535',
            '1000': '#1E1E1E',
            '2000': '#112D60',
          },
          'green': {
              '100': '#bbf7d01a',
              '200': '#1FC16B',
            },
          'red': {
              '100': '#FB3748',
              '200': '#fb37481a',
            },
          'gradient': {
            'start': '#15DFFD',
            'end': '#761BB3',
            'linear': {
              'start': '#5558FF',
              'end': '#00C0FF',
            },
            'overlay': {
              'start': 'rgba(17, 45, 96, 0.50)',
              'end': 'rgba(136, 51, 238, 0.50)',
            },
            'glow': {
              'blue': 'rgba(99, 249, 254, 0.30)',
              'purple': 'rgba(151, 43, 223, 0.52)',
            },
          }
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
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(0deg, var(--tw-gradient-stops))',
        'gradient-hover': 'linear-gradient(90deg, var(--tw-gradient-stops))',
        'gradient-overlay': 'linear-gradient(93deg, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'linear-tm': 'var(--tw-theme-primary-400)',
        'linear-100': 'var(--tw-theme-neutral-1000)',
        'linear-200': 'var(--tw-theme-neutral-900)',
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
      borderWidth: {
        '1': '1px',
      },
      borderColor: {
        'linear-200': 'var(--tw-theme-neutral-900)',
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
            background: `linear-gradient(90deg, ${theme('colors.theme.primary.300')} 3.63%, ${theme('colors.theme.secondary.300')} 100.06%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }
        },
        '.linear-gradient-connect': {
          background: `linear-gradient(93deg, ${theme('colors.theme.gradient.overlay.start')} 2.14%, ${theme('colors.theme.gradient.overlay.end')} 98.03%)`,
          borderRadius: '24px',
          fontSize: '0.875rem',
          fontWeight: '500',
        },
        '.text-linear-200': {
          color: theme('colors.theme.neutral.900'),
        },
        '.shadow-custom': {
          boxShadow: theme('boxShadow.custom'),
        },
        '.glow-blue': {
          background: theme('colors.theme.gradient.glow.blue'),
          filter: 'blur(50px)',
        },
        '.glow-purple': {
          background: theme('colors.theme.gradient.glow.purple'),
          filter: 'blur(50px)',
        },
        '.gradient-primary': {
          background: `linear-gradient(0deg, ${theme('colors.theme.primary.400')} 0%, ${theme('colors.theme.secondary.400')} 100%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
        '.gradient-hover': {
          background: `linear-gradient(90deg, ${theme('colors.theme.primary.300')} 3.63%, ${theme('colors.theme.secondary.300')} 100.06%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
        '.gradient-overlay': {
          background: `linear-gradient(93deg, ${theme('colors.theme.gradient.overlay.start')} 2.14%, ${theme('colors.theme.gradient.overlay.end')} 98.03%)`,
        },
        '.linear-gradient-200': {
          background: `linear-gradient(0deg, ${theme('colors.theme.gradient.linear.start')} 0%, ${theme('colors.theme.gradient.linear.end')} 100%)`,
        },
        '.linear-200-bg': {
          background: 'var(--Linear-200, linear-gradient(0deg, #5558FF 0%, #00C0FF 100%))',
        },
        '.linear-gradient-blue': {
          background: 'linear-gradient(0deg, #5558FF 0%, #00C0FF 100%)',
        },
      })
    }),
  ],
}

export default config
