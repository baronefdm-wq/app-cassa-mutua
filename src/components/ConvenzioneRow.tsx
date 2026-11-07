import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import type { Convenzione } from '../data/site';
import { colors, fonts, radius, shadow } from '../theme';

export function openConvenzione(c: Convenzione) {
  if (c.route) router.push(c.route);
  else router.push({ pathname: '/convenzione/[slug]', params: { slug: c.slug, name: c.name } });
}

export function ConvenzioneRow({ item }: { item: Convenzione }) {
  return (
    <Pressable onPress={() => openConvenzione(item)} style={({ pressed }) => [s.card, pressed && { opacity: 0.85 }]}>
      <View style={s.icon}>
        <Text style={{ fontSize: 24 }}>{item.emoji}</Text>
      </View>
      <View style={{ flex: 1, gap: 3 }}>
        <Text style={s.name}>{item.name}</Text>
        <Text style={s.tags} numberOfLines={1}>
          {item.tags}
        </Text>
        <Text style={s.desc} numberOfLines={2}>
          {item.description}
        </Text>
        {item.highlight ? (
          <View style={s.badge}>
            <Text style={s.badgeText}>{item.highlight}</Text>
          </View>
        ) : null}
      </View>
      <Text style={s.chev}>›</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadow,
    shadowOpacity: 0.06,
  },
  icon: { width: 52, height: 52, borderRadius: 16, backgroundColor: colors.ice, alignItems: 'center', justifyContent: 'center' },
  name: { fontFamily: fonts.title, fontSize: 16, color: colors.ink },
  tags: { fontFamily: fonts.bodySemi, fontSize: 12, color: colors.blue },
  desc: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 19, color: colors.muted },
  badge: { alignSelf: 'flex-start', marginTop: 4, backgroundColor: colors.creamSoft, borderColor: colors.cream, borderWidth: 1, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 3 },
  badgeText: { fontFamily: fonts.bodyBold, fontSize: 12, color: '#9A6200' },
  chev: { fontSize: 28, color: '#A7B3C2', marginLeft: 2 },
});
