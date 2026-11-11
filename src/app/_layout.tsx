import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { Montserrat_700Bold, Montserrat_800ExtraBold, Montserrat_900Black } from '@expo-google-fonts/montserrat';
import { convenzioni } from '../data/site';
import { FavoritesProvider } from '../lib/favorites';
import { prefetchPages } from '../lib/wp';
import { colors, fonts } from '../theme';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
  });

  useEffect(() => {
    if (loaded || error) void SplashScreen.hideAsync();
  }, [loaded, error]);

  // Scarica in background le pagine delle convenzioni per renderle disponibili offline.
  useEffect(() => {
    const t = setTimeout(() => {
      void prefetchPages(convenzioni.filter((c) => !c.route).map((c) => c.slug));
    }, 4000);
    return () => clearTimeout(t);
  }, []);

  if (!loaded && !error) return null;

  return (
    <FavoritesProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.navyHeader },
          headerTintColor: colors.white,
          headerTitleStyle: { fontFamily: fonts.headingBold, fontSize: 17 },
          headerBackButtonDisplayMode: 'minimal',
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false, title: 'Home' }} />
        <Stack.Screen name="area/[id]" options={{ title: '' }} />
        <Stack.Screen name="convenzione/[slug]" options={{ title: 'Convenzione' }} />
        <Stack.Screen name="news/[id]" options={{ title: 'News' }} />
        <Stack.Screen name="pagina/[slug]" options={{ title: '' }} />
        <Stack.Screen name="chi-siamo" options={{ title: 'Chi siamo' }} />
        <Stack.Screen name="diventa-socio" options={{ title: 'Diventa socio' }} />
        <Stack.Screen name="cessione-quinto" options={{ title: 'Cessione del quinto' }} />
        <Stack.Screen name="link-utili" options={{ title: 'Link utili' }} />
        <Stack.Screen name="tessera" options={{ title: 'La mia tessera' }} />
        <Stack.Screen name="preferiti" options={{ title: 'Preferiti' }} />
      </Stack>
    </FavoritesProvider>
  );
}
