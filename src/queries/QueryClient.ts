import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (failureCount, error): boolean => {
                const status =
                    error && typeof error === 'object' && 'statusCode' in error && typeof error.statusCode === 'number'
                        ? error.statusCode
                        : undefined;
                switch (status) {
                    case 500:
                        return failureCount < 6;
                    default:
                        return false;
                }
            },
            retryDelay: (failureCount, error): number => {
                const status =
                    error && typeof error === 'object' && 'statusCode' in error && typeof error.statusCode === 'number'
                        ? error.statusCode
                        : undefined;

                switch (status) {
                    case 500:
                        return Math.min(1000 * 2 ** failureCount, 60_000);
                    default:
                        return 60_000;
                }
            },
            staleTime: 600_000,
            gcTime: Infinity,
        },
    },
});
