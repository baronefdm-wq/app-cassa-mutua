import { useEffect, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Card, CheckItem, Eyebrow, styles as ui } from '../components/ui';
import { links } from '../data/site';
import { openExternal } from '../lib/navigation';
import { deleteTessera, loadTessera, pickTessera, type TesseraFoto } from '../lib/tessera';
import { formatSavedAt } from '../lib/wp';
import { colors, gradients, radius } from '../theme';

export default function Tessera() {
  const [foto, setFoto] = useState<TesseraFoto | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void loadTessera().then((f) => {
      setFoto(f);
      setReady(true);
    });
  }, []);

  const pick = async (source: 'camera' | 'library') => {
    try {
      const f = await pickTessera(source, foto);
      if (f) setFoto(f);
    } catch (e) {
      Alert.alert(
        'Permesso necessario',
        e instanceof Error && e.message === 'camera-permission'
          ? 'Per fotografare la tessera consenti l’accesso alla fotocamera nelle impostazioni del telefono.'
          : 'Non è stato possibile salvare l’immagine. Riprova.',
      );
    }
  };

  const remove = () => {
    const doRemove = async () => {
      await deleteTessera(foto);
      setFoto(null);
    };
    if (Platform.OS === 'web') return void doRemove();
    Alert.alert('Eliminare la foto della tessera?', 'Potrai salvarne una nuova in qualsiasi momento.', [
      { text: 'Annulla', style: 'cancel' },
      { text: 'Elimina', style: 'destructive', onPress: () => void doRemove() },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
      <LinearGradient colors={gradients.hero} style={{ padding: 20, paddingTop: 24, paddingBottom: 26 }}>
        <Eyebrow>Sempre con te</Eyebrow>
        <Text style={[ui.h1, { fontSize: 28, marginTop: 10 }]}>La mia tessera</Text>
        <Text style={[ui.body, { color: 'rgba(255,255,255,0.85)', marginTop: 10 }]}>
          Mostra la tessera associativa presso le strutture convenzionate, anche senza connessione internet.
        </Text>
      </LinearGradient>

      <View style={{ padding: 16, gap: 14 }}>
        {ready && foto ? (
          <Card style={{ padding: 12 }}>
            <Image
              source={{ uri: foto.uri }}
              style={s.card}
              contentFit="contain"
              accessibilityLabel="Foto della tua tessera associativa"
              accessibilityIgnoresInvertColors
            />
            <Text style={[ui.small, { textAlign: 'center', marginTop: 8 }]}>Salvata il {formatSavedAt(foto.savedAt)}</Text>
          </Card>
        ) : ready ? (
          <Card style={{ alignItems: 'center', gap: 8, paddingVertical: 28 }}>
            <Text style={{ fontSize: 44 }}>🪪</Text>
            <Text style={[ui.h4, { textAlign: 'center' }]}>Nessuna tessera salvata</Text>
            <Text style={[ui.body, { textAlign: 'center' }]}>
              Fotografa la tua tessera (o salva uno screenshot della tessera digitale) per averla sempre a portata di mano.
            </Text>
          </Card>
        ) : null}

        <Button label={foto ? '📷 Scatta una nuova foto' : '📷 Fotografa la tessera'} onPress={() => pick('camera')} />
        <Button label="🖼️ Scegli dalla galleria" variant="navy" onPress={() => pick('library')} />
        {foto ? <Button label="Elimina foto" variant="light" onPress={remove} /> : null}

        <Card style={{ marginTop: 6 }}>
          <Text style={ui.h4}>📲 Tessera digitale ufficiale</Text>
          <Text style={[ui.body, { marginTop: 6 }]}>
            Se sei già socio puoi richiedere la tessera digitale ufficiale e salvarla nel wallet del telefono.
          </Text>
          <Button label="Apri la tessera digitale" variant="light" onPress={() => openExternal(links.tesseraDigitale)} style={{ marginTop: 14 }} />
        </Card>

        <Card style={{ backgroundColor: colors.ice, borderColor: colors.blueSoft }}>
          <Text style={ui.h4}>🔒 Privacy</Text>
          <CheckItem>La foto resta solo sul tuo telefono: non viene inviata a nessuno.</CheckItem>
          <CheckItem>Puoi eliminarla in qualsiasi momento da questa pagina.</CheckItem>
        </Card>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  card: { width: '100%', aspectRatio: 1.6, borderRadius: radius.sm, backgroundColor: colors.bg },
});
