import { createElement, useMemo } from 'react';
import { buildHtmlDocument } from './htmlDocument';

type Props = { html: string; title?: string };

/** Versione web (anteprima nel browser): usa un iframe. */
export default function HtmlView({ html, title }: Props) {
  const srcDoc = useMemo(() => buildHtmlDocument(html, title, { linksInNewTab: true }), [html, title]);
  return createElement('iframe', {
    srcDoc,
    title: title ?? 'Contenuto',
    style: { border: 0, width: '100%', height: '100%', flex: 1, background: 'transparent' },
  });
}
