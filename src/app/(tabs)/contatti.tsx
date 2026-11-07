import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Accordion, Button, Card, Eyebrow, SectionTitle, styles as ui } from '../../components/ui';
import { contactFaq, contacts, contactTopics, links } from '../../data/site';
import { openExternal } from '../../lib/navigation';
import { colors, fonts, gradients, radius } from '../../theme';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contatti() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [privacy, setPrivacy] = useState(false);

  const send = async () => {
    const missing: string[] = [];
    if (!name.trim()) missing.push('Nome e cognome');
    if (!EMAIL_RE.test(email.trim())) missing.push('Email valida');
    if (phone.replace(/\D/g, '').length < 6) missing.push('Telefono');
    if (!message.trim()) missing.push('Messaggio');
    if (!privacy) missing.push('Accettazione informativa privacy');
    if (missing.length) {
      Alert.alert('Completa il modulo', `Mancano: ${missing.join(', ')}.`);
      return;
    }
    const subject = `Richiesta dall'app${topic ? ` – ${topic}` : ''}`;
    const body = [
      `Nome e cognome: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Telefono: ${phone.trim()}`,
      `Motivo della richiesta: ${topic ?? 'Non specificato'}`,
      '',
      message.trim(),
    ].join('\n');
    const url = `mailto:${contacts.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    try {
      await openExternal(url);
    } catch {
      Alert.alert('Nessuna app email', `Scrivi direttamente a ${contacts.email} oppure chiama il ${contacts.phone}.`);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={90}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        <LinearGradient colors={gradients.hero} style={s.hero}>
          <Eyebrow>Contatti</Eyebrow>
          <Text style={[ui.h1, { fontSize: 30, marginTop: 10 }]}>Siamo qui per aiutarti</Text>
          <Text style={[ui.body, { color: 'rgba(255,255,255,0.85)', marginTop: 10 }]}>
            Per informazioni, assistenza, iscrizioni, tessera digitale, servizi e convenzioni puoi contattare la segreteria.
          </Text>
          <View style={{ flexDirection: 'row', gap: 10, marginTop: 18 }}>
            <Button label="📞 Chiama" onPress={() => openExternal(contacts.phoneHref)} style={{ flex: 1 }} />
            <Button label="✉️ Email" variant="outline" onPress={() => openExternal(`mailto:${contacts.email}`)} style={{ flex: 1 }} />
          </View>
        </LinearGradient>

        <View style={{ padding: 16, gap: 14, paddingTop: 22 }}>
          <Card>
            <Text style={ui.h3}>☎️ Recapiti</Text>
            <Text style={[ui.small, { marginBottom: 6 }]}>Contatti ufficiali della segreteria.</Text>
            {[
              ['📞', 'Telefono', contacts.phone, contacts.phoneHref],
              ['✉️', 'Email', contacts.email, `mailto:${contacts.email}`],
              ['🔒', 'PEC', contacts.pec, `mailto:${contacts.pec}`],
            ].map(([icon, label, value, href]) => (
              <Pressable key={label} onPress={() => openExternal(href)} style={s.contactRow}>
                <Text style={{ fontSize: 20 }}>{icon}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={ui.small}>{label}</Text>
                  <Text style={[ui.h4, { color: colors.blue }]}>{value}</Text>
                </View>
              </Pressable>
            ))}
          </Card>

          <Card>
            <Text style={ui.h3}>📍 Le nostre sedi</Text>
            <Text style={[ui.small, { marginBottom: 6 }]}>Due punti di riferimento per i Soci.</Text>
            {contacts.offices.map((o) => (
              <View key={o.name} style={s.office}>
                <Text style={ui.h4}>{o.name}</Text>
                <Text style={ui.body}>
                  {o.address}
                  {'\n'}
                  {o.city}
                </Text>
                <Button label="Apri mappa" variant="light" onPress={() => openExternal(o.map)} style={{ marginTop: 10 }} />
              </View>
            ))}
          </Card>

          <Card>
            <Text style={ui.h3}>🕒 Orari di assistenza</Text>
            {contacts.hours.map((h) => (
              <View key={h.day} style={s.hourRow}>
                <Text style={ui.h4}>{h.day}</Text>
                <Text style={[ui.body, { textAlign: 'right', flexShrink: 1 }, h.time === 'Chiuso' && { color: '#B42318' }]}>{h.time}</Text>
              </View>
            ))}
          </Card>

          <Card>
            <Text style={ui.h3}>✉️ Scrivici qui</Text>
            <Text style={[ui.small, { marginTop: 4 }]}>
              Nome e cognome, telefono ed email sono obbligatori. Il messaggio verrà preparato nella tua app email, pronto da inviare.
            </Text>
            <Field label="Nome e cognome *" value={name} onChangeText={setName} placeholder="Es. Nome Cognome" autoComplete="name" />
            <Field label="Email *" value={email} onChangeText={setEmail} placeholder="nome@email.it" keyboardType="email-address" autoComplete="email" />
            <Field label="Telefono *" value={phone} onChangeText={setPhone} placeholder="Es. 333 1234567" keyboardType="phone-pad" autoComplete="tel" />
            <Text style={s.label}>Motivo della richiesta</Text>
            <View style={s.topics}>
              {contactTopics.map((t) => (
                <Pressable key={t} onPress={() => setTopic(t === topic ? null : t)} style={[s.topic, t === topic && s.topicActive]}>
                  <Text style={[s.topicText, t === topic && { color: colors.white }]}>{t}</Text>
                </Pressable>
              ))}
            </View>
            <Field label="Messaggio *" value={message} onChangeText={setMessage} placeholder="Scrivi qui la tua richiesta" multiline />
            <View style={s.privacy}>
              <Switch value={privacy} onValueChange={setPrivacy} trackColor={{ true: colors.navy, false: '#CBD5E1' }} />
              <Text style={[ui.small, { flex: 1 }]}>
                Ho letto e accetto l’
                <Text style={{ color: colors.blue }} onPress={() => openExternal(links.privacy)}>
                  informativa privacy
                </Text>
                .
              </Text>
            </View>
            <Button label="Invia richiesta" onPress={send} style={{ marginTop: 16 }} />
          </Card>

          <SectionTitle title="💬 Domande frequenti" subtitle="Risposte rapide per orientarsi meglio." />
          <Accordion items={contactFaq} />

          <Card style={{ backgroundColor: colors.ice, borderColor: colors.blueSoft }}>
            <Text style={ui.h4}>Trasparenza e tutela</Text>
            <Text style={[ui.body, { marginTop: 6 }]}>
              I dati inviati tramite questa pagina vengono utilizzati esclusivamente per gestire la richiesta e fornire assistenza.
            </Text>
          </Card>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field(props: React.ComponentProps<typeof TextInput> & { label: string }) {
  const { label, multiline, style, ...rest } = props;
  return (
    <View>
      <Text style={s.label}>{label}</Text>
      <TextInput
        {...rest}
        multiline={multiline}
        placeholderTextColor="#94A3B8"
        style={[s.input, multiline && { minHeight: 120, textAlignVertical: 'top', paddingTop: 14 }, style]}
      />
    </View>
  );
}

const s = StyleSheet.create({
  hero: { padding: 20, paddingTop: 24, paddingBottom: 26 },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 12, borderTopWidth: 1, borderTopColor: colors.line },
  office: { paddingVertical: 14, borderTopWidth: 1, borderTopColor: colors.line, gap: 4 },
  hourRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, paddingVertical: 12, borderTopWidth: 1, borderTopColor: colors.line, marginTop: 4 },
  label: { fontFamily: fonts.bodySemi, fontSize: 13, color: colors.ink, marginBottom: 6, marginTop: 14 },
  input: {
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.bg,
    borderRadius: radius.sm,
    paddingHorizontal: 14,
    minHeight: 50,
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.ink,
  },
  topics: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  topic: { borderWidth: 1, borderColor: colors.line, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: colors.white },
  topicActive: { backgroundColor: colors.navy, borderColor: colors.navy },
  topicText: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.ink },
  privacy: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 18 },
});
