import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as typeof routing.locales[number])) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    onError(error: any) {
      if (error.code === 'MISSING_MESSAGE') {
        // Log the missing key but don't crash
        console.warn(error.message);
      } else {
        console.error(error);
      }
    },
    getMessageFallback({namespace, key, error}: any) {
      const path = [namespace, key].filter((part) => part != null).join('.');
      if (error.code === 'MISSING_MESSAGE') {
        return path;
      }
      return 'Translation error: ' + path;
    }
  };
});
