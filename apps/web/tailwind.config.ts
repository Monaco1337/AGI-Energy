import type { Config } from 'tailwindcss';
import preset from '../../packages/ui/src/tailwind-preset';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  presets: [preset as Config],
  theme: {
    extend: {
      borderRadius: {
        pill: '999px',
      },
    },
  },
  plugins: [],
};

export default config;
