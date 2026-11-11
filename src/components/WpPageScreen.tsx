import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import HtmlView from './HtmlView';
import { FavoriteButton } from './ConvenzioneRow';
import { OfflineBanner, ShareButton } from './ScreenExtras';
import { Button, ErrorBox, Loading } from './ui';
import { fetchPage, type WpPage } from '../lib/wp';
import { openExternal } from '../lib/navigation';
import { colors } from '../theme';

type Props = { slug: string; fallbackTitle?: string; favorite?: boolean };

/** Schermata che carica dal sito una pagina WordPress e la mostra con il suo stile originale. */
export function WpPageScreen({ slug, fallbackTitle, favorite }: Props) {
  const [page, setPage] = useState<WpPage | null>(null);
  const [savedAt, setSavedAt] = useState<number | undefined>();
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    fetchPage(slug)
      .then((r) => {
        if (!active) return;
        setPage(r.data);
        setSavedAt(r.savedAt);
      })
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
  const url = page?.link ?? `https://cassamutualazio.it/${slug}/`;

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title,
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 18, alignItems: 'center' }}>
              {favorite ? <FavoriteButton slug={slug} name={title} size={22} color={colors.white} /> : null}
              <ShareButton title={title} url={url} />
            </View>
          ),
        }}
      />
      {savedAt ? <OfflineBanner savedAt={savedAt} onRetry={load} /> : null}
      {error ? (
        <View>
          <ErrorBox onRetry={load} />
          <View style={{ paddingHorizontal: 16 }}>
            <Button label="Apri la pagina sul sito" variant="light" onPress={() => openExternal(url)} />
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
