import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import astro from 'eslint-plugin-astro'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig(
  js.configs.recommended,
  tseslint.configs.recommended,
  // Also lints each <script> in a component on its own, with browser globals.
  astro.configs.recommended,
  {
    rules: {
      // An empty `catch {}` is how the inline scripts carry on when the browser
      // blocks storage.
      'no-empty': ['error', { allowEmptyCatch: true }],
      // `{ html: _, ...rest }` names html only to leave it out of rest.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { ignoreRestSiblings: true },
      ],
    },
  },
  {
    // Frontmatter is TypeScript, and no-undef can't see its global types
    // (ImageMetadata, from Astro). typescript-eslint turns the rule off for .ts
    // files for the same reason.
    files: ['**/*.astro'],
    rules: { 'no-undef': 'off' },
  },
  {
    // The .js modules in src/lib run at build time, in Node and in workerd.
    files: ['**/*.js'],
    languageOptions: { globals: globals.node },
  },
)
