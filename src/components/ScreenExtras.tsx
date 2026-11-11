import { Pressable, Share, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { formatSavedAt } from '../lib/wp';
import { colors, fonts } from '../theme';

/** Pulsante "Condividi" per la barra in alto. */
export function ShareButton({ title, url }: { title: string; url: string }) {
  const share = () => {
    void Share.share({ title, message: `${title}\n${url}`, url }).catch(() => {});
  };
  return (
    <Pressable onPress={share} hitSlop={10} accessibilityRole="button" accessibilityLabel={`Condividi ${title}`}>
      <Ionicons name="share-outline" size={22} color={colors.white} />
    </Pressable>
  );
}

/** Avviso mostrato quando i contenuti arrivano dalla copia salvata perché manca la connessione. */
export function OfflineBanner({ savedAt, onRetry }: { savedAt: number; onRetry?: () => void }) {
  return (
    <View style={s.banner} accessibilityRole="alert">
      <Ionicons name="cloud-offline-outline" size={18} color="#8A5A00" />
      <Text style={s.text}>Sei offline: stai vedendo la copia salvata il {formatSavedAt(savedAt)}.</Text>
      {onRetry ? (
        <Pressable onPress={onRetry} hitSlop={8} accessibilityRole="button" accessibilityLabel="Riprova a caricare">
          <Text style={s.retry}>Riprova</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const s = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.creamSoft,
    borderBottomWidth: 1,
    borderBottomColor: colors.cream,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  text: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 12.5, color: '#6B4A00' },
  retry: { fontFamily: fonts.bodyBold, fontSize: 13, color: colors.navy },
});
