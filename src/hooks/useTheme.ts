import { useContext, useMemo } from 'react';
import { Theme, ThemeContext } from '../theme/Theme';

type StylesFn<T> = T extends (theme: Theme, ...args: (infer Args)[]) => infer Ret
    ? { args: Args; ret: Ret; fn: (theme: Theme, ...args: Args[]) => Ret }
    : never;

export function useStyles<Fn extends (theme: Theme, ...args: unknown[]) => unknown>(
    styles: Fn,
    ...args: StylesFn<Fn>['args'][]
): StylesFn<Fn>['ret'] {
    const theme = useTheme();
    return useMemo(() => styles(theme, ...args), [theme, ...args]);
}

export const useTheme = (): Theme => {
    return useContext(ThemeContext);
};
