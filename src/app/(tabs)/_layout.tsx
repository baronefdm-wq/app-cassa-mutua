import { Tabs } from 'expo-router/js-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { type ColorValue, Platform } from 'react-native';
import { colors, fonts } from '../../theme';

type IconName = keyof typeof Ionicons.glyphMap;

function icon(name: IconName, active: IconName) {
  function TabIcon({ color, focused, size }: { color: ColorValue; focused: boolean; size: number }) {
    return <Ionicons name={focused ? active : name} color={color as string} size={size} />;
  }
  return TabIcon;
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.navyHeader },
        headerTintColor: colors.white,
        headerTitleStyle: { fontFamily: fonts.headingBold, fontSize: 17 },
        tabBarActiveTintColor: colors.navy,
        tabBarInactiveTintColor: '#8796A8',
        tabBarLabelStyle: { fontFamily: fonts.bodySemi, fontSize: 11, lineHeight: 14 },
        tabBarStyle: { backgroundColor: colors.white, borderTopColor: colors.line, ...(Platform.OS === 'web' ? { height: 62, paddingBottom: 6 } : null) },
        sceneStyle: { backgroundColor: colors.bg },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', headerShown: false, tabBarIcon: icon('home-outline', 'home') }} />
      <Tabs.Screen name="servizi" options={{ title: 'Servizi', tabBarIcon: icon('grid-outline', 'grid') }} />
      <Tabs.Screen name="prestiti" options={{ title: 'Prestiti', tabBarIcon: icon('wallet-outline', 'wallet') }} />
      <Tabs.Screen name="news" options={{ title: 'News', tabBarIcon: icon('newspaper-outline', 'newspaper') }} />
      <Tabs.Screen name="contatti" options={{ title: 'Contatti', tabBarIcon: icon('call-outline', 'call') }} />
    </Tabs>
  );
}
