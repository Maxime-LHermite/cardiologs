import { ThemeDim } from './ThemeTypes';

const screenMedia = <S extends 'min' | 'max', T extends ThemeDim>(minOrMax: S, dim: T) => `@media (${minOrMax}-width: ${dim})` as const;

export const ScreenSizes = {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    XXL: 1536,
} as const;

export type ScreenSizesType = typeof ScreenSizes;

type ScreenMinType = {
    [K in keyof ScreenSizesType]: `@media (min-width: ${ScreenSizesType[K]}px)`;
};

export const onSmallerThan = {
    SM: screenMedia('min', '640px'),
    MD: screenMedia('min', '768px'),
    LG: screenMedia('min', '1024px'),
    XL: screenMedia('min', '1280px'),
    XXL: screenMedia('min', '1536px'),
} satisfies ScreenMinType;

type ScreenMaxType = {
    [K in keyof ScreenSizesType]: `@media (max-width: ${ScreenSizesType[K]}px)`;
};

export const onLargerThan = {
    SM: screenMedia('max', '640px'),
    MD: screenMedia('max', '768px'),
    LG: screenMedia('max', '1024px'),
    XL: screenMedia('max', '1280px'),
    XXL: screenMedia('max', '1536px'),
} satisfies ScreenMaxType;

export const getScreenSize = (width: number): keyof ScreenSizesType => {
    if (width <= ScreenSizes.SM) return 'SM';
    if (width <= ScreenSizes.MD) return 'MD';
    if (width <= ScreenSizes.LG) return 'LG';
    if (width <= ScreenSizes.XL) return 'XL';
    return 'XXL';
};
