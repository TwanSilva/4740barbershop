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

  const inputClass = `w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors focus:border-gold ${
    light ? 'border-stone/20 bg-white text-stone placeholder:text-stone/40' : 'border-white/15 bg-charcoal text-white placeholder:text-white/30'
  }`
  const labelClass = `mb-1.5 block text-xs font-bold uppercase tracking-wide ${light ? 'text-stone/70' : 'text-white/60'}`

  return (
    <form onSubmit={handleSubmit}>
      <h2 className={`text-2xl font-black sm:text-3xl ${light ? 'text-stone' : 'text-white'}`}>
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
        className="mt-8 w-full rounded-full bg-gold px-8 py-4 text-sm font-bold text-ink transition-transform hover:scale-[1.02] disabled:opacity-60 sm:w-auto"
      >
        {submitting ? tr('booking_submitting') : tr('booking_submit')}
      </button>
    </form>
  )
}
