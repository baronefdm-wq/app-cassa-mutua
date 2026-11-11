import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AreaCard } from '../../components/AreaCard';
import { Accordion, Button, Card, CheckItem, Eyebrow, SectionTitle, styles as ui } from '../../components/ui';
import { Footer } from '../../components/Footer';
import { areas, cessione, contacts, convenzioni, homeFaq, testimonials } from '../../data/site';
import { ConvenzioneRow } from '../../components/ConvenzioneRow';
import { useFavorites } from '../../lib/favorites';
import { openExternal } from '../../lib/navigation';
import { colors, fonts, gradients, radius } from '../../theme';

const quickActions = [
  { icon: '🪪', label: 'La mia tessera', onPress: () => router.push('/tessera') },
  { icon: '❤️', label: 'Preferiti', onPress: () => router.push('/preferiti') },
  { icon: '💶', label: 'Prestiti', onPress: () => router.push('/prestiti') },
  { icon: '📞', label: 'Chiama', onPress: () => openExternal(contacts.phoneHref) },
];

export default function Home() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(width * 0.78, 360);
  const { favorites } = useFavorites();
  const favItems = convenzioni.filter((c) => favorites.includes(c.slug)).slice(0, 3);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ paddingBottom: 24 }}>
      {/* HERO */}
      <LinearGradient colors={gradients.hero} style={{ paddingTop: insets.top + 12, paddingBottom: 34 }}>
        <View style={s.topBar}>
          <Image source={require('../../../assets/images/logo-white.png')} style={s.logo} contentFit="contain" />
          <Pressable onPress={() => router.push('/chi-siamo')} hitSlop={10}>
            <Text style={s.topLink}>Chi siamo</Text>
          </Pressable>
        </View>

        <View style={s.heroCard}>
          <Eyebrow>Cassa Mutua Sanità Regione Lazio</Eyebrow>
          <Text style={[ui.h1, { marginTop: 14 }]}>
            Welfare mutualistico{'\n'}per gli <Text style={{ color: colors.goldLight }}>operatori sanitari</Text>
          </Text>
          <Text style={[ui.h1, s.heroSub]}>della Regione Lazio</Text>
          <Text style={s.heroLead}>Convenzioni, servizi esclusivi, prestiti a tasso sociale e tante altre opportunità.</Text>
          <View style={{ gap: 12, marginTop: 22 }}>
            <Button label="Diventa Socio" onPress={() => router.push('/diventa-socio')} />
            <Button label="Scopri convenzioni e servizi" variant="outline" onPress={() => router.push('/servizi')} />
          </View>
          <View style={s.stats}>
            <View style={s.stat}>
              <Text style={s.statNum}>8.000+</Text>
              <Text style={s.statLabel}>Soci</Text>
            </View>
            <View style={s.statDivider} />
            <View style={s.stat}>
              <Text style={s.statNum}>70+</Text>
              <Text style={s.statLabel}>anni di attività</Text>
            </View>
            <View style={s.statDivider} />
            <View style={s.stat}>
              <Text style={s.statNum}>1950</Text>
              <Text style={s.statLabel}>anno di fondazione</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* AZIONI RAPIDE */}
      <View style={s.quickRow}>
        {quickActions.map((a) => (
          <Pressable key={a.label} onPress={a.onPress} accessibilityRole="button" accessibilityLabel={a.label} style={({ pressed }) => [s.quick, pressed && { opacity: 0.8 }]}>
            <Text style={{ fontSize: 24 }}>{a.icon}</Text>
            <Text style={s.quickLabel}>{a.label}</Text>
          </Pressable>
        ))}
      </View>

      {/* PREFERITI */}
      {favItems.length ? (
        <View style={{ paddingHorizontal: 18, marginTop: 30, gap: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Text style={ui.h3}>I tuoi preferiti</Text>
            <Pressable onPress={() => router.push('/preferiti')} hitSlop={8} accessibilityRole="button">
              <Text style={s.topLinkDark}>Vedi tutti</Text>
            </Pressable>
          </View>
          {favItems.map((c) => (
            <ConvenzioneRow key={c.slug} item={c} />
          ))}
        </View>
      ) : null}

      {/* AREE */}
      <View style={{ paddingHorizontal: 18, marginTop: 30 }}>
        <SectionTitle title="Le principali aree dedicate" subtitle="Accedi in modo semplice e immediato ai servizi, alle convenzioni e alle opportunità riservate." />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth + 14}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 18, gap: 14 }}
      >
        {areas.map((a) => (
          <AreaCard key={a.id} area={a} width={cardWidth} />
        ))}
      </ScrollView>

      {/* CESSIONE DEL QUINTO */}
      <View style={{ paddingHorizontal: 18, marginTop: 34 }}>
        <LinearGradient colors={['#1C2F4A', '#22466F']} style={s.darkBlock}>
          <Eyebrow>Finanziamento</Eyebrow>
          <Text style={[ui.h2, { color: colors.white, marginTop: 10 }]}>
            Cessione <Text style={{ color: colors.goldLight }}>del quinto</Text>
          </Text>
          <Text style={[ui.body, { color: 'rgba(255,255,255,0.85)', marginTop: 10 }]}>
            Una soluzione di finanziamento pensata per dipendenti e pensionati, con rata trattenuta direttamente da stipendio o
            pensione e importo massimo pari a un quinto del netto mensile.
          </Text>
          <View style={s.kpiRow}>
            <View style={s.kpi}>
              <Text style={s.kpiNum}>1/5</Text>
              <Text style={s.kpiLabel}>importo massimo della rata mensile</Text>
            </View>
            <View style={s.kpi}>
              <Text style={s.kpiNum}>120</Text>
              <Text style={s.kpiLabel}>mesi di durata massima</Text>
            </View>
          </View>
          <Text style={[ui.h4, { color: colors.white, marginTop: 6 }]}>Documenti richiesti</Text>
          {cessione.documents.slice(0, 4).map((d) => (
            <CheckItem key={d} light>
              {d}
            </CheckItem>
          ))}
          <Button label="Richiedi valutazione gratuita" onPress={() => router.push('/cessione-quinto')} style={{ marginTop: 20 }} />
        </LinearGradient>
      </View>

      {/* PRESTITI */}
      <View style={{ paddingHorizontal: 18, marginTop: 30 }}>
        <Card style={{ padding: 22 }}>
          <Eyebrow color={colors.blue}>Per i Soci</Eyebrow>
          <Text style={[ui.h2, { marginTop: 8 }]}>Prestiti a tasso sociale</Text>
          <Text style={[ui.body, { marginTop: 10 }]}>
            I Soci della Cassa Mutua Sanità Regione Lazio possono accedere a prestiti a tasso sociale con importi compresi tra
            € 2.000 e € 5.000 e tasso del 5%.
          </Text>
          <View style={s.loanGrid}>
            {[
              ['Importi disponibili', 'Da € 2.000 a € 5.000'],
              ['Tasso applicato', '5%'],
              ['Destinatari', 'Soci in regola'],
            ].map(([k, v]) => (
              <View key={k} style={s.loanCell}>
                <Text style={ui.small}>{k}</Text>
                <Text style={[ui.h4, { color: colors.navy, marginTop: 4 }]}>{v}</Text>
              </View>
            ))}
          </View>
          <Text style={[ui.small, { marginTop: 12 }]}>
            La concessione del prestito è subordinata alla verifica dei requisiti previsti dalla Cassa Mutua.
          </Text>
          <Button label="Consulta la tabella →" variant="navy" onPress={() => router.push('/prestiti')} style={{ marginTop: 18 }} />
        </Card>
      </View>

      {/* TESTIMONIANZE */}
      <View style={{ paddingHorizontal: 18, marginTop: 34 }}>
        <SectionTitle title="Testimonianze" subtitle="Esperienze, servizi e supporto raccontati da chi fa parte della Cassa Mutua." />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 18, gap: 14 }}>
        {testimonials.map((t) => (
          <Card key={t.name} style={{ width: cardWidth, gap: 10 }}>
            <Text style={{ color: colors.gold, fontSize: 16, letterSpacing: 2 }}>★★★★★</Text>
            <Text style={[ui.body, { color: colors.ink, fontSize: 16, lineHeight: 24 }]}>“{t.text}”</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 6 }}>
              <View style={s.avatar}>
                <Text style={s.avatarText}>{t.name[0]}</Text>
              </View>
              <View>
                <Text style={ui.h4}>{t.name}</Text>
                <Text style={ui.small}>{t.role} • Socio</Text>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>

      {/* FAQ */}
      <View style={{ paddingHorizontal: 18, marginTop: 34 }}>
        <SectionTitle
          title="Domande frequenti"
          subtitle="Le risposte più utili per capire come iscriversi, ricevere la tessera e utilizzare i vantaggi riservati ai Soci."
        />
        <Accordion items={homeFaq} />
      </View>

      {/* CTA CONSULENTI */}
      <View style={{ paddingHorizontal: 18, marginTop: 34 }}>
        <LinearGradient colors={gradients.hero} style={s.darkBlock}>
          <Text style={[ui.h2, { color: colors.white }]}>Parla con uno dei nostri consulenti</Text>
          <Text style={[ui.body, { color: 'rgba(255,255,255,0.85)', marginTop: 10 }]}>
            Fissa un appuntamento telefonico o in presenza e ricevi informazioni chiare, complete e personalizzate sulle soluzioni
            di prestito, sui requisiti e sulle procedure di richiesta.
          </Text>
          <Button label="Contattaci →" onPress={() => router.push('/contatti')} style={{ marginTop: 18 }} />
          <Text style={[ui.small, { color: colors.periwinkle, marginTop: 14, textAlign: 'center' }]}>
            Consulenza professionale, semplice e trasparente.
          </Text>
        </LinearGradient>
      </View>

      <Footer />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18 },
  logo: { width: 190, height: 60 },
  topLink: { fontFamily: fonts.bodySemi, color: colors.periwinkle, fontSize: 14 },
  topLinkDark: { fontFamily: fonts.bodySemi, color: colors.blue, fontSize: 14 },
  heroCard: {
    marginHorizontal: 16,
    marginTop: 18,
    padding: 22,
    borderRadius: radius.lg,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  heroSub: { color: colors.blueSoft, fontSize: 26, lineHeight: 32, marginTop: 2 },
  heroLead: { fontFamily: fonts.body, fontSize: 17, lineHeight: 26, color: 'rgba(255,255,255,0.9)', marginTop: 14 },
  stats: { flexDirection: 'row', marginTop: 24, paddingTop: 18, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.14)' },
  stat: { flex: 1, alignItems: 'center' },
  statNum: { fontFamily: fonts.heading, fontSize: 22, color: colors.goldLight },
  statLabel: { fontFamily: fonts.bodyMedium, fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 2, textAlign: 'center' },
  statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.14)' },
  quickRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginTop: -22 },
  quick: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: colors.line,
    shadowColor: '#0B2E6F',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  quickLabel: { fontFamily: fonts.bodySemi, fontSize: 11.5, color: colors.ink, textAlign: 'center' },
  darkBlock: { borderRadius: radius.lg, padding: 22 },
  kpiRow: { flexDirection: 'row', gap: 12, marginVertical: 18 },
  kpi: { flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: radius.md, padding: 14 },
  kpiNum: { fontFamily: fonts.heading, fontSize: 28, color: colors.goldLight },
  kpiLabel: { fontFamily: fonts.body, fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  loanGrid: { gap: 10, marginTop: 16 },
  loanCell: { backgroundColor: colors.ice, borderRadius: radius.sm, padding: 14 },
  avatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.navy, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.goldLight, fontFamily: fonts.headingBold, fontSize: 16 },
});
