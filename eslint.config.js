import tseslint from 'typescript-eslint';

// Syntax and inexpensive correctness checks; strict TypeScript is a separate gate.
export default [
  { ignores: ['**/dist/**', 'storybook-static/**', '**/node_modules/**', 'test-results/**', 'coverage/**'] },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: { parser: tseslint.parser, ecmaVersion: 2022, sourceType: 'module' },
    plugins: { '@typescript-eslint': tseslint.plugin },
    rules: {
      'no-debugger': 'error',
      'no-duplicate-case': 'error',
      'no-unreachable': 'error',
      'constructor-super': 'error',
      'valid-typeof': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-duplicate-enum-values': 'error',
    },
  },
];
