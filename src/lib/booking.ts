import { HOURS, type Bilingual, type HourRow } from './config'

export type ServiceCategory = 'barber' | 'aesthetics'

export type Service = {
  slug: string
  name: Bilingual
  shortDesc: Bilingual
  longDesc: Bilingual
  category: ServiceCategory
}

export const SERVICES: Service[] = [
  {
    slug: 'barbearia',
    name: { pt: 'Barbearia', en: 'Barbershop' },
    shortDesc: {
      pt: 'Corte, barba, ou os dois, decides no dia com o teu barbeiro.',
      en: 'Haircut, beard, or both, decide on the day with your barber.',
    },
    longDesc: {
      pt: 'Marca a tua hora e decide no local se queres corte, barba, ou o combo completo, o teu barbeiro trata do resto, com toalha quente e produtos de acabamento.',
      en: 'Book your slot and decide in person whether you want a haircut, a beard trim, or the full combo, your barber takes care of the rest, with a hot towel and finishing products.',
    },
    category: 'barber',
  },
  {
    slug: 'ictioterapia',
    name: { pt: 'Ictioterapia', en: 'Ichthyotherapy' },
    shortDesc: { pt: 'Tratamento natural de pele com peixes Garra Rufa.', en: 'Natural skin treatment with Garra Rufa fish.' },
    longDesc: {
      pt: 'Uma experiência relaxante em que pequenos peixes Garra Rufa removem suavemente as células mortas da pele, deixando-a mais suave e renovada.',
      en: 'A relaxing experience where small Garra Rufa fish gently remove dead skin cells, leaving your skin smoother and renewed.',
    },
    category: 'aesthetics',
  },
  {
    slug: 'massagem',
    name: { pt: 'Massagem', en: 'Massage' },
    shortDesc: { pt: 'Massagem relaxante para aliviar tensões do dia a dia.', en: 'Relaxing massage to ease everyday tension.' },
    longDesc: {
      pt: 'Uma massagem relaxante pensada para aliviar tensão muscular e proporcionar um momento de descanso completo.',
      en: 'A relaxing massage designed to ease muscle tension and give you a full moment of rest.',
    },
    category: 'aesthetics',
  },
  {
    slug: 'laser',
    name: { pt: 'Laser', en: 'Laser' },
    shortDesc: { pt: 'Tratamento de laser para cuidados de pele e depilação.', en: 'Laser treatment for skin care and hair removal.' },
    longDesc: {
      pt: 'Tratamento de laser realizado com equipamento profissional, adaptado às necessidades de cada cliente.',
      en: 'A laser treatment performed with professional equipment, adapted to each client’s needs.',
    },
    category: 'aesthetics',
  },
  {
    slug: 'limpeza-de-pele',
    name: { pt: 'Limpeza de Pele', en: 'Skin Cleansing' },
    shortDesc: { pt: 'Limpeza de pele profunda, facial e revitalizante.', en: 'Deep, revitalising facial skin cleansing.' },
    longDesc: {
      pt: 'Uma limpeza de pele facial profunda que remove impurezas e revitaliza a pele, deixando-a visivelmente mais fresca.',
      en: 'A deep facial skin cleansing that removes impurities and revitalises the skin, leaving it visibly fresher.',
    },
    category: 'aesthetics',
  },
]

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug)
}

// Placeholder duration for every service — edit each entry independently
// once real durations are confirmed. Booking logic reads only from here.
export const SERVICE_DURATIONS: Record<string, number> = {
  barbearia: 60,
  ictioterapia: 60,
  massagem: 60,
  laser: 60,
  'limpeza-de-pele': 60,
}

export type Provider = {
  id: string
  name: string
  kind: ServiceCategory
  serviceSlugs: string[]
}

export const PROVIDERS: Provider[] = [
  { id: 'luis', name: 'Luís', kind: 'barber', serviceSlugs: ['barbearia'] },
  { id: 'leandro', name: 'Leandro', kind: 'barber', serviceSlugs: ['barbearia'] },
  { id: 'enzo', name: 'Enzo', kind: 'barber', serviceSlugs: ['barbearia'] },
  { id: 'sonia', name: 'Sónia', kind: 'aesthetics', serviceSlugs: ['ictioterapia', 'massagem', 'laser', 'limpeza-de-pele'] },
]

export function getProvider(id: string) {
  return PROVIDERS.find((p) => p.id === id)
}

// Per-provider weekly schedule. Defaults to the shop's general hours for
// every provider — edit each provider's rows independently once their real
// hours are confirmed. Booking/availability logic always reads from here,
// never from the shop HOURS constant directly.
export const PROVIDER_SCHEDULES: Record<string, HourRow[]> = {
  luis: HOURS,
  leandro: HOURS,
  enzo: HOURS,
  sonia: HOURS,
}
