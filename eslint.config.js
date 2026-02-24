import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import stylisticJs from '@stylistic/eslint-plugin-js';

const config = [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
        React: 'readonly'
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2020,
        sourceType: 'module'
      }
    },
    plugins: {
      '@stylistic/js': stylisticJs,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'sort-keys-fix': sortKeysFix,
      unicorn: eslintPluginUnicorn
    },
    rules: {
      ...stylisticJs.configs.all.rules,
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      ...eslintPluginUnicorn.configs.recommended.rules,
      ...reactRefresh.configs.recommended.rules,
      '@stylistic/js/array-bracket-newline': ['error', 'consistent'],
      '@stylistic/js/array-element-newline': ['error', 'consistent'],
      '@stylistic/js/dot-location': ['error', 'property'],
      '@stylistic/js/function-call-argument-newline': ['error', 'consistent'],
      '@stylistic/js/function-paren-newline': ['error', 'consistent'],
      '@stylistic/js/indent': ['error', 2, { SwitchCase: 1 }],
      '@stylistic/js/multiline-ternary': ['error', 'always-multiline'],
      '@stylistic/js/no-confusing-arrow': 'off',
      '@stylistic/js/no-extra-parens': ['error', 'all', { ignoreJSX: 'multi-line' }],
      '@stylistic/js/no-multiple-empty-lines': ['error', { max: 1 }],
      '@stylistic/js/object-curly-spacing': ['error', 'always'],
      '@stylistic/js/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
      '@stylistic/js/operator-linebreak': ['error', 'before'],
      '@stylistic/js/padded-blocks': ['error', 'never'],
      '@stylistic/js/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          next: '*',
          prev: ['const', 'let', 'var']
        },
        {
          blankLine: 'any',
          next: ['const', 'let', 'var'],
          prev: ['const', 'let', 'var']
        }
      ],
      '@stylistic/js/quote-props': ['error', 'as-needed'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/space-before-function-paren': ['error', 'never'],
      'arrow-body-style': ['error', 'as-needed'],
      'arrow-parens': ['error', 'always'],
      'class-methods-use-this': 'off',
      'comma-dangle': ['error', 'never'],
      'global-require': 'off',
      'import/default': 'off',
      'import/imports-first': 'off',
      'import/namespace': 'off',
      'import/newline-after-import': ['error', { count: 1 }],
      'import/no-cycle': 'off',
      'import/no-duplicates': 'off',
      'import/no-dynamic-require': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-unresolved': 'off',
      'import/no-webpack-loader-syntax': 'off',
      'import/prefer-default-export': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/heading-has-content': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
      'jsx-a11y/label-has-for': [
        'error', {
          allowChildren: false,
          components: ['Label'],
          required: { some: ['nesting', 'id'] }
        }
      ],
      'jsx-a11y/mouse-events-have-key-events': 'error',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',
      'max-len': 'off',
      'newline-per-chained-call': 'off',
      'no-console': 'warn',
      'no-return-assign': ['error', 'except-parens'],
      'no-shadow': ['error', { allow: ['res'] }],
      'no-unneeded-ternary': ['error', { defaultAssignment: false }],
      'no-use-before-define': 'off',
      'prefer-const': ['error', { destructuring: 'all' }],
      'prefer-template': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      'react/button-has-type': 'off',
      'react/forbid-prop-types': 'off',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function'
        }
      ],
      'react/jsx-filename-extension': 'off',
      'react/jsx-first-prop-new-line': ['error', 'multiline'],
      'react/jsx-no-target-blank': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-uses-react': 'error',
      'react/require-default-props': 'off',
      'react/require-extension': 'off',
      'react/self-closing-comp': 'off',
      'require-yield': 'off',
      'sort-keys': ['error', 'asc'],
      'sort-keys-fix/sort-keys-fix': 'warn',
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            pascalCase: true
          }
        }
      ],
      'unicorn/prefer-string-replace-all': 'off',
      'unicorn/prevent-abbreviations': 'off'
    },
    settings: { react: { version: 'detect' } }
  }
];

export default config;
