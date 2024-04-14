export type AppDomain = 'App' | 'Intl' | 'Auth' | 'I/O';

export const identity = <T>(a: T): T => a;

export type Optional<T, U extends keyof T> = {
    [P in U]?: T[P];
} & {
    [P in keyof Omit<T, U>]: T[P];
};
