import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { ErrorBox, Loading, styles as ui } from '../../components/ui';
import { fetchPosts, formatDate, type WpPost } from '../../lib/wp';
import { colors, fonts, radius, shadow } from '../../theme';

const PER_PAGE = 10;

export default function News() {
  const [posts, setPosts] = useState<WpPost[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  const load = useCallback(async (p: number, replace: boolean) => {
    try {
      const list = await fetchPosts(p, PER_PAGE);
      setError(false);
      setPosts((prev) => (replace ? list : [...prev, ...list.filter((n) => !prev.some((o) => o.id === n.id))]));
      setPage(p);
      setDone(list.length < PER_PAGE);
    } catch {
      if (p === 1) setError(true);
      else setDone(true);
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetchPosts(1, PER_PAGE)
      .then((list) => {
        if (!active) return;
        setPosts(list);
        setDone(list.length < PER_PAGE);
      })
      .catch(() => active && setError(true))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const refresh = async () => {
    setRefreshing(true);
    await load(1, true);
    setRefreshing(false);
  };

  const more = async () => {
    if (loadingMore || done || loading) return;
    setLoadingMore(true);
    await load(page + 1, false);
    setLoadingMore(false);
  };

  if (loading) return <Loading />;
  if (error && posts.length === 0)
    return (
      <ErrorBox
        onRetry={() => {
          setLoading(true);
          void load(1, true).finally(() => setLoading(false));
        }}
      />
    );

  return (
    <FlatList
      data={posts}
      keyExtractor={(p) => String(p.id)}
      contentContainerStyle={{ padding: 16, gap: 14 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor={colors.blue} />}
      onEndReached={more}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={
        <Text style={[ui.lead, { marginTop: 0, marginBottom: 2 }]}>
          Salute, prevenzione e aggiornamenti per gli operatori sanitari del Lazio.
        </Text>
      }
      ListFooterComponent={loadingMore ? <ActivityIndicator color={colors.blue} style={{ margin: 20 }} /> : undefined}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => router.push({ pathname: '/news/[id]', params: { id: String(item.id) } })}
          style={({ pressed }) => [s.card, pressed && { opacity: 0.88 }]}
        >
          {item.image ? (
            <Image source={{ uri: item.image }} style={index === 0 ? s.imageBig : s.image} contentFit="cover" transition={200} />
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
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: colors.white, borderRadius: radius.md, overflow: 'hidden', borderWidth: 1, borderColor: colors.line, ...shadow, shadowOpacity: 0.06 },
  image: { width: '100%', height: 160, backgroundColor: colors.ice },
  imageBig: { width: '100%', height: 210, backgroundColor: colors.ice },
  date: { fontFamily: fonts.bodySemi, fontSize: 12, color: colors.blue, textTransform: 'uppercase', letterSpacing: 0.8 },
  title: { fontFamily: fonts.headingBold, fontSize: 18, lineHeight: 23, color: colors.ink },
  more: { fontFamily: fonts.bodySemi, fontSize: 14, color: colors.navy, marginTop: 4 },
});
