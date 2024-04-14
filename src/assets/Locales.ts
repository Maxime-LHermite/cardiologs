import en from './locales/en.json';
import fr from './locales/fr.json';

type LocaleType = typeof en & {
    language: string;
};

export const locales = {
    en,
    fr,
} satisfies Record<string, LocaleType>;
