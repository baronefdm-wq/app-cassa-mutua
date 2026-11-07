import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import type { Area } from '../data/site';
import { colors, fonts, radius } from '../theme';
import { Button, Pill } from './ui';

export function AreaCard({ area, width }: { area: Area; width: number }) {
  const go = () => router.push({ pathname: '/area/[id]', params: { id: area.id } });
  return (
    <Pressable onPress={go} style={[styles.card, { width }]}>
      <Image source={{ uri: area.image }} style={StyleSheet.absoluteFill} contentFit="cover" transition={250} />
      <LinearGradient colors={['rgba(7,26,51,0.35)', 'rgba(7,26,51,0.92)']} style={StyleSheet.absoluteFill} />
      <View style={styles.inner}>
        <Pill dark>{area.label}</Pill>
        <Text style={styles.title}>{area.title}</Text>
        <Text style={styles.desc}>{area.description}</Text>
        <View style={{ flex: 1 }} />
        <Button label={area.cta} onPress={go} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { height: 340, borderRadius: radius.lg, overflow: 'hidden', backgroundColor: colors.navy },
  inner: { flex: 1, padding: 22, gap: 12 },
  title: { fontFamily: fonts.heading, fontSize: 24, lineHeight: 28, color: colors.white, marginTop: 6 },
  desc: { fontFamily: fonts.body, fontSize: 15, lineHeight: 22, color: 'rgba(255,255,255,0.88)' },
});
