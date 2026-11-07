// Contenuti statici ricavati da cassamutualazio.it.
// Le pagine di dettaglio delle convenzioni e le news vengono invece caricate
// in tempo reale dal sito (WordPress REST API), così restano sempre aggiornate.

export const SITE_URL = 'https://cassamutualazio.it';

export const contacts = {
  name: 'Cassa Mutua Sanità Regione Lazio',
  phone: '06 68805770',
  phoneHref: 'tel:+390668805770',
  email: 'segreteria@cassamutualazio.it',
  pec: 'cmutuasl@legalmail.it',
  instagram: 'https://www.instagram.com/cassa_mutua_lazio/',
  linkedin: 'https://www.linkedin.com/company/cassa-mutua-lazio/',
  hours: [
    { day: 'Lunedì – Venerdì', time: '09:00 – 13:00 • 13:30 – 14:30' },
    { day: 'Sabato', time: 'Chiuso' },
    { day: 'Domenica', time: 'Chiuso' },
  ],
  offices: [
    {
      name: 'Sede principale',
      address: 'Via Giovanni Andrea Badoero 67',
      city: '00154 Roma',
      map: 'https://maps.app.goo.gl/CMq1ewYcJZGkcqkL9',
    },
    {
      name: 'Sportello S. Camillo',
      address: 'Circonvallazione Gianicolense',
      city: '00152 Roma — Sportello Edificio ex URP',
      map: 'https://maps.app.goo.gl/boqxYigGntwxgPRf7',
    },
  ],
};

export const links = {
  tesseraDigitale: 'https://wallyfor.com/iframepass/index.php?ref=1ab088c6400a2bf8e94c060c82cdb4a4',
  moduloIscrizione: `${SITE_URL}/wp-content/uploads/MODULO-ISCRIZIONE-AGGIORNATO.pdf`,
  privacy: `${SITE_URL}/privacy-policy/`,
  cookie: `${SITE_URL}/cookie-policy/`,
  formPrestito: `${SITE_URL}/prestito-a-tasso-sociale/`,
  formCessione: `${SITE_URL}/cessione-del-quinto/`,
};

export type AreaId = 'salute' | 'benessere' | 'assicurazioni' | 'tempo-libero' | 'fisco-legale' | 'casa-finanza';

export type Area = {
  id: AreaId;
  label: string;
  title: string;
  description: string;
  intro: string;
  cta: string;
  emoji: string;
  image: string;
};

export const areas: Area[] = [
  {
    id: 'salute',
    label: 'Salute',
    title: 'Prestazioni sanitarie',
    description: 'Diagnostica, visite specialistiche e servizi per la prevenzione.',
    intro:
      'Convenzioni dedicate a prevenzione, diagnostica, visite e servizi sanitari riservati ai Soci.',
    cta: 'Vai ai servizi',
    emoji: '🩺',
    image: `${SITE_URL}/wp-content/uploads/pexels-polina-tankilevitch-3735770-scaled.jpg`,
  },
  {
    id: 'benessere',
    label: 'Benessere',
    title: 'Sport e cura di sé',
    description: 'Fitness, attività sportive, trattamenti e benessere quotidiano.',
    intro:
      'Convenzioni dedicate ad attività sportive, benessere personale e percorsi di cura riservati ai Soci.',
    cta: 'Scopri il benessere',
    emoji: '🏋️',
    image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&w=900',
  },
  {
    id: 'assicurazioni',
    label: 'Assicurazioni',
    title: 'Coperture e tutela',
    description: 'Soluzioni per protezione, infortuni, viaggi, sanità privata e famiglia.',
    intro:
      'Più serenità, con vantaggi dedicati ai Soci. Scopri le convenzioni con Generali e Unipol Assicurazioni.',
    cta: 'Vedi coperture',
    emoji: '🛡️',
    image: `${SITE_URL}/wp-content/uploads/pexels-olly-3760067-scaled.jpg`,
  },
  {
    id: 'tempo-libero',
    label: 'Tempo libero',
    title: 'Viaggi e vantaggi',
    description: 'Esperienze, famiglia, cultura, ristorazione e momenti di svago.',
    intro:
      'Convenzioni dedicate a viaggi, famiglia, cultura, eventi e momenti di svago riservati ai Soci.',
    cta: 'Esplora vantaggi',
    emoji: '🌴',
    image: `${SITE_URL}/wp-content/uploads/Senza-titolo-1920-x-1280-px-1920-x-1080-px.png`,
  },
  {
    id: 'fisco-legale',
    label: 'Fisco e Legale',
    title: 'Assistenza e supporto',
    description: 'Consulenza fiscale, tributaria, legale e supporto operativo.',
    intro:
      'Convenzioni dedicate a consulenza, assistenza fiscale, previdenziale, legale e amministrativa riservate ai Soci.',
    cta: 'Richiedi supporto',
    emoji: '⚖️',
    image: `${SITE_URL}/wp-content/uploads/Senza-titolo-1920-x-1080-px-800-x-500-px-1.png`,
  },
  {
    id: 'casa-finanza',
    label: 'Casa e Finanza',
    title: 'Servizi finanziari e immobiliari',
    description: 'Soluzioni dedicate per prestiti, casa, immobili e consulenze mirate.',
    intro:
      'Soluzioni dedicate a prestiti, cessione del quinto e supporto immobiliare riservate ai Soci.',
    cta: 'Scopri i servizi',
    emoji: '🏠',
    image: `${SITE_URL}/wp-content/uploads/pexels-karola-g-7680696-scaled.jpg`,
  },
];

