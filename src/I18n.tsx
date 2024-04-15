import i18n, { InitOptions } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { I18nextProvider, initReactI18next, useTranslation } from 'react-i18next';
import { FC, PropsWithChildren } from 'react';
import { TranslationLoadingPage } from './pages/TranslationLoadingPage';

export const localesNames = {
    en: 'English',
    fr: 'Français (French)',
};

export const supportedLocales = Object.keys(localesNames) as (keyof typeof localesNames)[];

export const i18nOptions: InitOptions = {
    ns: [],
    fallbackLng: 'en',
    supportedLngs: supportedLocales,
    nonExplicitSupportedLngs: true,
    load: 'currentOnly',
    lowerCaseLng: true,
    cleanCode: true,
    detection: {
        order: ['localStorage', 'querystring', 'navigator'],
        caches: ['localStorage'],
        lookupQuerystring: 'lng',
        lookupLocalStorage: 'i18nextLng',
    },
    interpolation: {
        escapeValue: false,
    },
    backend: {
        loadPath: '/locales/{{lng}}.json',
    },
    react: {
        useSuspense: false,
        bindI18n: 'loaded languageChanged',
    },
};

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init(i18nOptions)
    .then(() => console.log('I18n', 'Initialized'))
    .catch(() => console.error('I18n', 'Initialization error'));

export const i18nInstance = i18n;

export const Translation: FC<PropsWithChildren> = ({ children }) => {
    return (
        <I18nextProvider i18n={i18nInstance}>
            {(() => {
                const language = useTranslation();
                return language.ready ? children : <TranslationLoadingPage />;
            })()}
        </I18nextProvider>
    );
};
