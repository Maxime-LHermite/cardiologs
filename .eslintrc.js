module.exports = {
    root: true,

    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:vitest/recommended'],

    plugins: ['prettier', 'react-refresh', 'react-hooks'],

    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },

    settings: {
        react: {
            version: 'detect',
        },
    },

    ignorePatterns: ['prettier.config.js', '.eslintrc.js'],
};