export type Convenzione = {
  slug: string; // slug della pagina WordPress
  area: AreaId;
  name: string;
  emoji: string;
  tags: string;
  description: string;
  highlight?: string;
  route?: '/prestiti' | '/cessione-quinto'; // pagine native dell'app
};

export const convenzioni: Convenzione[] = [
  // Salute
  {
    slug: 'artemisia-lab', area: 'salute', name: 'Artemisia Lab', emoji: '🧪',
    tags: 'Analisi • Diagnostica • Visite specialistiche',
    description: 'Sconti dedicati ai Soci su esami e prestazioni, con accesso semplice tramite tessera digitale.',
    highlight: 'fino a –15%',
  },
  {
    slug: 'dott-vittorio-palandri-biologo-nutrizionista', area: 'salute', name: 'Dott. Vittorio Palandri', emoji: '🥗',
    tags: 'Biologo nutrizionista • Alimentazione • Benessere',
    description: 'Percorsi nutrizionali personalizzati e consulenze specialistiche.',
    highlight: '–20% visite',
  },
  {
    slug: 'ottica-adalberto-platania', area: 'salute', name: 'Ottica Adalberto Platania', emoji: '👓',
    tags: 'Lenti oftalmiche • Occhiali da sole • Montature',
    description: 'Agevolazioni riservate su prodotti e servizi del settore ottico.',
  },
  {
    slug: 'studio-dentistico-dr-giuseppe-bonardi', area: 'salute', name: 'Studio dentistico Dott. Giuseppe Bonardi', emoji: '🦷',
    tags: 'Odontoiatria • Igiene • Trattamenti specialistici',
    description: 'Visite, igiene orale e trattamenti specialistici a condizioni agevolate.',
  },
  {
    slug: 'dental-needs', area: 'salute', name: 'Dental Needs', emoji: '🦷',
    tags: 'Odontoiatria • Salute orale • Prestazioni agevolate',
    description: 'Sconto del 10% sulle prestazioni odontoiatriche (escluse quelle già in promozione).',
    highlight: '–10%',
  },
  // Benessere
  {
    slug: 'harmony-sport-club', area: 'benessere', name: 'Harmony Sporting Club', emoji: '🏋️‍♀️',
    tags: 'Fitness • Allenamento • Benessere',
    description: 'Allenarsi e prendersi cura di sé diventa più semplice e conveniente per i Soci.',
  },
  {
    slug: 'nuovo-tuscolo-sporting-club', area: 'benessere', name: 'Nuovo Tuscolo Sporting Club', emoji: '🎾',
    tags: 'Tennis • Padel • Pickleball • Fitness',
    description: 'Circolo sportivo completo: tennis, padel, pickleball, pilates reformer, sala pesi e corsi.',
  },
  {
    slug: 's-i-s-sistemi-integrati-per-lo-sport', area: 'benessere', name: 'S.I.S. Sistemi Integrati per lo Sport', emoji: '🏅',
    tags: 'Sport • Benessere • Attività convenzionate',
    description: 'Una rete di servizi dedicati allo sport e al benessere con agevolazioni riservate.',
  },
  {
    slug: 'agepi-sport-97', area: 'benessere', name: 'AGEPI SPORT 97', emoji: '⚽',
    tags: 'Sport • Attività motorie • Tempo libero',
    description: 'Attività sportive per uno stile di vita attivo, benessere fisico e socializzazione.',
  },
  {
    slug: 'beauty-and-tonic-benessere-a-prezzi-speciali', area: 'benessere', name: 'Beauty & Tonic', emoji: '💆‍♀️',
    tags: 'Centro benessere • Trattamenti • Prezzi riservati',
    description: 'Trattamenti corpo e viso, estetica avanzata, pressomassaggio e laser.',
  },
  // Assicurazioni
  {
    slug: 'soluzioni-assicurative', area: 'assicurazioni', name: 'Generali Assicurazioni', emoji: '🛡️',
    tags: 'Famiglia • Patrimonio • Professione',
    description: 'Coperture per la persona, la famiglia e il patrimonio, con condizioni dedicate ai Soci.',
  },
  {
    slug: 'unipol-assicurazioni', area: 'assicurazioni', name: 'Unipol Assicurazioni', emoji: '🛡️',
    tags: 'Assicurazioni • Noleggio auto • Telepedaggio',
    description: 'Condizioni agevolate con Unipol e UniSalute, noleggio UnipolRental e sconto 15% UnipolMove.',
    highlight: '–15% UnipolMove',
  },
  // Tempo libero
  {
    slug: 'tempo-libero-cassa-mutua', area: 'tempo-libero', name: 'IperClub', emoji: '✈️',
    tags: 'Viaggi • Esperienze • Partner selezionati',
    description: 'Offerte selezionate, sconti e promozioni dedicate ai Soci.',
  },
  {
    slug: 'sardegna-2026-con-play-viaggi', area: 'tempo-libero', name: 'Play Viaggi – Sardegna 2026', emoji: '🌴',
    tags: 'Viaggi organizzati • Vacanze di gruppo',
    description: 'Club Hotel Eurovillage di Budoni, dal 9 al 17 settembre, con pullman, nave e pensione completa.',
  },
  {
    slug: 'skylimit-noleggio-auto', area: 'tempo-libero', name: 'Skylimit Noleggio Auto', emoji: '🚗',
    tags: 'Noleggio • Prenotazione online',
    description: '30% di sconto sul listino online.',
    highlight: '–30%',
  },
  {
    slug: 'ambasciatori-place-hotel', area: 'tempo-libero', name: 'Ambasciatori Place Hotel', emoji: '🧖‍♀️',
    tags: 'Hotel • SPA • Benessere • Ristorazione',
    description: 'Sconto del 10% su soggiorni, Day Spa, trattamenti e ristorazione. Codice: CMS2026.',
    highlight: '–10%',
  },
  {
    slug: 'associazione-culturale-arca85', area: 'tempo-libero', name: 'Associazione Culturale ARCA85', emoji: '🎼',
    tags: 'Musica • Lingue • Laboratori creativi',
    description: '50% di sconto sull’iscrizione annuale e 10% sulla quota mensile dei corsi.',
    highlight: '–50% iscrizione',
  },
  {
    slug: 'the-dayes-organizzazione-matrimoni-ed-eventi', area: 'tempo-libero', name: 'The Dayes', emoji: '💍',
    tags: 'Matrimoni • Eventi • Allestimenti',
    description: 'Organizzazione completa di matrimoni ed eventi con vantaggi riservati ai Soci.',
  },
  {
    slug: '5946-2', area: 'tempo-libero', name: 'Mr. Monkey Village', emoji: '🎉',
    tags: 'Parco giochi indoor • Feste • Famiglie',
    description: '10% di sconto sulle feste di compleanno e sul centro estivo e invernale.',
    highlight: '–10%',
  },
  {
    slug: 'bar-pasticceria-gelateria-dacri', area: 'tempo-libero', name: 'Bar Pasticceria Gelateria Dacrì', emoji: '☕',
    tags: 'Bar • Pasticceria • Gelateria',
    description: 'Una pausa di gusto con i vantaggi riservati ai Soci.',
  },
  {
    slug: 'fast5g-srls', area: 'tempo-libero', name: 'FAST 5G SRLS', emoji: '📱',
    tags: 'Telefonia • Fibra • Smartphone',
    description: 'Offerte dedicate per telefonia mobile, linea fissa, fibra e smartphone.',
  },
  // Fisco e legale
  {
    slug: 'consulenza-legale', area: 'fisco-legale', name: 'Consulenza legale', emoji: '⚖️',
    tags: 'Orientamento • Supporto • Indicazioni operative',
    description: 'Primo orientamento e indicazioni chiare su pratiche di interesse personale e familiare.',
  },
  {
    slug: 'assistenza-fiscale-e-tributaria', area: 'fisco-legale', name: 'Assistenza Fiscale, Tributaria e Previdenziale', emoji: '📑',
    tags: 'Fisco • Tributi • Previdenza',
    description: 'Gestione delle principali pratiche fiscali, tributarie e previdenziali.',
  },
  {
    slug: 'definizione-agevolata-tributi-locali', area: 'fisco-legale', name: 'Definizione Agevolata Tributi Locali', emoji: '🧾',
    tags: 'IMU • TARI • Multe',
    description: 'Verifica dell’accesso alla definizione agevolata e gestione della pratica.',
  },
  {
    slug: 'mentora-studio-4-0', area: 'fisco-legale', name: 'Mentora Studio 4.0', emoji: '📚',
    tags: 'Pratiche legali • Fiscali • Amministrative',
    description: 'Consulenza e assistenza professionale per pratiche legali, fiscali e amministrative.',
  },
  // Casa e finanza
  {
    slug: 'prestito-a-tasso-sociale', area: 'casa-finanza', name: 'Prestito a tasso sociale', emoji: '💶',
    tags: 'Da € 2.000 a € 5.000 • TAN 5%',
    description: 'Prestiti a tasso sociale riservati ai Soci in regola.',
    route: '/prestiti',
  },
  {
    slug: 'cessione-del-quinto', area: 'casa-finanza', name: 'Cessione del quinto', emoji: '💼',
    tags: 'Dipendenti e pensionati • Fino a 120 mesi',
    description: 'Rata trattenuta da stipendio o pensione, fino a un quinto del netto mensile.',
    route: '/cessione-quinto',
  },
  {
    slug: 'immobiliare', area: 'casa-finanza', name: 'Servizi immobiliari – Reale Casa Group', emoji: '🏠',
    tags: 'Vendita • Affitto • Valutazione gratuita',
    description: 'Vantaggi riservati, valutazione gratuita dell’immobile e supporto professionale.',
  },
];

