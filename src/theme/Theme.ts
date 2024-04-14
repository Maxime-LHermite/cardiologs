import { createContext } from 'react';
import { Colors } from '@app/theme/Colors';
import { ThemeStructure } from '@app/theme/ThemeTypes';

export const defaultTheme = {
    backgroundColor: Colors.gray['100'],
    typography: {
        primary: Colors.blue['900'],
        secondary: Colors.gray['700'],
        title: Colors.blue['800'],
        light: Colors.blue['700'],
        inverted: Colors.gray['100'],
        warning: 'coral',
        error: 'crimson',
    },
    button: {
        primary: {
            border: Colors.blue['900'],
            background: Colors.blue['900'],
            backgroundHover: Colors.blue['700'],
            backgroundDisabled: Colors.blue['100'],
            text: Colors.white,
            textHover: Colors.gray['300'],
            textDisabled: Colors.gray['700'],
        },
        secondary: {
            background: Colors.white,
            border: Colors.blue['900'],
            backgroundHover: Colors.gray['200'],
            backgroundDisabled: Colors.blue['100'],
            text: Colors.blue['900'],
            textDisabled: Colors.gray['700'],
        },
        critical: {
            background: Colors.white,
            border: 'crimson',
            backgroundHover: Colors.gray['200'],
            backgroundDisabled: Colors.blue['100'],
            text: 'crimson',
            textDisabled: 'darkred',
        },
    },
} satisfies ThemeStructure;

export type Theme = typeof defaultTheme;
export const ThemeContext = createContext(defaultTheme);
