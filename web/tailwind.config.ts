import { AgoraTailwindConfig } from '@ama-pt/agora-design-system';
import type { Config } from 'tailwindcss';

// Faithful copy of the real Demo frontoffice tailwind.config.ts — the theme,
// plugins and safelist all come straight from AgoraDS so the demo generates
// the exact same utility classes (text-s-regular, text-neutral-*, etc.).
const TailwindConfig: Config = {
  content: ['src/**/*.{ts,tsx}'],
  theme: AgoraTailwindConfig.theme,
  plugins: AgoraTailwindConfig.plugins,
  safelist: AgoraTailwindConfig.safelist,
  corePlugins: {
    preflight: false, // AgoraDS already applies Tailwind resets in its CSS
  },
};

export default TailwindConfig;
