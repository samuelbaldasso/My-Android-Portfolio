import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all request paths except internal files and public assets
  matcher: [
    '/',
    '/(pt-BR|en)/:path*',
    '/((?!api|_next|_vercel|resume|projects|.*\\..*).*)',
  ],
};
