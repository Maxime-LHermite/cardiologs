import en from '../../public/locales/en.json';
import fr from '../../public/locales/fr.json';

type LocaleType = typeof en & {
    language: string;
};

export const locales = {
    en,
    fr,
} satisfies Record<string, LocaleType>;