export const loans = {
  tan: '5%',
  fee: '€ 100 una tantum',
  table: {
    2000: [
      { months: 12, rate: '€ 171,22' },
      { months: 24, rate: '€ 87,74' },
    ],
    3000: [
      { months: 12, rate: '€ 256,82' },
      { months: 24, rate: '€ 131,61' },
      { months: 36, rate: '€ 89,91' },
    ],
    4000: [
      { months: 12, rate: '€ 342,43' },
      { months: 24, rate: '€ 175,49' },
      { months: 36, rate: '€ 119,88' },
      { months: 48, rate: '€ 92,12' },
    ],
    5000: [
      { months: 12, rate: '€ 428,04' },
      { months: 24, rate: '€ 219,36' },
      { months: 36, rate: '€ 149,85' },
      { months: 48, rate: '€ 115,15' },
      { months: 60, rate: '€ 94,36' },
    ],
  } as Record<number, { months: number; rate: string }[]>,
  documents: ['Documento di identità', 'Codice fiscale', 'Ultima busta paga'],
};

export const cessione = {
  documents: [
    'Busta paga o cedolino pensione.',
    'CUD o certificazione reddituale.',
    'Documento di identità in corso di validità.',
    'Codice fiscale o tessera sanitaria.',
    'Eventuale documentazione integrativa richiesta.',
  ],
};

