# Agora Design System — Installation & Setup

## Requirements

- **React 19.0.0 or higher** — `react: ^19.0.0`, `react-dom: ^19.0.0` (peer dependency)
- **TypeScript types for React 19** — `@types/react: ^19.0.12`, `@types/react-dom: ^19.0.4` (peer dependency; required even for non-TypeScript projects as they are declared peers)
- **TailwindCSS v3** (NOT v4 — the library is incompatible with Tailwind v4)
- **postcss** + **autoprefixer** — required by TailwindCSS v3
- Node.js LTS

> **Full peer dependency list** (from `package.json` of 3.5.0):
> ```json
> "peerDependencies": {
>   "react": "^19.0.0",
>   "react-dom": "^19.0.0",
>   "@types/react": "^19.0.12",
>   "@types/react-dom": "^19.0.4"
> }
> ```

> **React version is a hard requirement.** AgoraDS 3.5.0 declares `react: "^19.0.0"` as a `peerDependency`  
> in its published `package.json`. Projects still on React 17 or 18 **must upgrade** before installing.

> **NextJS 15+ caveat**: NextJS 15+ ships with TailwindCSS v4 by default.  
> You must downgrade Tailwind: `npm uninstall -D tailwindcss` then follow the steps below.

---

## Step-by-step Installation

```bash
# 1. Install TailwindCSS v3
npm install -D tailwindcss@^3 postcss autoprefixer

# 2. Init Tailwind
npx tailwindcss init -p

# 3. Install AgoraDS
npm install @ama-pt/agora-design-system
```

---

## CSS Setup

In your main CSS file (`src/index.css`, `src/styles/globals.css`, etc.):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url("@ama-pt/agora-design-system/artifacts/dist/tailwind.css");
@import url("@ama-pt/agora-design-system/artifacts/dist/style.css");
```

> For older docs you may see `import '@ama-pt/agora-design-system/artifacts/dist/index.css'` — the two-file import above is the current (v3.5.x) approach.

> **Vite alternative**: In Vite projects the two CSS files can also be imported directly in the app entry point (`src/main.tsx` / `src/App.tsx`) as JS imports instead of inside a CSS file — both work, but the CSS file approach matches the official guide.

---

## Tailwind Configuration (`tailwind.config.ts`)

```ts
import { AgoraTailwindConfig } from '@ama-pt/agora-design-system';
import type { Config } from 'tailwindcss';

const TailwindConfig: Config = {
  content: ['src/**/*.{ts,tsx}'],
  theme: AgoraTailwindConfig.theme,
  plugins: AgoraTailwindConfig.plugins,
  safelist: AgoraTailwindConfig.safelist,
  corePlugins: {
    preflight: false   // AgoraDS already applies Tailwind resets in its CSS
  }
};

export default TailwindConfig;
```

---

## Overriding the Theme

Spread `AgoraTailwindConfig.theme` and override only the keys you need:

```ts
import { AgoraTailwindConfig } from '@ama-pt/agora-design-system';
import type { Config } from 'tailwindcss';

const TailwindConfig: Config = {
  content: ['src/**/*.tsx'],
  theme: {
    ...AgoraTailwindConfig.theme,
    colors: {
      ...AgoraTailwindConfig.theme.colors,
      primary: {
        50: '#FFF000',
        // ... all 9 shades
        900: '#FFF000'
      }
    }
  },
  plugins: AgoraTailwindConfig.plugins,
  safelist: AgoraTailwindConfig.safelist,
  corePlugins: { preflight: false }
};

export default TailwindConfig;
```

---

## Adding AgoraDS to an Existing React Project

> ⚠️ **React upgrade required first.** AgoraDS 3.5.0 requires React 19+. Projects on React 17 or 18  
> must upgrade before AgoraDS can be installed.

1. **Upgrade React first**: `npm install react@^19 react-dom@^19 @types/react@^19 @types/react-dom@^19`
2. Run `npm install @ama-pt/agora-design-system`
3. Add the CSS imports to the project's global stylesheet
4. Ensure TailwindCSS **v3** is in `package.json` — NextJS 15+ ships with v4 by default and must be downgraded; Vite projects do not auto-install Tailwind at all
5. Create or update `tailwind.config.ts` exporting `AgoraTailwindConfig` (see configuration section above)
6. Storybook reference: https://react.agora.gov.pt
7. NPM package: `@ama-pt/agora-design-system` (latest stable: 3.5.0, released 2026-01-04)
