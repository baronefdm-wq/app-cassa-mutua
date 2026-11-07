import { ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Button, Card, CheckItem, Eyebrow, styles as ui } from '../components/ui';
import { cessione, contacts, links } from '../data/site';
import { openExternal } from '../lib/navigation';
import { colors, fonts, gradients, radius } from '../theme';

export default function CessioneQuinto() {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
      <LinearGradient colors={gradients.hero} style={{ padding: 20, paddingTop: 26, paddingBottom: 28 }}>
        <Eyebrow>Finanziamento</Eyebrow>
        <Text style={[ui.h1, { fontSize: 30, marginTop: 12 }]}>
          Cessione <Text style={{ color: colors.goldLight }}>del quinto</Text>
        </Text>
        <Text style={[ui.body, { color: 'rgba(255,255,255,0.85)', marginTop: 12 }]}>
          Una soluzione di finanziamento pensata per dipendenti e pensionati, con rata trattenuta direttamente da stipendio o
          pensione e importo massimo pari a un quinto del netto mensile.
        </Text>
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 20 }}>
          {[
            ['1/5', 'importo massimo della rata mensile'],
            ['120', 'mesi di durata massima'],
          ].map(([n, l]) => (
            <View key={n} style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: radius.md, padding: 14 }}>
              <Text style={{ fontFamily: fonts.heading, fontSize: 28, color: colors.goldLight }}>{n}</Text>
              <Text style={[ui.small, { color: 'rgba(255,255,255,0.8)', marginTop: 4 }]}>{l}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>

      <View style={{ padding: 16, gap: 14, paddingTop: 22 }}>
        <Card>
          <Text style={ui.h3}>Documenti richiesti</Text>
          <Text style={[ui.body, { marginTop: 6 }]}>
            Per avviare la valutazione servono pochi documenti di base. In caso di necessità potrà essere richiesta ulteriore
            documentazione integrativa.
          </Text>
          {cessione.documents.map((d) => (
            <CheckItem key={d}>{d}</CheckItem>
          ))}
        </Card>

        <Card style={{ backgroundColor: colors.creamSoft, borderColor: colors.cream }}>
          <Text style={ui.h3}>Vuoi sapere a quanto ammonta la tua rata?</Text>
          <Text style={[ui.body, { marginTop: 6 }]}>
            Compila il modulo e ricevi una simulazione della Cessione del Quinto basata su stipendio o pensione. Ti verranno chiesti
            importo desiderato, numero di rate, data di assunzione e l’ultima busta paga in PDF.
          </Text>
          <Button label="Richiedi valutazione gratuita →" onPress={() => openExternal(`${links.formCessione}#ps-form`)} style={{ marginTop: 16 }} />
        </Card>

        <Card>
          <Text style={ui.h4}>Preferisci parlarne con un consulente?</Text>
          <Text style={[ui.body, { marginTop: 6 }]}>Chiama la segreteria negli orari di apertura o scrivici.</Text>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
            <Button label="📞 Chiama" variant="navy" onPress={() => openExternal(contacts.phoneHref)} style={{ flex: 1 }} />
            <Button label="Contatti" variant="light" onPress={() => router.push('/contatti')} style={{ flex: 1 }} />
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}
