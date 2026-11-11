import AsyncStorage from '@react-native-async-storage/async-storage';

/** Piccolo wrapper JSON sopra AsyncStorage: gli errori di lettura/scrittura non bloccano mai l'app. */
export async function readJson<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export async function writeJson(key: string, value: unknown): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // spazio esaurito o storage non disponibile: la copia offline è solo un bonus
  }
}

export async function removeKey(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    // ignorato
  }
}

type Cached<T> = { savedAt: number; data: T };

export type Fresh<T> = { data: T; savedAt?: number };

/**
 * Prova a scaricare i dati; se riesce li salva per l'uso offline.
 * Se la rete non è disponibile restituisce l'ultima copia salvata (con la data di salvataggio).
 */
export async function withOfflineCache<T>(key: string, fetcher: () => Promise<T>): Promise<Fresh<T>> {
  try {
    const data = await fetcher();
    void writeJson(`cache:${key}`, { savedAt: Date.now(), data } satisfies Cached<T>);
    return { data };
  } catch (err) {
    const cached = await readJson<Cached<T>>(`cache:${key}`);
    if (cached) return { data: cached.data, savedAt: cached.savedAt };
    throw err;
  }
}
