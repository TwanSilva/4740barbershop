import { useState, type FormEvent } from 'react'
import { useLang } from '../lib/i18n'

export type ContactInfo = {
  name: string
  email: string
  phone: string
  notes: string
}

export function ContactStep({
  light,
  submitting,
  error,
  onSubmit,
}: {
  light?: boolean
  submitting: boolean
  error?: string
  onSubmit: (info: ContactInfo) => void
}) {
  const { tr } = useLang()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSubmit({ name, email, phone, notes })
  }

  const inputClass = `w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-gold focus-visible:ring-2 focus-visible:ring-gold/40 ${
    light
      ? 'border-mist-2 bg-white text-stone placeholder:text-stone-dim-2'
      : 'border-line bg-charcoal-2 text-cream placeholder:text-cream-dim-2'
  }`
  const labelClass = `mb-1.5 block text-xs font-bold uppercase tracking-wide ${light ? 'text-stone-dim' : 'text-cream-dim'}`

  return (
    <form onSubmit={handleSubmit}>
      <h2 className={`text-2xl font-bold sm:text-3xl ${light ? 'text-stone' : 'text-cream'}`}>
        {tr('booking_step_contact_title')}
      </h2>

      <div className="mt-6 flex flex-col gap-4">
        <div>
          <label className={labelClass} htmlFor="name">
            {tr('booking_field_name')}
          </label>
          <input id="name" required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            {tr('booking_field_email')}
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            {tr('booking_field_phone')}
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="notes">
            {tr('booking_field_notes')}
          </label>
          <textarea
            id="notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={tr('booking_field_notes_placeholder')}
            className={inputClass}
          />
        </div>
      </div>

      {error && <p className="mt-4 text-sm font-semibold text-red-400 normal-case">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-8 w-full rounded-full bg-gold px-8 py-4 text-sm font-bold text-ink transition-all duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
      >
        {submitting ? tr('booking_submitting') : tr('booking_submit')}
      </button>
    </form>
  )
}
