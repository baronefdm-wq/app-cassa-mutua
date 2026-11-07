import { type ReactNode, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  type StyleProp,
  StyleSheet,
  Text,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, gradients, radius, shadow } from '../theme';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'gold' | 'outline' | 'navy' | 'light';
  style?: StyleProp<ViewStyle>;
  icon?: string;
};

export function Button({ label, onPress, variant = 'gold', style, icon }: ButtonProps) {
  const text = (
    <Text
      style={[
        styles.buttonText,
        variant === 'gold' && { color: colors.navy },
        variant === 'outline' && { color: colors.white },
        variant === 'navy' && { color: colors.white },
        variant === 'light' && { color: colors.navy },
      ]}
    >
      {icon ? `${icon}  ` : ''}
      {label}
    </Text>
  );
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }, style]}
    >
      {variant === 'gold' ? (
        <LinearGradient colors={gradients.gold} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={[styles.button, styles.goldShadow]}>
          {text}
        </LinearGradient>
      ) : (
        <View
          style={[
            styles.button,
            variant === 'outline' && styles.outline,
            variant === 'navy' && { backgroundColor: colors.navy },
            variant === 'light' && { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.line },
          ]}
        >
          {text}
        </View>
      )}
    </Pressable>
  );
}

export function Eyebrow({ children, color = colors.goldLight, style }: { children: ReactNode; color?: string; style?: StyleProp<TextStyle> }) {
  return <Text style={[styles.eyebrow, { color }, style]}>{children}</Text>;
}

export function Pill({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <View style={[styles.pill, dark ? styles.pillDark : styles.pillLight]}>
      <Text style={[styles.pillText, { color: dark ? colors.goldLight : colors.blue }]}>{children}</Text>
    </View>
  );
}

export function SectionTitle({ title, subtitle, light, center }: { title: string; subtitle?: string; light?: boolean; center?: boolean }) {
  return (
    <View style={{ marginBottom: 18, alignItems: center ? 'center' : 'flex-start' }}>
      <Text style={[styles.h2, light && { color: colors.white }, center && { textAlign: 'center' }]}>{title}</Text>
      {subtitle ? (
        <Text style={[styles.lead, light && { color: 'rgba(255,255,255,0.82)' }, center && { textAlign: 'center' }]}>{subtitle}</Text>
      ) : null}
    </View>
  );
}

export function Card({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function CheckItem({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <View style={styles.checkRow}>
      <View style={styles.checkDot}>
        <Text style={styles.checkMark}>✓</Text>
      </View>
      <Text style={[styles.body, { flex: 1 }, light && { color: colors.white }]}>{children}</Text>
    </View>
  );
}

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <View style={{ gap: 10 }}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <Pressable key={it.q} onPress={() => setOpen(isOpen ? null : i)} style={[styles.card, { paddingVertical: 16 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Text style={[styles.h4, { flex: 1 }]}>{it.q}</Text>
              <Text style={[styles.h4, { color: colors.blue }]}>{isOpen ? '−' : '+'}</Text>
            </View>
            {isOpen ? <Text style={[styles.body, { marginTop: 10 }]}>{it.a}</Text> : null}
          </Pressable>
        );
      })}
    </View>
  );
}

export function Loading() {
  return (
    <View style={{ padding: 40, alignItems: 'center' }}>
      <ActivityIndicator color={colors.blue} size="large" />
    </View>
  );
}

export function ErrorBox({ onRetry }: { onRetry: () => void }) {
  return (
    <Card style={{ alignItems: 'center', gap: 12, margin: 16 }}>
      <Text style={styles.h4}>Impossibile caricare i contenuti</Text>
      <Text style={[styles.body, { textAlign: 'center' }]}>Controlla la connessione a internet e riprova.</Text>
      <Button label="Riprova" onPress={onRetry} variant="navy" />
    </Card>
  );
}

export const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    borderRadius: radius.pill,
    paddingHorizontal: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goldShadow: {
    shadowColor: '#FFB642',
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  outline: { borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.45)', backgroundColor: 'rgba(255,255,255,0.08)' },
  buttonText: { fontFamily: fonts.headingBold, fontSize: 16, letterSpacing: 0.2 },
  eyebrow: { fontFamily: fonts.headingBold, fontSize: 12, letterSpacing: 2.4, textTransform: 'uppercase' },
  pill: { alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 7, borderRadius: radius.pill, borderWidth: 1 },
  pillDark: { borderColor: 'rgba(255,255,255,0.25)', backgroundColor: 'rgba(255,255,255,0.1)' },
  pillLight: { borderColor: colors.blueSoft, backgroundColor: '#EEF5FF' },
  pillText: { fontFamily: fonts.headingBold, fontSize: 12, letterSpacing: 1.2, textTransform: 'uppercase' },
  h1: { fontFamily: fonts.heading, fontSize: 34, lineHeight: 38, color: colors.white, letterSpacing: -0.8 },
  h2: { fontFamily: fonts.heading, fontSize: 26, lineHeight: 31, color: colors.ink, letterSpacing: -0.5 },
  h3: { fontFamily: fonts.headingBold, fontSize: 20, lineHeight: 25, color: colors.ink },
  h4: { fontFamily: fonts.title, fontSize: 16, lineHeight: 21, color: colors.ink },
  lead: { fontFamily: fonts.body, fontSize: 16, lineHeight: 24, color: colors.muted, marginTop: 8 },
  body: { fontFamily: fonts.body, fontSize: 15, lineHeight: 22, color: colors.muted },
  small: { fontFamily: fonts.bodyMedium, fontSize: 13, lineHeight: 18, color: colors.muted },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadow,
  },
  checkRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginTop: 8 },
  checkDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E5F4EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkMark: { color: colors.success, fontFamily: fonts.bodyBold, fontSize: 13 },
});
