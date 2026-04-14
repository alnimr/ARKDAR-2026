import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import {NextRequest, NextResponse} from 'next/server';

const middleware = createMiddleware(routing);

export default function (request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path already has a locale
  const hasLocale = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!hasLocale) {
    // Advanced Detection
    const acceptLanguage = request.headers.get('accept-language');
    let detectedLocale = 'en'; // Default fallback

    if (acceptLanguage) {
      const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim().toLowerCase().split('-')[0]);
      const match = languages.find(lang => routing.locales.includes(lang as any));
      
      if (match) {
        detectedLocale = match;
      } else {
        // Language not supported - we will show modal later in the UI
        // We set a cookie to trigger the modal in the layout
        const response = NextResponse.redirect(new URL(`/en${pathname === '/' ? '' : pathname}`, request.url));
        response.cookies.set('arkdar_lang_detected', 'false', { path: '/', maxAge: 60 * 60 * 24 });
        return response;
      }
    }

    // Redirect to detected or fallback locale
    const response = NextResponse.redirect(new URL(`/${detectedLocale}${pathname === '/' ? '' : pathname}`, request.url));
    if (detectedLocale === 'en' && !acceptLanguage) {
        response.cookies.set('arkdar_lang_detected', 'false', { path: '/', maxAge: 60 * 60 * 24 });
    } else {
        response.cookies.set('arkdar_lang_detected', 'true', { path: '/', maxAge: 60 * 60 * 24 });
    }
    return response;
  }

  return middleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ar|en|de|es)/:path*']
};
