# App Cassa Mutua Lazio

App mobile (iOS e Android) della **Cassa Mutua Sanità Regione Lazio**, che porta su smartphone i contenuti e i servizi di [cassamutualazio.it](https://cassamutualazio.it) con lo stesso stile grafico.

Realizzata con [Expo](https://expo.dev) (React Native, SDK 58) ed Expo Router.

## Cosa contiene

| Sezione | Contenuto | Origine dei dati |
| --- | --- | --- |
| **Home** | Hero, azioni rapide (la mia tessera, preferiti, prestiti, chiama), i tuoi preferiti, aree dedicate, cessione del quinto, prestiti, testimonianze, FAQ | Testi del sito, inseriti nell'app |
| **Servizi** | Ricerca e catalogo di tutte le convenzioni divise per area (Salute, Benessere, Assicurazioni, Tempo libero, Fisco e Legale, Casa e Finanza) | Elenco nell'app + **pagina di dettaglio caricata in tempo reale dal sito** |
| **Prestiti** | Tabella interattiva delle rate (TAN 5%, € 2.000–5.000), **simulatore** (importo a passi di € 500, durata, interessi e costo totale), documenti, richiesta | Calcolo nell'app (riproduce esattamente la tabella del sito), modulo del sito |
| **News** | Tutti gli articoli del sito, con immagini, **ricerca** e scorrimento infinito | **In tempo reale** (WordPress REST API) |
| **Contatti** | Recapiti, sedi con mappe, orari, modulo di contatto (prepara una email alla segreteria), FAQ | Testi del sito |
| **La mia tessera** | Foto della tessera associativa salvata sul telefono, visibile anche offline | Solo sul dispositivo |
| **Preferiti** | Convenzioni salvate con il cuore | Solo sul dispositivo |
| Altre pagine | Chi siamo, Diventa socio (tessera digitale, modulo d'iscrizione, mail precompilata), Cessione del quinto, Link utili | Testi del sito |

Le pagine delle convenzioni e le news si aggiornano da sole quando vengono modificate su WordPress, senza dover pubblicare una nuova versione dell'app.

**Funzionamento offline:** all'avvio l'app scarica in background (una volta al giorno) tutte le pagine delle convenzioni; anche le news e gli articoli letti vengono salvati. Senza connessione l'app mostra l'ultima copia, con un avviso e la data di aggiornamento.

**Condivisione:** ogni convenzione e ogni news ha il pulsante "Condividi" (WhatsApp, email, ecc.).

## Struttura del codice

```
src/
  app/                 schermate (Expo Router: ogni file è una pagina)
    (tabs)/            le 5 sezioni della barra in basso
    area/[id].tsx      elenco convenzioni di un'area
    convenzione/[slug] dettaglio convenzione (contenuto live dal sito)
    news/[id].tsx      articolo
  components/          componenti grafici riutilizzabili
  data/site.ts         contenuti statici (contatti, convenzioni, tabella prestiti…)
  lib/wp.ts            lettura dei contenuti da WordPress
  lib/navigation.ts    apertura link (pagine interne, browser, telefono, email)
  lib/storage.ts       salvataggio locale e copia offline dei contenuti
  lib/favorites.tsx    convenzioni preferite
  lib/loan.ts          calcolo rata del prestito
  lib/tessera.ts       foto della tessera
docs/                  bozze di privacy policy dell'app e testi per gli store
  theme.ts             colori e font del sito
```

Per aggiungere o modificare una convenzione nell'elenco basta modificare `src/data/site.ts`.

## Avviare l'app in sviluppo

```bash
npm install
npx expo start
```

Poi inquadra il QR code con l'app **Expo Go** sul telefono (stessa rete Wi‑Fi), oppure premi `w` per aprirla nel browser.

## Build e pubblicazione sugli store

Si usano i servizi cloud di Expo (EAS): non serve un Mac.

```bash
npx eas-cli@latest login
npx eas-cli@latest build --profile preview --platform android   # APK da installare per i test
npx eas-cli@latest build --profile production --platform all     # build per App Store e Play Store
npx eas-cli@latest submit --platform ios                          # invio ad App Store Connect
npx eas-cli@latest submit --platform android                      # invio a Google Play
```

Servono un account Apple Developer (99 $/anno) e un account Google Play Console (25 $ una tantum), intestati alla Cassa Mutua.

Identificativo dell'app: `it.cassamutualazio.app` (configurato in `app.json`).

## Da completare prima della pubblicazione

- Logo e icona in alta risoluzione (le icone attuali sono ricavate dal logo del sito e sono provvisorie).
- Conferma dei testi e delle condizioni economiche da parte della Cassa Mutua.
- Privacy policy dell'app e schede degli store: bozze pronte in `docs/`, da far verificare e completare con gli screenshot.
