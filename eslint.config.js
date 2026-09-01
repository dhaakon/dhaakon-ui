// Minimal flat config. Type safety is enforced by `npm run typecheck` (tsc).
export default [
  { ignores: ['dist', 'storybook-static', 'node_modules', 'scripts'] },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'module' },
  },
];
