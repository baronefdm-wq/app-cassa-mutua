import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, StyleSheet, Text, TextInput, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { OfflineBanner } from '../../components/ScreenExtras';
import { ErrorBox, Loading, styles as ui } from '../../components/ui';
import { fetchPosts, formatDate, type WpPost } from '../../lib/wp';
import { colors, fonts, radius, shadow } from '../../theme';

const PER_PAGE = 10;

export default function News() {
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState<WpPost[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const [savedAt, setSavedAt] = useState<number | undefined>();
  const [attempt, setAttempt] = useState(0);

  // Ricerca: aspetta che l'utente smetta di scrivere prima di interrogare il sito.
  useEffect(() => {
    const t = setTimeout(() => setQuery(text.trim()), 450);
    return () => clearTimeout(t);
  }, [text]);

  useEffect(() => {
    let active = true;
    fetchPosts(1, PER_PAGE, query || undefined)
      .then((r) => {
        if (!active) return;
        setPosts(r.data);
        setSavedAt(r.savedAt);
        setPage(1);
        setDone(r.data.length < PER_PAGE || !!r.savedAt);
        setError(false);
      })
      .catch(() => active && setError(true))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [query, attempt]);

  const load = useCallback(
    async (p: number) => {
      try {
        const r = await fetchPosts(p, PER_PAGE, query || undefined);
        setPosts((prev) => [...prev, ...r.data.filter((n) => !prev.some((o) => o.id === n.id))]);
        setPage(p);
        setDone(r.data.length < PER_PAGE);
      } catch {
        setDone(true);
      }
    },
    [query],
  );

  const refresh = () => {
    setRefreshing(true);
    setAttempt((n) => n + 1);
    setTimeout(() => setRefreshing(false), 600);
  };

  const more = async () => {
    if (loadingMore || done || loading) return;
    setLoadingMore(true);
    await load(page + 1);
    setLoadingMore(false);
  };

  const retry = () => {
    setLoading(true);
    setError(false);
    setAttempt((n) => n + 1);
  };

  const header = (
    <View style={{ gap: 12, marginBottom: 2 }}>
      <View style={s.search}>
        <Ionicons name="search" size={18} color="#8796A8" />
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Cerca nelle news (es. prevenzione, OSS…)"
          placeholderTextColor="#8796A8"
          style={s.searchInput}
          returnKeyType="search"
          clearButtonMode="while-editing"
          accessibilityLabel="Cerca nelle news"
        />
      </View>
      {query ? (
        <Text style={ui.small}>
          {posts.length === 0 && !loading ? 'Nessun articolo trovato' : 'Risultati'} per “{query}”
        </Text>
      ) : (
        <Text style={[ui.lead, { marginTop: 0 }]}>Salute, prevenzione e aggiornamenti per gli operatori sanitari del Lazio.</Text>
      )}
    </View>
  );

  if (error && posts.length === 0) return <ErrorBox onRetry={retry} />;

  return (
    <View style={{ flex: 1 }}>
      {savedAt ? <OfflineBanner savedAt={savedAt} onRetry={retry} /> : null}
      <FlatList
        data={loading ? [] : posts}
        keyExtractor={(p) => String(p.id)}
        contentContainerStyle={{ padding: 16, gap: 14 }}
        keyboardShouldPersistTaps="handled"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={colors.blue} />}
        onEndReached={more}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={header}
        ListEmptyComponent={loading ? <Loading /> : undefined}
        ListFooterComponent={loadingMore ? <ActivityIndicator color={colors.blue} style={{ margin: 20 }} /> : undefined}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => router.push({ pathname: '/news/[id]', params: { id: String(item.id) } })}
            accessibilityRole="button"
            accessibilityLabel={`${item.title}, ${formatDate(item.date)}`}
            accessibilityHint="Apre l’articolo"
            style={({ pressed }) => [s.card, pressed && { opacity: 0.88 }]}
          >
            {item.image ? (
              <Image
                source={{ uri: item.image }}
                style={index === 0 && !query ? s.imageBig : s.image}
                contentFit="cover"
                transition={200}
                accessibilityIgnoresInvertColors
              />
            ) : null}
            <View style={{ padding: 16, gap: 6 }}>
              <Text style={s.date}>{formatDate(item.date)}</Text>
              <Text style={s.title}>{item.title}</Text>
              <Text style={ui.body} numberOfLines={3}>
                {item.excerpt}
              </Text>
              <Text style={s.more}>Leggi l’articolo →</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.white,
    borderRadius: 999,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: colors.line,
  },
  searchInput: { flex: 1, fontFamily: fonts.body, fontSize: 15, color: colors.ink, height: '100%' },
  card: { backgroundColor: colors.white, borderRadius: radius.md, overflow: 'hidden', borderWidth: 1, borderColor: colors.line, ...shadow, shadowOpacity: 0.06 },
  image: { width: '100%', height: 160, backgroundColor: colors.ice },
  imageBig: { width: '100%', height: 210, backgroundColor: colors.ice },
  date: { fontFamily: fonts.bodySemi, fontSize: 12, color: colors.blue, textTransform: 'uppercase', letterSpacing: 0.8 },
  title: { fontFamily: fonts.headingBold, fontSize: 18, lineHeight: 23, color: colors.ink },
  more: { fontFamily: fonts.bodySemi, fontSize: 14, color: colors.navy, marginTop: 4 },
});
