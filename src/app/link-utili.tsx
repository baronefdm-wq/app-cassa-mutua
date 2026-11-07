import { FlatList, Pressable, Text } from 'react-native';
import { styles as ui } from '../components/ui';
import { usefulLinks } from '../data/site';
import { openExternal } from '../lib/navigation';
import { colors, radius } from '../theme';

export default function LinkUtili() {
  return (
    <FlatList
      data={usefulLinks}
      keyExtractor={(l) => l.url}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      ListHeaderComponent={<Text style={[ui.lead, { marginTop: 0, marginBottom: 6 }]}>Ecco una lista di link utili per i nostri soci.</Text>}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => openExternal(item.url)}
          style={({ pressed }) => ({
            backgroundColor: colors.white,
            borderRadius: radius.sm,
            padding: 16,
            borderWidth: 1,
            borderColor: colors.line,
            flexDirection: 'row',
            justifyContent: 'space-between',
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Text style={ui.h4}>{item.label}</Text>
          <Text style={{ color: colors.blue, fontSize: 18 }}>↗</Text>
        </Pressable>
      )}
    />
  );
}
