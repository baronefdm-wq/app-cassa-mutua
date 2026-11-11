import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { File, Paths } from 'expo-file-system';
import { readJson, removeKey, writeJson } from './storage';

const KEY = 'tessera:foto';

export type TesseraFoto = { uri: string; savedAt: number };

export function loadTessera(): Promise<TesseraFoto | null> {
  return readJson<TesseraFoto>(KEY);
}

/** Copia l'immagine scelta nella memoria privata dell'app, così resta disponibile anche se viene cancellata dalla galleria. */
async function persist(uri: string): Promise<string> {
  if (Platform.OS === 'web') return uri;
  const dest = new File(Paths.document, `tessera-${Date.now()}.jpg`);
  await new File(uri).copy(dest);
  return dest.uri;
}

async function removeFile(uri?: string) {
  if (!uri || Platform.OS === 'web') return;
  try {
    const f = new File(uri);
    if (f.exists) f.delete();
  } catch {
    // ignorato
  }
}

/** Fa scegliere o scattare una foto della tessera. Restituisce null se l'utente annulla. */
export async function pickTessera(source: 'camera' | 'library', previous?: TesseraFoto | null): Promise<TesseraFoto | null> {
  const options: ImagePicker.ImagePickerOptions = { mediaTypes: ['images'], allowsEditing: true, aspect: [16, 10], quality: 0.9 };
  let result: ImagePicker.ImagePickerResult;
  if (source === 'camera') {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) throw new Error('camera-permission');
    result = await ImagePicker.launchCameraAsync(options);
  } else {
    result = await ImagePicker.launchImageLibraryAsync(options);
  }
  if (result.canceled || !result.assets?.[0]) return null;
  const uri = await persist(result.assets[0].uri);
  const foto = { uri, savedAt: Date.now() };
  await writeJson(KEY, foto);
  if (previous && previous.uri !== uri) await removeFile(previous.uri);
  return foto;
}

export async function deleteTessera(current?: TesseraFoto | null) {
  await removeFile(current?.uri);
  await removeKey(KEY);
}
