import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import zhHant from './zh-Hant.json';
import zhHans from './zh-Hans.json';

export const LanguageKey = {
  en: 'en',
  zhHant: 'zh-Hant',
  zhHans: 'zh-Hans',
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: cb => cb(LanguageKey.en),
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      [LanguageKey.en]: en,
      [LanguageKey.zhHant]: zhHant,
      [LanguageKey.zhHans]: zhHans,
    },
  });

export default i18n;
