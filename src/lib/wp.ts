import { SITE_URL } from '../data/site';

const API = `${SITE_URL}/wp-json/wp/v2`;

export type WpPage = { id: number; slug: string; link: string; title: string; html: string };
export type WpPost = {
  id: number;
  date: string;
  link: string;
  title: string;
  excerpt: string;
  html: string;
  image?: string;
};

const ENTITIES: Record<string, string> = {
  '&amp;': '&', '&quot;': '"', '&#039;': "'", '&#8217;': '’', '&#8216;': '‘', '&#8220;': '“',
  '&#8221;': '”', '&#8211;': '–', '&#8212;': '—', '&#8230;': '…', '&nbsp;': ' ', '&lt;': '<', '&gt;': '>',
};

export function decodeEntities(s: string): string {
  return s
    .replace(/&#(\d+);/g, (m, n) => ENTITIES[m] ?? String.fromCharCode(Number(n)))
    .replace(/&[a-z]+;/g, (m) => ENTITIES[m] ?? m);
}

export function stripTags(s: string): string {
  return decodeEntities(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
}

const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function base64ToAscii(input: string): string {
  if (typeof globalThis.atob === 'function') return globalThis.atob(input);
  let out = '';
  let buffer = 0;
  let bits = 0;
  for (const ch of input.replace(/=+$/, '')) {
    const v = B64.indexOf(ch);
    if (v < 0) continue;
    buffer = (buffer << 6) | v;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      out += String.fromCharCode((buffer >> bits) & 0xff);
    }
  }
  return out;
}

/**
 * Il sito usa blocchi WPBakery "raw html": il contenuto è codificato in base64 + URL-encoding.
 * Qui lo decodifichiamo e rimuoviamo gli shortcode rimasti.
 */
export function decodeWpContent(html: string): string {
  const decoded = html.replace(/\[vc_raw_html[^\]]*\]([\s\S]*?)\[\/vc_raw_html\]/g, (_m, b64: string) => {
    try {
      return decodeURIComponent(base64ToAscii(b64.trim()));
    } catch {
      return '';
    }
  });
  return decoded.replace(/\[\/?[a-z_]+[^\]]*\]/g, '');
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as T;
}

type RawPage = { id: number; slug: string; link: string; title: { rendered: string }; content: { rendered: string } };

export async function fetchPage(slug: string): Promise<WpPage> {
  const list = await getJson<RawPage[]>(`${API}/pages?slug=${encodeURIComponent(slug)}&_fields=id,slug,link,title,content`);
  const p = list[0];
  if (!p) throw new Error('Pagina non trovata');
  return { id: p.id, slug: p.slug, link: p.link, title: stripTags(p.title.rendered), html: decodeWpContent(p.content.rendered) };
}

type RawPost = {
  id: number;
  date: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: { 'wp:featuredmedia'?: { source_url?: string; media_details?: { sizes?: Record<string, { source_url: string }> } }[] };
};

function mapPost(p: RawPost): WpPost {
  const media = p._embedded?.['wp:featuredmedia']?.[0];
  const sizes = media?.media_details?.sizes;
  return {
    id: p.id,
    date: p.date,
    link: p.link,
    title: stripTags(p.title.rendered),
    excerpt: stripTags(p.excerpt.rendered),
    html: decodeWpContent(p.content.rendered),
    image: sizes?.medium_large?.source_url ?? sizes?.large?.source_url ?? media?.source_url,
  };
}

export async function fetchPosts(page = 1, perPage = 10): Promise<WpPost[]> {
  const list = await getJson<RawPost[]>(`${API}/posts?per_page=${perPage}&page=${page}&_embed=wp:featuredmedia`);
  return list.map(mapPost);
}

export async function fetchPost(id: number): Promise<WpPost> {
  return mapPost(await getJson<RawPost>(`${API}/posts/${id}?_embed=wp:featuredmedia`));
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  const months = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
