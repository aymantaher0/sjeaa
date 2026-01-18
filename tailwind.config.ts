import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors extracted from design
        primary: {
          DEFAULT: '#10B981', // Teal/Green accent
          dark: '#059669',
          light: '#34D399',
        },
        dark: {
          DEFAULT: '#0A0A0A', // Main background
          card: '#171717', // Card background
          lighter: '#262626', // Lighter dark
        },
        gray: {
          text: '#A3A3A3', // Secondary text
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
        'btn': '8px',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
}
export default config
