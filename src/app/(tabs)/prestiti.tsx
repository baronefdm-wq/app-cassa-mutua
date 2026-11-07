import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Button, Card, CheckItem, Eyebrow, SectionTitle, styles as ui } from '../../components/ui';
import { links, loans } from '../../data/site';
import { openExternal } from '../../lib/navigation';
import { colors, fonts, gradients, radius } from '../../theme';

const AMOUNTS = [2000, 3000, 4000, 5000];
const AMOUNT_COLORS: Record<number, string> = { 2000: '#0B72D9', 3000: '#1F9D6B', 4000: '#E08A00', 5000: '#7A4FD6' };
const euro = (n: number) => `€ ${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

export default function Prestiti() {
  const [amount, setAmount] = useState(2000);
  const accent = AMOUNT_COLORS[amount];

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
      <LinearGradient colors={gradients.hero} style={s.hero}>
        <Eyebrow>Per i Soci</Eyebrow>
        <Text style={[ui.h1, { fontSize: 30, marginTop: 10 }]}>Prestiti a tasso sociale</Text>
        <Text style={[ui.body, { color: 'rgba(255,255,255,0.85)', marginTop: 10 }]}>
          Scegli l’importo e scopri tutte le rate disponibili. Processo semplice e veloce, con documentazione minima.
        </Text>
        <View style={s.kpis}>
          <View style={s.kpi}>
            <Text style={s.kpiLabel}>% TAN fisso</Text>
            <Text style={s.kpiValue}>{loans.tan}</Text>
          </View>
          <View style={s.kpi}>
            <Text style={s.kpiLabel}>€ Spese di istruttoria</Text>
            <Text style={[s.kpiValue, { fontSize: 18 }]}>{loans.fee}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={{ padding: 16, paddingTop: 24 }}>
        <SectionTitle title="Scegli l’importo" subtitle="Tocca un importo per vedere tutte le soluzioni di rimborso." />
        <View style={s.amounts}>
          {AMOUNTS.map((a) => {
            const active = a === amount;
            return (
              <Pressable
                key={a}
                onPress={() => setAmount(a)}
                style={[s.amount, active && { borderColor: AMOUNT_COLORS[a], backgroundColor: `${AMOUNT_COLORS[a]}12` }]}
              >
                <Text style={[s.amountValue, active && { color: AMOUNT_COLORS[a] }]}>{euro(a)}</Text>
                <Text style={ui.small}>
                  {loans.table[a].length} soluzioni
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Card style={{ marginTop: 18, borderTopWidth: 4, borderTopColor: accent }}>
          <Text style={ui.small}>Importo selezionato</Text>
          <Text style={[ui.h2, { color: accent, marginTop: 2 }]}>{euro(amount)}</Text>
          <View style={{ marginTop: 12 }}>
            {loans.table[amount].map((r, i) => (
              <View key={r.months} style={[s.rateRow, i > 0 && { borderTopWidth: 1, borderTopColor: colors.line }]}>
                <View>
                  <Text style={ui.small}>Durata</Text>
                  <Text style={ui.h4}>{r.months} mesi</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={ui.small}>Rata mensile</Text>
                  <Text style={[ui.h3, { color: accent }]}>{r.rate}</Text>
                </View>
              </View>
            ))}
          </View>
        </Card>
        <Text style={[ui.small, { marginTop: 12 }]}>
          Le rate riportate hanno finalità informative e sono riferite a TAN fisso 5% e spese di istruttoria una tantum pari a
          € 100. La concessione del prestito è soggetta a valutazione e ai requisiti previsti.
        </Text>

        <Card style={{ marginTop: 24 }}>
          <Text style={ui.h3}>Documenti richiesti</Text>
          {loans.documents.map((d) => (
            <CheckItem key={d}>{d}</CheckItem>
          ))}
          <Text style={[ui.body, { marginTop: 14 }]}>
            Compila il modulo di richiesta di simulazione: è senza alcun impegno. Ti verrà chiesto di caricare l’ultima busta paga
            in formato PDF.
          </Text>
          <Button label="Richiedi simulazione del prestito" onPress={() => openExternal(links.formPrestito + '#wpforms-1593')} style={{ marginTop: 16 }} />
        </Card>

        <Card style={{ marginTop: 16, backgroundColor: colors.creamSoft, borderColor: colors.cream }}>
          <Text style={ui.h4}>Cerchi un importo più alto?</Text>
          <Text style={[ui.body, { marginTop: 6 }]}>
            Con la cessione del quinto puoi finanziare importi maggiori, con rata trattenuta in busta paga o sulla pensione fino a
            120 mesi.
          </Text>
          <Button label="Scopri la cessione del quinto" variant="navy" onPress={() => router.push('/cessione-quinto')} style={{ marginTop: 14 }} />
        </Card>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  hero: { padding: 20, paddingTop: 24, paddingBottom: 26 },
  kpis: { flexDirection: 'row', gap: 12, marginTop: 20 },
  kpi: { flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: radius.md, padding: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.14)' },
  kpiLabel: { fontFamily: fonts.bodyMedium, fontSize: 12, color: 'rgba(255,255,255,0.75)' },
  kpiValue: { fontFamily: fonts.heading, fontSize: 26, color: colors.goldLight, marginTop: 4 },
  amounts: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  amount: {
    width: '47.8%',
    flexGrow: 1,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.line,
  },
  amountValue: { fontFamily: fonts.heading, fontSize: 22, color: colors.ink },
  rateRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
});
