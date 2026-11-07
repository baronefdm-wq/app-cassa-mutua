export const BASE_URL = 'https://cassamutualazio.it/';

/**
 * Avvolge il contenuto di una pagina WordPress in un documento completo,
 * con i font e lo stile base del sito, adattato allo schermo del telefono.
 */
export function buildHtmlDocument(content: string, title?: string, opts: { linksInNewTab?: boolean } = {}) {
  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<base href="${BASE_URL}"${opts.linksInNewTab ? ' target="_blank"' : ''}>
<title>${title ?? ''}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@600;700;800;900&display=swap" rel="stylesheet">
<style>
  html, body { margin: 0; padding: 0; background: #F6F8FB; color: #10243A; }
  body { font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; font-size: 16px; line-height: 1.55;
         -webkit-text-size-adjust: 100%; overflow-x: hidden; }
  h1, h2, h3, h4 { font-family: Montserrat, Inter, sans-serif; line-height: 1.2; }
  img, iframe, video { max-width: 100%; height: auto; }
  iframe[src*="google.com/maps"] { width: 100%; min-height: 240px; border: 0; border-radius: 16px; }
  a { color: #1E78C5; }
  .app-wrap { padding: 0 0 32px; }
  .app-wrap > p, .app-wrap > h2, .app-wrap > h3, .app-wrap > ul, .app-wrap > ol, .app-wrap > figure { margin-left: 18px; margin-right: 18px; }
  .wpb-content-wrapper, .vc_row, .vc_column-inner, .wpb_wrapper { margin: 0 !important; padding: 0 !important; }
  table { width: 100%; border-collapse: collapse; }
</style>
</head>
<body><div class="app-wrap">${content}</div></body>
</html>`;
}
