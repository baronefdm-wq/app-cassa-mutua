import { useLocalSearchParams } from 'expo-router';
import { WpPageScreen } from '../../components/WpPageScreen';

export default function ConvenzioneScreen() {
  const { slug, name } = useLocalSearchParams<{ slug: string; name?: string }>();
  return <WpPageScreen slug={slug} fallbackTitle={name ?? 'Convenzione'} />;
}