export const homeFaq = [
  {
    q: 'Chi può iscriversi?',
    a: 'Possono aderire gli operatori sanitari della Regione Lazio interessati a entrare nella Cassa Mutua e ad accedere ai servizi e alle convenzioni riservate ai Soci.',
  },
  {
    q: 'Come ricevo la tessera?',
    a: 'Dopo l’iscrizione, il Socio può ricevere o scaricare la tessera digitale, utile per accedere alle convenzioni e ai vantaggi dedicati.',
  },
  {
    q: 'Come utilizzo le convenzioni?',
    a: 'Una volta iscritto, il Socio può consultare le convenzioni disponibili e utilizzare la tessera digitale secondo le modalità indicate per ciascun servizio o partner convenzionato.',
  },
  {
    q: 'Posso iscrivermi online?',
    a: 'Sì, è possibile avviare la richiesta di iscrizione online attraverso la pagina dedicata, compilando i dati richiesti e seguendo le indicazioni fornite.',
  },
];

export const contactFaq = [
  { q: 'Quanto tempo impiegate a rispondere?', a: 'In genere entro 24–48 ore lavorative.' },
  {
    q: 'Posso chiedere informazioni anche se non sono socio?',
    a: 'Sì, puoi contattarci anche per ricevere informazioni sull’iscrizione e sui servizi disponibili.',
  },
  {
    q: 'Qual è il modo migliore per contattarvi?',
    a: 'Per richieste specifiche consigliamo il modulo o l’email. Per informazioni rapide puoi chiamare la segreteria negli orari indicati.',
  },
];

