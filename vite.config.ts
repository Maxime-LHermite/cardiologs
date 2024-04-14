import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@app': path.resolve(__dirname, './src'),
        },
    },
    test: {
        coverage: {
            provider: 'istanbul',
            reporter: ['html', 'json', 'text'],
            enabled: true,
        },
        environment: 'happy-dom',
        restoreMocks: true,
        passWithNoTests: true,
    },
});
