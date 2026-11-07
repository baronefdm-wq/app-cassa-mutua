// Palette e tipografia ricavate dal sito cassamutualazio.it
export const colors = {
  navy: '#0B2440',
  navyDeep: '#071A33',
  navyHeader: '#101F41',
  ink: '#10243A',
  blue: '#1E78C5',
  blueSoft: '#DBEAFE',
  periwinkle: '#89A6EF',
  ice: '#EEF7FB',
  gold: '#FFB642',
  goldLight: '#FFD27A',
  cream: '#F8E7B8',
  creamSoft: '#FFF8E6',
  muted: '#52697C',
  line: '#E1E7F0',
  bg: '#F6F8FB',
  white: '#FFFFFF',
  success: '#1F9D6B',
} as const;

export const gradients = {
  gold: ['#FFB642', '#FFD27A', '#F8E7B8'] as const,
  hero: ['#071A33', '#0B2440', '#1C3560'] as const,
  heroCard: ['rgba(16,36,58,0.92)', 'rgba(30,58,100,0.85)'] as const,
};

export const fonts = {
  heading: 'Montserrat_900Black',
  headingBold: 'Montserrat_800ExtraBold',
  title: 'Montserrat_700Bold',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemi: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
} as const;

export const radius = { sm: 12, md: 18, lg: 26, pill: 999 } as const;

export const shadow = {
  shadowColor: '#0B2E6F',
  shadowOpacity: 0.1,
  shadowRadius: 18,
  shadowOffset: { width: 0, height: 8 },
  elevation: 4,
} as const;
