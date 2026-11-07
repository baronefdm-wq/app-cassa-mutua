import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import HtmlView from './HtmlView';
import { Button, ErrorBox, Loading } from './ui';
import { fetchPage, type WpPage } from '../lib/wp';
import { openExternal } from '../lib/navigation';

/** Schermata che carica dal sito una pagina WordPress e la mostra con il suo stile originale. */
export function WpPageScreen({ slug, fallbackTitle }: { slug: string; fallbackTitle?: string }) {
  const [page, setPage] = useState<WpPage | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    fetchPage(slug)
      .then((p) => active && setPage(p))
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, [slug, attempt]);

  const load = () => {
    setError(false);
    setPage(null);
    setAttempt((n) => n + 1);
  };

  const title = page?.title ?? fallbackTitle ?? '';

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title }} />
      {error ? (
        <View>
          <ErrorBox onRetry={load} />
          <View style={{ paddingHorizontal: 16 }}>
            <Button label="Apri la pagina sul sito" variant="light" onPress={() => openExternal(`https://cassamutualazio.it/${slug}/`)} />
          </View>
        </View>
      ) : page ? (
        <HtmlView html={page.html} title={page.title} />
      ) : (
        <Loading />
      )}
    </View>
  );
}