export const contactTopics = [
  'Informazioni generali',
  'Iscrizione / Tessera digitale',
  'Servizi finanziari',
  'Assicurazioni Cassa Mutua',
  'Convenzioni',
  'Assistenza fiscale e tributaria',
  'Assistenza previdenziale',
  'Sport e benessere',
  'Altro',
];

export const testimonials = [
  { text: 'Ho trovato disponibilità e chiarezza. Mi hanno seguita passo dopo passo e mi sono sentita davvero ascoltata.', name: 'Marta R.', role: 'Operatrice sanitaria' },
  { text: 'Servizio professionale e semplice. Ho ricevuto informazioni chiare e un supporto concreto.', name: 'Paolo G.', role: 'Dipendente SSN' },
  { text: 'Un punto di riferimento utile e vicino. Le convenzioni sono pratiche e il personale disponibile.', name: 'Giulia P.', role: 'Socio ordinario' },
];

export const usefulLinks: { label: string; url: string }[] = [
  { label: 'ASL Roma 1', url: 'https://www.aslroma1.it/' },
  { label: 'ASL Roma 2', url: 'https://www.aslroma2.it/' },
  { label: 'ASL Roma 3', url: 'https://www.aslroma3.it/' },
  { label: 'ASL Roma 4', url: 'https://www.aslroma4.it/' },
  { label: 'ASL Roma 5', url: 'https://www.aslroma5.it/' },
  { label: 'ASL Roma 6', url: 'https://www.aslroma6.it/' },
  { label: 'ASL Viterbo', url: 'https://www.asl.vt.it/' },
  { label: 'ASL Rieti', url: 'https://www.asl.rieti.it/' },
  { label: 'ASL Latina', url: 'https://www.ausl.latina.it/' },
  { label: 'ASL Frosinone', url: 'https://www.asl.fr.it/' },
  { label: 'AO San Camillo', url: 'https://www.scamilloforlanini.rm.it/' },
  { label: 'AO San Giovanni', url: 'https://www.hsangiovanni.roma.it/' },
  { label: 'AO Sant’Andrea', url: 'https://www.ospedalesantandrea.it/' },
  { label: 'Pol. Umberto I', url: 'https://www.policlinicoumberto1.it/' },
  { label: 'Pol. Tor Vergata', url: 'https://www.ptvonline.it/' },
  { label: 'IFO', url: 'https://www.ifo.it/' },
  { label: 'INMI Spallanzani', url: 'https://www.istitutospallanzani.it/' },
  { label: 'ARES', url: 'https://www.ares118.it/' },
  { label: 'INPS', url: 'https://www.inps.it/it/it.html' },
  { label: 'Ministero del Lavoro e delle Politiche Sociali', url: 'https://www.lavoro.gov.it/Pagine/default.aspx' },
  { label: 'Agenzia delle Entrate', url: 'https://www.agenziaentrate.gov.it/portale/' },
];
