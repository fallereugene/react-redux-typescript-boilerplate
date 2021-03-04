import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import locales from './services/locales';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
    en: {
        translation: locales.en,
    },
    ru: {
        translation: locales.ru,
    },
};

export const initI18n = (lng: string): void => {
    i18n.use(initReactI18next) // passes i18n down to react-i18next
        .init({
            resources,
            lng,
            keySeparator: false, // we do not use keys in form messages.welcome
            interpolation: {
                escapeValue: false, // react already safes from xss
            },
        });
};
