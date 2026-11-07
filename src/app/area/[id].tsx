import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { ConvenzioneRow } from '../../components/ConvenzioneRow';
import { Button, Card, Pill, styles as ui } from '../../components/ui';
import { areas, convenzioni } from '../../data/site';
import { colors } from '../../theme';

export default function AreaScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const area = areas.find((a) => a.id === id);
  if (!area) return null;
  const items = convenzioni.filter((c) => c.area === area.id);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
      <Stack.Screen options={{ title: area.label }} />
      <View style={s.hero}>
        <Image source={{ uri: area.image }} style={StyleSheet.absoluteFill} contentFit="cover" />
        <LinearGradient colors={['rgba(7,26,51,0.45)', 'rgba(7,26,51,0.95)']} style={StyleSheet.absoluteFill} />
        <View style={{ padding: 20, gap: 10 }}>
          <Pill dark>{area.label}</Pill>
          <Text style={[ui.h1, { fontSize: 28, lineHeight: 33 }]}>{area.title}</Text>
          <Text style={[ui.body, { color: 'rgba(255,255,255,0.88)' }]}>{area.intro}</Text>
        </View>
      </View>
      <View style={{ padding: 16, gap: 12 }}>
        {items.map((c) => (
          <ConvenzioneRow key={c.slug} item={c} />
        ))}
        <Card style={{ marginTop: 10, backgroundColor: colors.ice, borderColor: colors.blueSoft }}>
          <Text style={ui.h4}>Hai bisogno di informazioni?</Text>
          <Text style={[ui.body, { marginTop: 6 }]}>
            Per accedere alle agevolazioni è necessario essere Soci ed esibire la tessera associativa. Per dubbi contatta la
            segreteria.
          </Text>
          <Button label="Contatta la segreteria" variant="navy" onPress={() => router.push('/contatti')} style={{ marginTop: 14 }} />
        </Card>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  hero: { minHeight: 240, justifyContent: 'flex-end', backgroundColor: colors.navy, overflow: 'hidden' },
});
