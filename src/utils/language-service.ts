import enUS from 'lang/en-US.json';
import hrHR from 'lang/hr-HR.json';
import { createIntlCache, createIntl } from 'react-intl';

const cache = createIntlCache();

type LocalesSupported = Record<string, Record<string, string>>;

const loadLocaleData = (locale?: string) => {
  // handle setting the user's locale
  let userLocale: string;
  if (!locale) {
    userLocale = navigator.language;
  } else {
    userLocale = locale;
  }

  // next, create an object with the locale files currently available/supported
  const localesSupported: LocalesSupported = {
    'en-US': enUS,
    'hr-HR': hrHR,
  };

  // finally, check if user's locale is supported. if not, use 'en-US' as the default
  if (
    Object.prototype.hasOwnProperty.call(localesSupported, userLocale) === false
  ) {
    userLocale = 'en-US';
  }

  return {
    messages: localesSupported[userLocale],
    locale: userLocale,
  };
};

const { messages, locale } = loadLocaleData();

export const intl = createIntl(
  {
    messages,
    locale,
  },
  cache,
);
