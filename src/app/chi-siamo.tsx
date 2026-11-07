import { ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Button, Card, CheckItem, Eyebrow, styles as ui } from '../components/ui';
import { colors, gradients, radius } from '../theme';

const sections: { icon: string; title: string; intro: string; items?: string[]; outro?: string }[] = [
  {
    icon: '📘',
    title: 'Una storia di fiducia che nasce in corsia',
    intro:
      'Cassa Mutua Sanità Regione Lazio nasce nel 1950 come Cooperativa di Mutuo Soccorso, fondata dal personale del disciolto Ente Ospedaliero Pio Istituto di S. Spirito e OO.RR. di Roma, che comprendeva gli ospedali: S. Spirito, S. Eugenio, S. Camillo, S. Filippo, S. Giacomo, S. Giovanni, Policlinico Umberto I. Fin dall’inizio l’obiettivo è stato chiaro: costruire una rete di sostegno reciproco tra colleghi. I Soci Fondatori si impegnavano a:',
    items: [
      'concedere prestiti a un tasso sociale, più accessibili rispetto al mercato;',
      'sostenere i soci in caso di premorienza del socio o dei familiari;',
      'offrire assegni e borse di studio ai soci e ai loro figli al conseguimento del titolo di studio;',
      'promuovere l’uso del tempo libero in attività culturali, turistiche, ricreative e artistiche.',
    ],
  },
  {
    icon: '💼',
    title: 'Servizi finanziari pensati per chi si prende cura degli altri',
    intro: 'Oggi Cassa Mutua Sanità Regione Lazio è una cooperativa di credito che mette al centro la persona, offrendo ai soci:',
    items: [
      'Prestiti a tasso sociale, costruiti per essere sostenibili nel tempo;',
      'Mutui e soluzioni di finanziamento per progetti importanti di vita e famiglia;',
      'Coperture assicurative studiate per tutelare patrimonio, salute e serenità;',
      'Gestione del patrimonio con uno sguardo attento al futuro.',
    ],
    outro:
      'La Cassa è iscritta all’elenco dei soggetti operanti nel settore finanziario, tenuto dal Ministro del Tesoro, come prescritto dall’art. 106 D.lg. 1.9.93 n.385 (Testo Unico bancario), e può svolgere in modo legale, trasparente e controllato l’esercizio del credito nei confronti dei propri soci.',
  },
  {
    icon: '🏛️',
    title: 'Una governance solida e controllata',
    intro:
      'La Cassa è governata da un Consiglio di Amministrazione (CdA) eletto a scadenza triennale dai soci e sottoposto al controllo di un Collegio Sindacale, i cui componenti sono iscritti all’albo dei revisori ufficiali dei conti. La struttura comprende:',
    items: [
      'Assemblea dei Soci;',
      'Consiglio di Amministrazione eletto dall’Assemblea dei Soci;',
      'Collegio Sindacale e Revisore Legale eletti dall’Assemblea dei Soci;',
      'Personale Amministrativo dedicato all’assistenza del socio;',
      'Collaboratori interni ed esterni per progetti specifici e servizi specialistici.',
    ],
  },
  {
    icon: '🎯',
    title: 'Missione e obiettivi per il futuro dei soci',
    intro:
      'La missione della Cassa è offrire soluzioni personalizzate e convenienti, accompagnando il socio nelle decisioni economiche più importanti e garantendo stabilità e sicurezza finanziaria. Tra gli obiettivi principali:',
    items: [
      'creare un fondo di risparmio che il socio può percepire al momento della quiescenza o in caso di dismissione della quota sociale;',
      'riconoscere contributi economici al socio e ai figli del socio al conseguimento di titoli di studio, come la laurea magistrale.',
    ],
  },
  {
    icon: '🤝',
    title: 'Convenzioni esclusive e presenza costante accanto al socio',
    intro:
      'Cassa Mutua Sanità Regione Lazio lavora ogni giorno per attivare convenzioni mirate che trasformano la quota sociale in vantaggi concreti. Diventare socio significa entrare in una comunità solidale che ti sostiene, ti ascolta e si impegna a offrirti strumenti concreti per vivere con maggiore serenità il presente e costruire con fiducia il tuo futuro.',
  },
];

export default function ChiSiamo() {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
      <LinearGradient colors={gradients.hero} style={{ padding: 20, paddingTop: 26, paddingBottom: 28 }}>
        <Eyebrow>La forza di una cooperativa storica</Eyebrow>
        <Text style={[ui.h1, { fontSize: 30, lineHeight: 35, marginTop: 12 }]}>Cassa Mutua Sanità Regione Lazio</Text>
        <Text style={[ui.body, { color: 'rgba(255,255,255,0.85)', marginTop: 12 }]}>
          Un punto di riferimento per il personale sanitario e i soci del Lazio: tutela, credito responsabile e vantaggi concreti,
          dal 1950.
        </Text>
      </LinearGradient>
      <View style={{ padding: 16, gap: 14 }}>
        {sections.map((sec) => (
          <Card key={sec.title}>
            <View style={{ width: 46, height: 46, borderRadius: radius.sm, backgroundColor: colors.ice, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 22 }}>{sec.icon}</Text>
            </View>
            <Text style={[ui.h3, { marginTop: 12 }]}>{sec.title}</Text>
            <Text style={[ui.body, { marginTop: 8 }]}>{sec.intro}</Text>
            {sec.items?.map((it) => (
              <CheckItem key={it}>{it}</CheckItem>
            ))}
            {sec.outro ? <Text style={[ui.body, { marginTop: 12 }]}>{sec.outro}</Text> : null}
          </Card>
        ))}
        <Button label="Diventa Socio" onPress={() => router.push('/diventa-socio')} style={{ marginTop: 8 }} />
      </View>
    </ScrollView>
  );
}
