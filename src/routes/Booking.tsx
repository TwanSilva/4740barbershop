import { useMemo, useState, type ReactNode } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { StepIndicator } from '../booking/StepIndicator'
import { ProviderStep } from '../booking/ProviderStep'
import { CutTypeStep, type CutType } from '../booking/CutTypeStep'
import { SlotStep } from '../booking/SlotStep'
import { ContactStep, type ContactInfo } from '../booking/ContactStep'
import { Confirmation } from '../booking/Confirmation'
import { useLang } from '../lib/i18n'
import { getProvider, getService, SERVICE_DURATIONS, SERVICES, type Service } from '../lib/booking'
import { createAppointment, isSlotConflictError, slotEndTime } from '../lib/availability'
import { IconChevronLeft } from '../components/icons'

const BARBER_SERVICE_SLUG = 'barbearia'

const CUT_TYPE_NOTE: Record<CutType, string> = {
  haircut: 'Apenas Corte',
  combo: 'Corte + Barba',
}

function withCutTypeNote(cutType: CutType | undefined, notes: string) {
  const label = cutType ? CUT_TYPE_NOTE[cutType] : undefined
  if (!label) return notes || undefined
  return notes ? `[${label}] ${notes}` : `[${label}]`
}

type BookingState = {
  providerId?: string
  cutType?: CutType
  date?: string
  time?: string
}

export default function BookingPage({ flow }: { flow: 'barber' | 'aesthetics' }) {
  if (flow === 'barber') return <BarberBooking />
  return <AestheticsBooking />
}

function Shell({
  step,
  total,
  onBack,
  children,
}: {
  step: number
  total: number
  onBack?: () => void
  children: ReactNode
}) {
  const { tr } = useLang()
  return (
    <>
      <Header />
      <main className="min-h-[80vh] bg-ink">
        <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cream-dim normal-case transition-colors duration-200 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 active:scale-95"
            >
              <IconChevronLeft className="h-4 w-4" />
              {tr('booking_back')}
            </button>
          )}
          <StepIndicator step={step} total={total} />
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}

function BarberBooking() {
  const { tr, lang } = useLang()
  const [state, setState] = useState<BookingState>({})
  const [stepIndex, setStepIndex] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string>()
  const [confirmed, setConfirmed] = useState(false)

  const steps = ['provider', 'cutType', 'slot', 'contact'] as const
  const total = steps.length
  const duration = SERVICE_DURATIONS[BARBER_SERVICE_SLUG]

  async function handleContactSubmit(info: ContactInfo) {
    if (!state.providerId || !state.date || !state.time) return
    setSubmitting(true)
    setError(undefined)
    try {
      await createAppointment({
        provider_id: state.providerId,
        service_slug: BARBER_SERVICE_SLUG,
        date: state.date,
        start_time: state.time,
        end_time: slotEndTime(state.time, duration),
        duration_minutes: duration,
        client_name: info.name,
        client_email: info.email,
        client_phone: info.phone,
        client_notes: withCutTypeNote(state.cutType, info.notes),
      })
      setConfirmed(true)
    } catch (err) {
      setError(isSlotConflictError(err) ? tr('booking_error_slot_taken') : tr('booking_error_generic'))
    } finally {
      setSubmitting(false)
    }
  }

  if (confirmed && state.providerId && state.date && state.time) {
    const provider = getProvider(state.providerId)
    const service = getService(BARBER_SERVICE_SLUG)
    return (
      <Shell step={total} total={total}>
        <Confirmation
          serviceName={service?.name[lang] ?? ''}
          providerName={provider?.name ?? ''}
          date={state.date}
          time={state.time}
        />
      </Shell>
    )
  }

  const current = steps[stepIndex]
  const canGoBack = stepIndex > 0

  return (
    <Shell step={stepIndex + 1} total={total} onBack={canGoBack ? () => setStepIndex((i) => i - 1) : undefined}>
      {current === 'provider' && (
        <ProviderStep
          onSelect={(providerId) => {
            setState((s) => ({ ...s, providerId }))
            setStepIndex(1)
          }}
        />
      )}
      {current === 'cutType' && (
        <CutTypeStep
          onSelect={(cutType) => {
            setState((s) => ({ ...s, cutType }))
            setStepIndex(2)
          }}
        />
      )}
      {current === 'slot' && state.providerId && (
        <SlotStep
          providerId={state.providerId}
          durationMinutes={duration}
          onSelect={(date, time) => {
            setState((s) => ({ ...s, date, time }))
            setStepIndex(3)
          }}
        />
      )}
      {current === 'contact' && <ContactStep submitting={submitting} error={error} onSubmit={handleContactSubmit} />}
    </Shell>
  )
}

function AestheticsBooking() {
  const { service: serviceSlug } = useParams<{ service: string }>()
  const providerId = 'sonia'
  const service = serviceSlug ? getService(serviceSlug) : undefined
  const aestheticsServices = useMemo(() => SERVICES.filter((s) => s.category === 'aesthetics'), [])

  const [state, setState] = useState<{ date?: string; time?: string }>({})
  const [stepIndex, setStepIndex] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string>()
  const [confirmed, setConfirmed] = useState(false)

  const { tr, lang } = useLang()

  const steps = ['slot', 'contact'] as const
  const total = steps.length

  if (!service || !aestheticsServices.some((s: Service) => s.slug === service.slug)) {
    return <Navigate to="/#services" replace />
  }

  async function handleContactSubmit(info: ContactInfo) {
    if (!state.date || !state.time || !service) return
    setSubmitting(true)
    setError(undefined)
    const duration = SERVICE_DURATIONS[service.slug]
    try {
      await createAppointment({
        provider_id: providerId,
        service_slug: service.slug,
        date: state.date,
        start_time: state.time,
        end_time: slotEndTime(state.time, duration),
        duration_minutes: duration,
        client_name: info.name,
        client_email: info.email,
        client_phone: info.phone,
        client_notes: info.notes || undefined,
      })
      setConfirmed(true)
    } catch (err) {
      setError(isSlotConflictError(err) ? tr('booking_error_slot_taken') : tr('booking_error_generic'))
    } finally {
      setSubmitting(false)
    }
  }

  if (confirmed && state.date && state.time) {
    return (
      <Shell step={total} total={total}>
        <Confirmation serviceName={service.name[lang]} providerName="Sónia" date={state.date} time={state.time} />
      </Shell>
    )
  }

  const current = steps[stepIndex]
  const canGoBack = stepIndex > 0

  return (
    <Shell step={stepIndex + 1} total={total} onBack={canGoBack ? () => setStepIndex((i) => i - 1) : undefined}>
      {current === 'slot' && (
        <SlotStep
          providerId={providerId}
          durationMinutes={SERVICE_DURATIONS[service.slug]}
          onSelect={(date, time) => {
            setState({ date, time })
            setStepIndex(1)
          }}
        />
      )}
      {current === 'contact' && <ContactStep submitting={submitting} error={error} onSubmit={handleContactSubmit} />}
    </Shell>
  )
}
