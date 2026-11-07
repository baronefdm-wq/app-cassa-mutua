import { useLocalSearchParams } from 'expo-router';
import { WpPageScreen } from '../../components/WpPageScreen';

/** Qualsiasi altra pagina del sito non ancora riprodotta in modo nativo. */
export default function GenericPage() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  return <WpPageScreen slug={slug} />;
}
