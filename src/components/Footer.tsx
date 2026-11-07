import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { contacts, links } from '../data/site';
import { openExternal } from '../lib/navigation';
import { colors, fonts, radius } from '../theme';

export function Footer() {
  const row = (label: string, onPress: () => void) => (
    <Pressable key={label} onPress={onPress} hitSlop={6}>
      <Text style={s.link}>{label}</Text>
    </Pressable>
  );
  return (
    <View style={s.wrap}>
      <Image source={require('../../assets/images/logo-white.png')} style={{ width: 170, height: 54 }} contentFit="contain" />
      <Text style={s.text}>
        {contacts.name}
        {'\n'}Via Giovanni Andrea Badoero 67 — 00154 Roma
      </Text>
      <View style={s.links}>
        {row(`📞 ${contacts.phone}`, () => openExternal(contacts.phoneHref))}
        {row(`✉️ ${contacts.email}`, () => openExternal(`mailto:${contacts.email}`))}
      </View>
      <View style={s.links}>
        {row('➜ Servizi per i Soci', () => router.push('/servizi'))}
        {row('➜ Diventa Socio', () => router.push('/diventa-socio'))}
        {row('➜ Link utili', () => router.push('/link-utili'))}
      </View>
      <View style={[s.links, { flexDirection: 'row', gap: 18 }]}>
        {row('Instagram', () => openExternal(contacts.instagram))}
        {row('LinkedIn', () => openExternal(contacts.linkedin))}
      </View>
      <View style={[s.links, { flexDirection: 'row', gap: 18 }]}>
        {row('Privacy Policy', () => openExternal(links.privacy))}
        {row('Cookie Policy', () => openExternal(links.cookie))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { marginTop: 34, marginHorizontal: 16, padding: 22, borderRadius: radius.lg, backgroundColor: colors.navyHeader, gap: 14 },
  text: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: '#C4C8FF' },
  links: { gap: 8 },
  link: { fontFamily: fonts.bodyMedium, fontSize: 14, color: '#C4C8FF' },
});
