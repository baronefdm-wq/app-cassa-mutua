import { useMemo, useRef } from 'react';
import { WebView } from 'react-native-webview';
import type { ShouldStartLoadRequest } from 'react-native-webview/lib/WebViewTypes';
import { openLink } from '../lib/navigation';
import { BASE_URL, buildHtmlDocument } from './htmlDocument';

type Props = { html: string; title?: string };

/** Mostra il contenuto HTML (con gli stili originali del sito) dentro una WebView. */
export default function HtmlView({ html, title }: Props) {
  const loaded = useRef(false);
  const source = useMemo(() => ({ html: buildHtmlDocument(html, title), baseUrl: BASE_URL }), [html, title]);

  const onNavigate = (req: ShouldStartLoadRequest) => {
    const { url } = req;
    // Prima del termine del caricamento lasciamo passare tutto (documento iniziale, iframe delle mappe, risorse).
    if (!loaded.current || req.isTopFrame === false) return true;
    // Ancore interne alla pagina.
    if (url.startsWith(`${BASE_URL}#`) || url === 'about:blank') return true;
    openLink(url);
    return false;
  };

  return (
    <WebView
      originWhitelist={['*']}
      source={source}
      onLoadEnd={() => {
        loaded.current = true;
      }}
      onShouldStartLoadWithRequest={onNavigate}
      setSupportMultipleWindows={false}
      style={{ flex: 1, backgroundColor: 'transparent' }}
    />
  );
}
