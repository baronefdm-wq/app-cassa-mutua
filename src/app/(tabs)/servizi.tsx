import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ConvenzioneRow } from '../../components/ConvenzioneRow';
import { Button, Eyebrow, SectionTitle, styles as ui } from '../../components/ui';
import { areas, convenzioni, links } from '../../data/site';
import { openExternal } from '../../lib/navigation';
import { colors, fonts, gradients, radius } from '../../theme';

const steps = [
  { n: '1', t: 'Diventa Socio', d: 'Iscrizione semplice e accesso ai servizi riservati.' },
  { n: '2', t: 'Scegli l’area di interesse', d: 'Servizi finanziari, convenzioni e iniziative: scegli ciò che ti serve.' },
  { n: '3', t: 'Ti seguiamo noi', d: 'Assistenza dedicata, indicazioni chiare e supporto passo dopo passo.' },
];

export default function Servizi() {
  const [q, setQ] = useState('');
  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return convenzioni.filter((c) => `${c.name} ${c.tags} ${c.description}`.toLowerCase().includes(t));
  }, [q]);

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
      <LinearGradient colors={gradients.hero} style={s.hero}>
        <Eyebrow>✨ Servizi per i Soci</Eyebrow>
        <Text style={[ui.h1, { fontSize: 28, lineHeight: 33, marginTop: 12 }]}>
          Servizi, tutele e vantaggi pensati per chi lavora nella sanità
        </Text>
        <Text style={[ui.body, { color: 'rgba(255,255,255,0.85)', marginTop: 12 }]}>
          Accesso agevolato al credito, convenzioni riservate e iniziative dedicate. Supporto reale, tempi rapidi e comunicazione
          chiara.
        </Text>
        <View style={s.chips}>
          {['✔ Oltre 8.000 Soci', '✔ Attiva da oltre 70 anni', '✔ Servizi riservati ai Soci'].map((c) => (
            <View key={c} style={s.chip}>
              <Text style={s.chipText}>{c}</Text>
            </View>
          ))}
        </View>
        <View style={s.search}>
          <Text style={{ fontSize: 16 }}>🔎</Text>
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Cerca una convenzione (es. dentista, palestra…)"
            placeholderTextColor="#8796A8"
            style={s.searchInput}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
        </View>
      </LinearGradient>

      {q.trim() ? (
        <View style={{ padding: 16, gap: 12 }}>
          <Text style={ui.small}>
            {results.length} {results.length === 1 ? 'risultato' : 'risultati'} per “{q.trim()}”
          </Text>
          {results.map((c) => (
            <ConvenzioneRow key={c.slug} item={c} />
          ))}
        </View>
      ) : (
        <>
          <View style={{ padding: 16, paddingTop: 26 }}>
            <SectionTitle title="Scegli l’area che ti interessa" />
            <View style={s.grid}>
              {areas.map((a) => {
                const count = convenzioni.filter((c) => c.area === a.id).length;
                return (
                  <Pressable
                    key={a.id}
                    onPress={() => router.push({ pathname: '/area/[id]', params: { id: a.id } })}
                    style={({ pressed }) => [s.areaTile, pressed && { opacity: 0.85 }]}
                  >
                    <Text style={{ fontSize: 28 }}>{a.emoji}</Text>
                    <Text style={s.areaLabel}>{a.label}</Text>
                    <Text style={s.areaCount}>
                      {count} {count === 1 ? 'servizio' : 'servizi'}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={{ paddingHorizontal: 16, paddingTop: 10 }}>
            <SectionTitle title="Come funziona" subtitle="Tre passaggi, senza complicazioni." />
            <View style={{ gap: 10 }}>
              {steps.map((st) => (
                <View key={st.n} style={s.step}>
                  <View style={s.stepNum}>
                    <Text style={s.stepNumText}>{st.n}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={ui.h4}>{st.t}</Text>
                    <Text style={[ui.body, { marginTop: 2 }]}>{st.d}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={{ paddingHorizontal: 16, paddingTop: 30, gap: 12 }}>
            <SectionTitle title="Tutte le convenzioni" />
            {convenzioni.map((c) => (
              <ConvenzioneRow key={c.slug} item={c} />
            ))}
          </View>

          <View style={{ paddingHorizontal: 16, paddingTop: 30 }}>
            <LinearGradient colors={gradients.hero} style={s.tessera}>
              <Eyebrow>Tessera digitale</Eyebrow>
              <Text style={[ui.h2, { color: colors.white, marginTop: 10 }]}>📱 Scarica la tua tessera digitale</Text>
              <Text style={[ui.body, { color: 'rgba(255,255,255,0.85)', marginTop: 10 }]}>
                Se sei già Socio puoi scaricare la tessera digitale direttamente sullo smartphone e mostrarla presso le strutture
                convenzionate.
              </Text>
              <Button label="Scarica la tessera digitale" onPress={() => openExternal(links.tesseraDigitale)} style={{ marginTop: 18 }} />
              <Button label="📝 Non sei Socio? Iscriviti" variant="outline" onPress={() => router.push('/diventa-socio')} style={{ marginTop: 10 }} />
            </LinearGradient>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  hero: { padding: 20, paddingTop: 24, paddingBottom: 26 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 16 },
  chip: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  chipText: { fontFamily: fonts.bodySemi, fontSize: 12, color: colors.white },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
    backgroundColor: colors.white,
    borderRadius: 999,
    paddingHorizontal: 18,
    height: 52,
  },
  searchInput: { flex: 1, fontFamily: fonts.body, fontSize: 15, color: colors.ink, height: '100%' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  areaTile: {
    width: '47.8%',
    flexGrow: 1,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: 16,
    gap: 6,
    borderWidth: 1,
    borderColor: colors.line,
  },
  areaLabel: { fontFamily: fonts.title, fontSize: 16, color: colors.ink },
  areaCount: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.blue },
  step: { flexDirection: 'row', gap: 14, alignItems: 'flex-start', backgroundColor: colors.white, borderRadius: radius.md, padding: 16, borderWidth: 1, borderColor: colors.line },
  stepNum: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.navy, alignItems: 'center', justifyContent: 'center' },
  stepNumText: { fontFamily: fonts.heading, color: colors.goldLight, fontSize: 15 },
  tessera: { borderRadius: radius.lg, padding: 22 },
});
