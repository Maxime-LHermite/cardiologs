declare module '*.svg' {
    import * as React from 'react';

    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

type EntriesMap<T> = {
    [K in keyof T]-?: [K, T[K]];
};

type Entries<T> = EntriesMap<T>[keyof T];

declare interface ObjectConstructor {
    entries<T extends {}>(o: T): Entries<T>[];
}
