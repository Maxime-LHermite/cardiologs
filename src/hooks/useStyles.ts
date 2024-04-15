import { useMemo } from 'react';
import { Theme, useTheme } from '@mui/material';

type StylesFn<T> = T extends (theme: Theme, ...args: infer Args) => infer Ret
    ? { args: Args; ret: Ret; fn: (theme: Theme, ...args: Args[]) => Ret }
    : never;

export function useStyles<Fn extends (theme: Theme, ...args: never[]) => unknown>(styles: Fn, ...args: StylesFn<Fn>['args']): StylesFn<Fn>['ret'] {
    const theme = useTheme();
    return useMemo(() => styles(theme, ...args), [theme, ...args]);
}
