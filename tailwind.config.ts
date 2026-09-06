import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0f0f0f',
        'dark-secondary': '#1a1a1a',
        'dark-tertiary': '#2a2a2a',
        accent: '#ff6b35',
        'accent-light': '#ff8c42',
      },
    },
  },
  plugins: [],
};

export default config;
