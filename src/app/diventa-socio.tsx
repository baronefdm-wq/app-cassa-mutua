import { ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Card, CheckItem, Eyebrow, SectionTitle, styles as ui } from '../components/ui';
import { contacts, links } from '../data/site';
import { openExternal } from '../lib/navigation';
import { colors, fonts, gradients, radius } from '../theme';

const servizi = [
  { icon: '💼', title: 'Consulenza finanziaria e immobiliare', items: ['Analisi della situazione economica e patrimoniale', 'Supporto per acquisto, vendita e gestione immobiliare', 'Assistenza nelle scelte strategiche e nei progetti futuri'] },
  { icon: '🤝', title: 'Assistenza e supporto', items: ['Convenzioni dedicate ai soci', 'Consulenza, assistenza fiscale', 'Supporto operativo nelle principali esigenze'] },
  { icon: '🎟', title: 'Tempo libero & Convenzioni', items: ['Proposte e opportunità per soci e famiglie', 'Convenzioni con strutture, servizi e partner selezionati', 'Agevolazioni su cultura, benessere e attività sportive'] },
  { icon: '🛡', title: 'Consulenza Assicurativa & Borse di studio', items: ['Consulenza assicurativa per proteggere te e la tua famiglia', 'Soluzioni pensate per chi lavora nella sanità', 'Borse di studio a sostegno del percorso dei figli dei soci'] },
  { icon: '⚖️', title: 'Consulenza legale', items: ['Orientamento legale dedicato ai soci', 'Supporto su questioni personali e familiari', 'Indicazioni chiare e assistenza preliminare'] },
  { icon: '🏛', title: 'Assistenza previdenziale', items: ['Supporto per pratiche pensionistiche e contributive', 'Verifica posizione contributiva e diritti maturati', 'Assistenza nelle principali pratiche previdenziali'] },
];

const steps = [
  { icon: '🖨️', title: '1. Scarica e stampa', text: 'Scarica il modulo di adesione, stampalo e tienilo pronto per la compilazione.' },
  { icon: '✍️', title: '2. Compila il modulo', text: 'Inserisci tutti i campi richiesti in modo chiaro e leggibile.' },
  { icon: '📎', title: '3. Prepara gli allegati', text: 'Ultima busta paga • Documento di riconoscimento • Tessera sanitaria' },
  { icon: '📨', title: '4. Invia la mail', text: `Spedisci modulo e documenti a ${contacts.email} con oggetto “Nuova iscrizione Cassa Mutua”.` },
];

const mailIscrizione = `mailto:${contacts.email}?subject=${encodeURIComponent('Nuova iscrizione Cassa Mutua')}&body=${encodeURIComponent(
  'Buongiorno,\ninvio in allegato il modulo di iscrizione compilato, l’ultima busta paga, il documento di riconoscimento e la tessera sanitaria.\n\nCordiali saluti',
)}`;

export default function DiventaSocio() {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
      <LinearGradient colors={gradients.hero} style={{ padding: 20, paddingTop: 26, paddingBottom: 28 }}>
        <Eyebrow>✅ Sei già socio?</Eyebrow>
        <Text style={[ui.h1, { fontSize: 28, lineHeight: 33, marginTop: 12 }]}>Scarica la tua tessera digitale</Text>
        <Text style={[ui.body, { color: 'rgba(255,255,255,0.85)', marginTop: 10 }]}>
          Se sei già socio puoi registrarti e richiedere la tua tessera digitale direttamente dal telefono.
        </Text>
        <View style={{ gap: 10, marginTop: 18 }}>
          {[
            ['1. Registrati', 'Accedi alla pagina dedicata e completa la registrazione con i tuoi dati.'],
            ['2. Attendi l’attivazione', 'La tessera sarà attiva dopo la verifica e l’abilitazione da parte della Cassa Mutua.'],
            ['3. Salvala nel wallet', 'Quando sarà disponibile con il numero tessera visibile, potrai salvarla sul telefono.'],
          ].map(([t, d]) => (
            <View key={t} style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: radius.md, padding: 14 }}>
              <Text style={{ fontFamily: fonts.title, color: colors.goldLight, fontSize: 15 }}>{t}</Text>
              <Text style={[ui.small, { color: 'rgba(255,255,255,0.85)', marginTop: 4 }]}>{d}</Text>
            </View>
          ))}
        </View>
        <Button label="📲 Apri la tessera digitale" onPress={() => openExternal(links.tesseraDigitale)} style={{ marginTop: 18 }} />
      </LinearGradient>

      <View style={{ padding: 16, paddingTop: 26 }}>
        <SectionTitle title="📄 Iscrizione via e-mail" subtitle="Completa l’iscrizione in 4 semplici passaggi." />
        <View style={{ gap: 10 }}>
          {steps.map((st) => (
            <Card key={st.title} style={{ flexDirection: 'row', gap: 14 }}>
              <Text style={{ fontSize: 26 }}>{st.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={ui.h4}>{st.title}</Text>
                <Text style={[ui.body, { marginTop: 4 }]}>{st.text}</Text>
              </View>
            </Card>
          ))}
        </View>
        <Button label="⬇️ Scarica il modulo" onPress={() => openExternal(links.moduloIscrizione)} style={{ marginTop: 18 }} />
        <Button label="📨 Prepara la mail di iscrizione" variant="navy" onPress={() => openExternal(mailIscrizione)} style={{ marginTop: 10 }} />
      </View>

      <View style={{ padding: 16, paddingTop: 20 }}>
        <SectionTitle title="I servizi riservati ai soci" subtitle="Soluzioni per la vita quotidiana, la gestione delle finanze e il benessere della tua famiglia." />
        <View style={{ gap: 12 }}>
          {servizi.map((sv) => (
            <Card key={sv.title}>
              <Text style={ui.h4}>
                {sv.icon} {sv.title}
              </Text>
              {sv.items.map((it) => (
                <CheckItem key={it}>{it}</CheckItem>
              ))}
            </Card>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
