import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Lang = 'pt' | 'en'

export type Dict = Record<Lang, string>

const LANG_STORAGE_KEY = '4740-lang'

export const t = {
  // Header / nav
  nav_team: { pt: 'Equipa', en: 'Team' },
  nav_services: { pt: 'Serviços', en: 'Services' },
  nav_reviews: { pt: 'Avaliações', en: 'Reviews' },
  nav_visit: { pt: 'Visite-nos', en: 'Visit' },
  nav_cta: { pt: 'Marcar Hora', en: 'Book Now' },

  // Hero
  hero_eyebrow: { pt: 'Barbearia // Estética', en: 'Barbershop // Aesthetics' },
  hero_headline: { pt: 'Precisão que se sente. Tradição que se vê.', en: 'Precision you can feel. Tradition you can see.' },
  hero_subheadline: {
    pt: 'Corte, barba e cuidados de estética em Esposende. Marca a tua hora em menos de um minuto.',
    en: 'Haircuts, beards and aesthetics care in Esposende. Book your slot in under a minute.',
  },
  hero_cta_primary: { pt: 'Marcar Hora', en: 'Book Now' },
  hero_cta_secondary: { pt: 'Ver Serviços', en: 'See Services' },
  hero_stat_rating: { pt: 'no Google', en: 'on Google' },
  hero_stat_reviews: { pt: 'avaliações', en: 'reviews' },

  // Team
  team_eyebrow: { pt: 'A Nossa Equipa', en: 'Our Team' },
  team_title: { pt: 'Conhece a Equipa', en: 'Meet the Team' },
  team_subtitle: {
    pt: 'Barbeiros e especialista em estética prontos para cuidar de ti.',
    en: 'Barbers and an aesthetics specialist ready to take care of you.',
  },
  team_book_barber: { pt: 'Marcar com Barbeiro', en: 'Book a Barber' },
  team_book_aesthetics: { pt: 'Marcar Tratamento', en: 'Book a Treatment' },

  // Services
  services_eyebrow: { pt: 'O Que Fazemos', en: 'What We Do' },
  services_title: { pt: 'Os Nossos Serviços', en: 'Our Services' },
  services_subtitle: {
    pt: 'Da barbearia clássica aos cuidados de estética — escolhe o teu serviço.',
    en: 'From classic barbering to aesthetics care — choose your service.',
  },
  service_learn_more: { pt: 'Saber Mais', en: 'Learn More' },
  service_book_now: { pt: 'Marcar Hora', en: 'Book Now' },
  service_back: { pt: 'Voltar aos Serviços', en: 'Back to Services' },
  service_duration_label: { pt: 'Duração aprox.', en: 'Approx. duration' },
  service_minutes: { pt: 'min', en: 'min' },

  // Reviews
  reviews_eyebrow: { pt: 'Avaliações', en: 'Reviews' },
  reviews_title: { pt: 'O Que Dizem de Nós', en: 'What People Say' },
  reviews_leave: { pt: 'Deixar uma Avaliação Google', en: 'Leave a Google Review' },
  reviews_see_all: { pt: 'Ver Todas no Google', en: 'See All on Google' },

  // Visit
  visit_eyebrow: { pt: 'Visite-nos', en: 'Visit Us' },
  visit_title: { pt: 'Encontra-nos em Esposende', en: 'Find Us in Esposende' },
  hours_title: { pt: 'Horário', en: 'Hours' },
  hours_open_now: { pt: 'Aberto agora', en: 'Open now' },
  hours_closed_now: { pt: 'Fechado agora', en: 'Closed now' },
  day_mon: { pt: 'Segunda-feira', en: 'Monday' },
  day_tue: { pt: 'Terça-feira', en: 'Tuesday' },
  day_wed: { pt: 'Quarta-feira', en: 'Wednesday' },
  day_thu: { pt: 'Quinta-feira', en: 'Thursday' },
  day_fri: { pt: 'Sexta-feira', en: 'Friday' },
  day_sat: { pt: 'Sábado', en: 'Saturday' },
  day_sun: { pt: 'Domingo', en: 'Sunday' },
  closed: { pt: 'Encerrado', en: 'Closed' },
  address_label: { pt: 'Morada', en: 'Address' },
  visit_directions: { pt: 'Como Chegar', en: 'Get Directions' },
  visit_call: { pt: 'Ligar Agora', en: 'Call Now' },
  visit_instagram: { pt: 'Instagram', en: 'Instagram' },
  visit_facebook: { pt: 'Facebook', en: 'Facebook' },
  visit_review: { pt: 'Deixar Avaliação Google', en: 'Leave a Google Review' },
  visit_find_google: { pt: 'Encontra-nos no Google', en: 'Find Us on Google' },

  // Final CTA
  final_cta_title: { pt: 'A Tua Hora Está à Espera.', en: 'Your Slot Is Waiting.' },
  final_cta_subtitle: {
    pt: 'Marca já a tua hora online ou liga-nos diretamente.',
    en: 'Book your slot online now, or give us a call directly.',
  },
  final_cta_button: { pt: 'Marcar Hora', en: 'Book Now' },

  // Footer
  footer_tagline: { pt: 'Barbearia e estética em Esposende.', en: 'Barbershop and aesthetics in Esposende.' },
  footer_rights: { pt: 'Todos os direitos reservados.', en: 'All rights reserved.' },
  footer_quick_links: { pt: 'Links Rápidos', en: 'Quick Links' },

  // Mobile call bar
  mobile_call_cta: { pt: 'Ligar Agora', en: 'Call Now' },

  // Booking flow — generic
  booking_step_label: { pt: 'Passo {n} de {total}', en: 'Step {n} of {total}' },
  booking_back: { pt: 'Voltar', en: 'Back' },
  booking_continue: { pt: 'Continuar', en: 'Continue' },
  booking_close: { pt: 'Fechar', en: 'Close' },

  // Booking — choose provider
  booking_step_provider_title: { pt: 'Escolhe o teu barbeiro', en: 'Choose your barber' },

  // Booking — choose slot
  booking_step_slot_title: { pt: 'Escolhe data e hora', en: 'Choose a date and time' },
  booking_slot_occupied: { pt: 'Ocupado', en: 'Occupied' },
  booking_slot_none: { pt: 'Sem horários disponíveis neste dia.', en: 'No available times on this day.' },
  booking_slot_loading: { pt: 'A carregar horários…', en: 'Loading times…' },
  booking_slot_closed: { pt: 'Encerrado neste dia.', en: 'Closed on this day.' },

  // Booking — contact form
  booking_step_contact_title: { pt: 'Os teus dados', en: 'Your details' },
  booking_field_name: { pt: 'Nome', en: 'Name' },
  booking_field_email: { pt: 'Email', en: 'Email' },
  booking_field_phone: { pt: 'Telemóvel', en: 'Phone' },
  booking_field_notes: { pt: 'O que pretendes? (opcional)', en: 'What would you like? (optional)' },
  booking_field_notes_placeholder: {
    pt: 'Ex: corte baixo nas laterais, barba desenhada…',
    en: 'E.g. short on the sides, shaped beard…',
  },
  booking_submit: { pt: 'Confirmar Marcação', en: 'Confirm Booking' },
  booking_submitting: { pt: 'A confirmar…', en: 'Confirming…' },
  booking_error_generic: {
    pt: 'Não foi possível concluir a marcação. Tenta novamente.',
    en: 'We couldn’t complete the booking. Please try again.',
  },
  booking_error_slot_taken: {
    pt: 'Esse horário acabou de ser reservado. Escolhe outro.',
    en: 'That time was just booked. Please choose another.',
  },

  // Booking — confirmation
  booking_confirmed_title: { pt: 'Marcação Confirmada!', en: 'Booking Confirmed!' },
  booking_confirmed_body: {
    pt: 'Enviámos um email de confirmação. Vais receber também um lembrete 1 hora antes da tua marcação.',
    en: 'We’ve sent you a confirmation email. You’ll also get a reminder 1 hour before your appointment.',
  },
  booking_confirmed_back_home: { pt: 'Voltar ao Início', en: 'Back to Home' },
  booking_summary_service: { pt: 'Serviço', en: 'Service' },
  booking_summary_provider: { pt: 'Com', en: 'With' },
  booking_summary_when: { pt: 'Quando', en: 'When' },

  // Admin
  admin_title: { pt: 'Área Reservada', en: 'Admin' },
  admin_password_label: { pt: 'Palavra-passe', en: 'Password' },
  admin_login: { pt: 'Entrar', en: 'Log In' },
  admin_login_error: { pt: 'Palavra-passe incorreta.', en: 'Incorrect password.' },
  admin_logout: { pt: 'Sair', en: 'Log Out' },
  admin_all_providers: { pt: 'Todos', en: 'All' },
  admin_no_appointments: { pt: 'Sem marcações.', en: 'No appointments.' },
  admin_col_client: { pt: 'Cliente', en: 'Client' },
  admin_col_service: { pt: 'Serviço', en: 'Service' },
  admin_col_provider: { pt: 'Profissional', en: 'Provider' },
  admin_col_when: { pt: 'Data / Hora', en: 'Date / Time' },
  admin_col_contact: { pt: 'Contacto', en: 'Contact' },
  admin_col_notes: { pt: 'Notas', en: 'Notes' },
  admin_loading: { pt: 'A carregar marcações…', en: 'Loading appointments…' },
} satisfies Record<string, Dict>

export type TKey = keyof typeof t

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  tr: (key: TKey, vars?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'pt'
  const stored = window.localStorage.getItem(LANG_STORAGE_KEY)
  return stored === 'en' || stored === 'pt' ? stored : 'pt'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang)

  useEffect(() => {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (next: Lang) => setLangState(next)

  const tr = useMemo(() => {
    return (key: TKey, vars?: Record<string, string | number>) => {
      let value = t[key][lang]
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          value = value.replace(`{${k}}`, String(v))
        }
      }
      return value
    }
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, tr }), [lang, tr])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider')
  return ctx
}
