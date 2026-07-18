import heroVideoMp4 from '../assets/hero/hero-video.mp4'
import heroVideoWebm from '../assets/hero/hero-video.webm'
import heroPoster from '../assets/hero/hero-poster.jpg'

// ---------------------------------------------------------------------------
// Business constants — swap these (and the assets in /public and /src/assets)
// to re-theme this template for a different barbershop/salon client.
// ---------------------------------------------------------------------------

export const BUSINESS_NAME = '4740'
export const BUSINESS_FULL_NAME = '4740 Barbershop'

export const PHONE_DISPLAY = '253 037 642'
export const PHONE_TEL = '+351253037642'

export const ADDRESS_LINE = 'R. Eng. Custódio José Vilas Boas n.º 40 Lj F, 4740-231 Esposende, Portugal'

export const INSTAGRAM_URL = 'https://www.instagram.com/4740barbershop/'
export const FACEBOOK_URL = 'https://www.facebook.com/BarbeariaBarbaNegraEsposende/'

export const GOOGLE_RATING = 4.9
export const GOOGLE_REVIEWS_COUNT = 154

export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS_LINE)}`
export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_LINE)}&output=embed`
export const GOOGLE_SEARCH_URL = `https://www.google.com/search?q=${encodeURIComponent(`${BUSINESS_FULL_NAME} Esposende`)}`
export const GOOGLE_REVIEW_URL =
  'https://www.google.com/search?sca_esv=bcbe1a3c17fe5261&cs=0&sxsrf=APpeQnu9qj0-UBKa1nV_TzWurvgFn_E2lg:1784328333449&q=Barbershop+Cr%C3%ADticas&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNLQwNbU0MDU2NLA0NjI2ADItNjAyvmIUcUosSkotKs7IL1BwLjq8tiQzObF4EStWYQCNaayZSQAAAA&rldimm=11855905310932309058&tbm=lcl&hl=pt-PT&sa=X&ved=2ahUKEwjYg-eD5dqVAxWTKvsDHTu8EpoQ9fQKegQIEhAG&biw=1920&bih=953&dpr=1#lkt=LocalPoiReviews'

export const HERO_VIDEO_SRC: { mp4?: string; webm?: string; poster?: string } = {
  mp4: heroVideoMp4,
  webm: heroVideoWebm,
  poster: heroPoster,
}

// Easy-swap slot for the real "4740 Barbershop" stamp logo. Drop the file in
// /public (e.g. /public/logo.png) and point this at it — until then the
// header/footer/favicon fall back to the placeholder mark in <StampMark />.
export const LOGO_SRC: string | undefined = undefined

export type HourRow = {
  dayKey: 'day_mon' | 'day_tue' | 'day_wed' | 'day_thu' | 'day_fri' | 'day_sat' | 'day_sun'
  day: number // 0 = Sunday ... 6 = Saturday
  open?: string // "HH:MM"
  close?: string
}

// Shop's general hours — shown on the Visit section. Each provider can have
// their own hours independently, see PROVIDER_SCHEDULES in booking.ts.
export const HOURS: HourRow[] = [
  { dayKey: 'day_mon', day: 1, open: '14:00', close: '23:00' },
  { dayKey: 'day_tue', day: 2, open: '09:30', close: '19:30' },
  { dayKey: 'day_wed', day: 3, open: '09:30', close: '23:00' },
  { dayKey: 'day_thu', day: 4, open: '09:30', close: '23:00' },
  { dayKey: 'day_fri', day: 5, open: '09:30', close: '23:00' },
  { dayKey: 'day_sat', day: 6, open: '09:30', close: '19:00' },
  { dayKey: 'day_sun', day: 0 },
]

export type Bilingual = { pt: string; en: string }

export type TeamMember = {
  id: string
  name: string
  role: Bilingual
  bio: Bilingual
  initials: string
  kind: 'barber' | 'aesthetics'
}

export const TEAM: TeamMember[] = [
  {
    id: 'luis',
    name: 'Luís',
    role: { pt: 'Barbeiro', en: 'Barber' },
    bio: {
      pt: 'Especialista em corte e barba, com atenção ao detalhe em cada visita.',
      en: 'Haircut and beard specialist, with an eye for detail in every visit.',
    },
    initials: 'L',
    kind: 'barber',
  },
  {
    id: 'leandro',
    name: 'Leandro',
    role: { pt: 'Barbeiro', en: 'Barber' },
    bio: {
      pt: 'Especialista em corte e barba, sempre a par das últimas tendências.',
      en: 'Haircut and beard specialist, always up to date with the latest trends.',
    },
    initials: 'L',
    kind: 'barber',
  },
  {
    id: 'enzo',
    name: 'Enzo',
    role: { pt: 'Barbeiro', en: 'Barber' },
    bio: {
      pt: 'Especialista em corte e barba, reconhecido pelo profissionalismo e cuidado.',
      en: 'Haircut and beard specialist, known for his professionalism and care.',
    },
    initials: 'E',
    kind: 'barber',
  },
  {
    id: 'sonia',
    name: 'Sónia',
    role: { pt: 'Especialista em Estética', en: 'Aesthetics Specialist' },
    bio: {
      pt: 'Ictioterapia, massagem, laser e limpeza de pele — cuidados de estética completos.',
      en: 'Ichthyotherapy, massage, laser and skin cleansing — complete aesthetics care.',
    },
    initials: 'S',
    kind: 'aesthetics',
  },
]

export const TESTIMONIALS: Bilingual[] = [
  {
    pt: 'Levei os mais novos da família para cortar o cabelo e fomos recebidos com muita simpatia e profissionalismo — os barbeiros tiveram imensa paciência com as crianças.',
    en: "I brought the youngest members of the family in for haircuts and we were received with great friendliness and professionalism — the barbers showed a lot of patience with the kids.",
  },
  {
    pt: 'Serviço incrível e uma equipa extremamente simpática do início ao fim.',
    en: 'Incredible service and an extremely kind team from start to finish.',
  },
  {
    pt: 'O Enzo é um excelente profissional — saí de lá com corte, barba e bigode impecáveis. Recomendo muito.',
    en: 'Enzo is an excellent professional — I left with an impeccable haircut, beard and moustache. Highly recommend.',
  },
]
