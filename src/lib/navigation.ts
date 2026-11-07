import { Linking } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { router, type Href } from 'expo-router';
import { convenzioni } from '../data/site';
import { colors } from '../theme';

/** Pagine del sito che nell'app hanno una schermata nativa. */
const NATIVE_ROUTES: Record<string, Href> = {
  '': '/',
  'storia-della-cassa-mutua': '/chi-siamo',
  'diventa-socio': '/diventa-socio',
  'diventa-socio-cassa-mutua': '/diventa-socio',
  'servizi-cassa-mutua': '/servizi',
  'convenzioni-cassa-mutua': '/servizi',
  'tabella-prestiti': '/prestiti',
  'prestito-a-tasso-sociale': '/prestiti',
  'settore-finanziario-cassa-mutua': '/area/casa-finanza',
  'servizi-finanziari-e-immobiliari': '/area/casa-finanza',
  'cessione-del-quinto': '/cessione-quinto',
  'contatti-cassa-mutua': '/contatti',
  contatti: '/contatti',
  news: '/news',
  'link-utili-cassa-mutua': '/link-utili',
  'salute-2': '/area/salute',
  salute: '/area/salute',
  benessere: '/area/benessere',
  serviziassicurativi: '/area/assicurazioni',
  'tempo-libero-2': '/area/tempo-libero',
  'tempo-libero': '/area/tempo-libero',
  'assistenza-e-supporto': '/area/fisco-legale',
  professionali: '/area/fisco-legale',
};

/** Alias di slug usati nei link del sito. */
const SLUG_ALIASES: Record<string, string> = {
  'studio-dentistico': 'studio-dentistico-dr-giuseppe-bonardi',
};

export async function openExternal(url: string) {
  if (/^(tel|mailto|sms):/i.test(url)) {
    await Linking.openURL(url);
    return;
  }
  await WebBrowser.openBrowserAsync(url, {
    toolbarColor: colors.navy,
    controlsColor: colors.goldLight,
    presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
  });
}

/** Restituisce la route interna dell'app per un URL di cassamutualazio.it, se esiste. */
export function routeForSiteUrl(url: string): Href | null {
  const m = url.match(/^https?:\/\/(?:www\.)?cassamutualazio\.it\/?([^?#]*)/i);
  if (!m) return null;
  const parts = m[1].split('/').filter(Boolean);
  if (parts[0] === 'news' && parts.length > 1) return null; // articolo: aperto nel browser interno
  if (parts[0] === 'category' && parts[1] === 'news') return '/news';
  if (parts[0] === 'wp-content') return null;
  let slug = parts[parts.length - 1] ?? '';
  slug = SLUG_ALIASES[slug] ?? slug;
  if (slug in NATIVE_ROUTES) return NATIVE_ROUTES[slug];
  const conv = convenzioni.find((c) => c.slug === slug);
  if (conv) return conv.route ?? { pathname: '/convenzione/[slug]', params: { slug: conv.slug } };
  if (parts.length) return { pathname: '/pagina/[slug]', params: { slug } };
  return '/';
}

/** Apre un link: schermata dell'app se possibile, altrimenti browser interno / telefono / email. */
export function openLink(url: string) {
  const route = routeForSiteUrl(url);
  if (route) router.push(route);
  else void openExternal(url);
}
