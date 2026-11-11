import { FlatList, Text, View } from 'react-native';
import { router } from 'expo-router';
import { ConvenzioneRow } from '../components/ConvenzioneRow';
import { Button, Card, styles as ui } from '../components/ui';
import { convenzioni } from '../data/site';
import { useFavorites } from '../lib/favorites';

export default function Preferiti() {
  const { favorites } = useFavorites();
  const items = convenzioni.filter((c) => favorites.includes(c.slug));

  return (
    <FlatList
      data={items}
      keyExtractor={(c) => c.slug}
      contentContainerStyle={{ padding: 16, gap: 12 }}
      ListHeaderComponent={
        items.length ? <Text style={[ui.lead, { marginTop: 0 }]}>Le convenzioni che hai salvato, sempre a portata di mano.</Text> : undefined
      }
      ListEmptyComponent={
        <Card style={{ alignItems: 'center', gap: 10, paddingVertical: 28 }}>
          <Text style={{ fontSize: 40 }}>🤍</Text>
          <Text style={[ui.h4, { textAlign: 'center' }]}>Nessun preferito</Text>
          <Text style={[ui.body, { textAlign: 'center' }]}>
            Tocca il cuore accanto a una convenzione per salvarla qui.
          </Text>
          <View style={{ alignSelf: 'stretch', marginTop: 6 }}>
            <Button label="Sfoglia le convenzioni" variant="navy" onPress={() => router.push('/servizi')} />
          </View>
        </Card>
      }
      renderItem={({ item }) => <ConvenzioneRow item={item} />}
    />
  );
}
