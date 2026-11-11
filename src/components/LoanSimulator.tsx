import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Card, styles as ui } from './ui';
import { durationsFor, formatEuro, LOAN, simulate } from '../lib/loan';
import { colors, fonts, radius } from '../theme';

function Stepper({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const dec = () => onChange(Math.max(LOAN.min, value - LOAN.step));
  const inc = () => onChange(Math.min(LOAN.max, value + LOAN.step));
  return (
    <View style={s.stepper} accessibilityRole="adjustable" accessibilityLabel="Importo del prestito" accessibilityValue={{ text: formatEuro(value, 0) }}
      accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
      onAccessibilityAction={(e) => (e.nativeEvent.actionName === 'increment' ? inc() : dec())}
    >
      <Pressable onPress={dec} disabled={value <= LOAN.min} style={[s.stepBtn, value <= LOAN.min && { opacity: 0.35 }]} accessibilityLabel="Diminuisci importo">
        <Text style={s.stepBtnText}>−</Text>
      </Pressable>
      <Text style={s.stepValue}>{formatEuro(value, 0)}</Text>
      <Pressable onPress={inc} disabled={value >= LOAN.max} style={[s.stepBtn, value >= LOAN.max && { opacity: 0.35 }]} accessibilityLabel="Aumenta importo">
        <Text style={s.stepBtnText}>+</Text>
      </Pressable>
    </View>
  );
}

/** Simulatore della rata del prestito a tasso sociale. */
export function LoanSimulator() {
  const [amount, setAmount] = useState(3000);
  const [months, setMonths] = useState(24);
  const durations = durationsFor(amount);
  const m = durations.includes(months) ? months : durations[durations.length - 1];
  const r = simulate(amount, m);

  const changeAmount = (v: number) => {
    setAmount(v);
    const ds = durationsFor(v);
    if (!ds.includes(months)) setMonths(ds[ds.length - 1]);
  };

  return (
    <Card style={{ padding: 20 }}>
      <Text style={ui.h3}>🧮 Simula la tua rata</Text>
      <Text style={[ui.small, { marginTop: 4 }]}>Scegli importo e durata: il calcolo si aggiorna subito.</Text>

      <Text style={s.label}>Importo</Text>
      <Stepper value={amount} onChange={changeAmount} />

      <Text style={s.label}>Durata</Text>
      <View style={s.chips}>
        {durations.map((d) => (
          <Pressable
            key={d}
            onPress={() => setMonths(d)}
            style={[s.chip, d === m && s.chipActive]}
            accessibilityRole="button"
            accessibilityState={{ selected: d === m }}
          >
            <Text style={[s.chipText, d === m && { color: colors.white }]}>{d} mesi</Text>
          </Pressable>
        ))}
      </View>

      <View style={s.result} accessibilityLiveRegion="polite">
        <Text style={[ui.small, { color: 'rgba(255,255,255,0.75)' }]}>Rata mensile</Text>
        <Text style={s.rate}>{formatEuro(r.rate)}</Text>
        <View style={s.rows}>
          {[
            ['Totale rate', formatEuro(r.totalRates)],
            ['di cui interessi (TAN 5%)', formatEuro(r.interest)],
            ['Spese di istruttoria', formatEuro(r.fee)],
            ['Costo complessivo', formatEuro(r.totalCost)],
          ].map(([k, v], i) => (
            <View key={k} style={[s.row, i === 3 && { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.18)', paddingTop: 10, marginTop: 4 }]}>
              <Text style={s.rowKey}>{k}</Text>
              <Text style={[s.rowVal, i === 3 && { color: colors.goldLight }]}>{v}</Text>
            </View>
          ))}
        </View>
      </View>
      <Text style={[ui.small, { marginTop: 10 }]}>
        Calcolo indicativo con ammortamento a rata costante e TAN fisso 5%. Le condizioni definitive sono comunicate dalla Cassa
        Mutua dopo la valutazione della richiesta.
      </Text>
    </Card>
  );
}

const s = StyleSheet.create({
  label: { fontFamily: fonts.bodySemi, fontSize: 13, color: colors.ink, marginTop: 18, marginBottom: 8 },
  stepper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.ice, borderRadius: radius.md, padding: 8 },
  stepBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.navy, alignItems: 'center', justifyContent: 'center' },
  stepBtnText: { color: colors.white, fontSize: 26, fontFamily: fonts.title, marginTop: -2 },
  stepValue: { fontFamily: fonts.heading, fontSize: 26, color: colors.ink },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderWidth: 1, borderColor: colors.line, borderRadius: 999, paddingHorizontal: 14, paddingVertical: 9, backgroundColor: colors.white },
  chipActive: { backgroundColor: colors.navy, borderColor: colors.navy },
  chipText: { fontFamily: fonts.bodySemi, fontSize: 13, color: colors.ink },
  result: { marginTop: 20, backgroundColor: colors.navy, borderRadius: radius.md, padding: 18 },
  rate: { fontFamily: fonts.heading, fontSize: 34, color: colors.goldLight, marginTop: 2 },
  rows: { marginTop: 12, gap: 6 },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  rowKey: { fontFamily: fonts.body, fontSize: 13.5, color: 'rgba(255,255,255,0.8)', flexShrink: 1 },
  rowVal: { fontFamily: fonts.bodySemi, fontSize: 14, color: colors.white },
});
