import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { useLang } from '../lib/i18n'
import { PROVIDERS, SERVICES } from '../lib/booking'
import {
  clearAdminPassword,
  fetchAdminAppointments,
  getStoredAdminPassword,
  storeAdminPassword,
  type AdminAppointment,
} from '../lib/admin'
import { StampMark } from '../components/StampMark'
import { IconLock } from '../components/icons'

const SERVICE_NAMES: Record<string, string> = Object.fromEntries(SERVICES.map((s) => [s.slug, s.name.pt]))

export default function AdminPage() {
  const { tr } = useLang()
  const [password, setPassword] = useState<string | null>(() => getStoredAdminPassword())
  const [providerFilter, setProviderFilter] = useState<string>('')
  const [appointments, setAppointments] = useState<AdminAppointment[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState<string>()

  const load = useCallback(
    async (pwd: string) => {
      setLoading(true)
      try {
        const data = await fetchAdminAppointments(pwd, providerFilter || undefined)
        setAppointments(data)
      } catch (err) {
        if (err instanceof Error && err.message === 'unauthorized') {
          clearAdminPassword()
          setPassword(null)
        }
      } finally {
        setLoading(false)
      }
    },
    [providerFilter],
  )

  useEffect(() => {
    if (password) load(password)
  }, [password, load])

  function handleLogin(e: FormEvent) {
    e.preventDefault()
    const form = new FormData(e.target as HTMLFormElement)
    const pwd = String(form.get('password') ?? '')
    setLoginError(undefined)
    fetchAdminAppointments(pwd)
      .then((data) => {
        storeAdminPassword(pwd)
        setPassword(pwd)
        setAppointments(data)
      })
      .catch(() => setLoginError(tr('admin_login_error')))
  }

  if (!password) {
    return (
      <main className="grid min-h-screen place-items-center bg-ink px-5">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded-3xl border border-gold/20 bg-charcoal-2 p-8">
          <div className="flex items-center gap-2.5">
            <StampMark className="h-9 w-9" />
            <span className="text-lg font-bold text-cream">{tr('admin_title')}</span>
          </div>
          <div className="mt-6 flex items-center gap-2 text-gold">
            <IconLock className="h-5 w-5" />
            <label htmlFor="password" className="text-xs font-bold uppercase tracking-wide text-cream-dim">
              {tr('admin_password_label')}
            </label>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            className="mt-2 w-full rounded-xl border border-line bg-ink px-4 py-3 text-sm text-cream outline-none transition-colors duration-200 focus:border-gold focus-visible:ring-2 focus-visible:ring-gold/40"
          />
          {loginError && <p className="mt-3 text-sm font-semibold text-red-400">{loginError}</p>}
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-gold px-6 py-3 text-sm font-bold text-ink transition-all duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 active:scale-95"
          >
            {tr('admin_login')}
          </button>
        </form>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-ink px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <StampMark className="h-9 w-9" />
            <h1 className="text-xl font-bold text-cream">{tr('admin_title')}</h1>
          </div>
          <button
            type="button"
            onClick={() => {
              clearAdminPassword()
              setPassword(null)
              setAppointments(null)
            }}
            className="rounded-full border border-line px-4 py-2 text-xs font-bold text-cream-dim transition-colors duration-200 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 active:scale-95"
          >
            {tr('admin_logout')}
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setProviderFilter('')}
            className={`rounded-full px-4 py-2 text-xs font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 active:scale-95 ${
              providerFilter === '' ? 'bg-gold text-ink' : 'border border-line text-cream-dim hover:text-cream'
            }`}
          >
            {tr('admin_all_providers')}
          </button>
          {PROVIDERS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setProviderFilter(p.id)}
              className={`rounded-full px-4 py-2 text-xs font-bold normal-case transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 active:scale-95 ${
                providerFilter === p.id ? 'bg-gold text-ink' : 'border border-line text-cream-dim hover:text-cream'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto rounded-3xl border border-line">
          {loading && <p className="p-6 text-sm text-cream-dim normal-case">{tr('admin_loading')}</p>}
          {!loading && appointments && appointments.length === 0 && (
            <p className="p-6 text-sm text-cream-dim normal-case">{tr('admin_no_appointments')}</p>
          )}
          {!loading && appointments && appointments.length > 0 && (
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="bg-charcoal-2 text-xs font-bold uppercase tracking-wide text-cream-dim">
                <tr>
                  <th className="px-4 py-3">{tr('admin_col_when')}</th>
                  <th className="px-4 py-3">{tr('admin_col_client')}</th>
                  <th className="px-4 py-3">{tr('admin_col_service')}</th>
                  <th className="px-4 py-3">{tr('admin_col_provider')}</th>
                  <th className="px-4 py-3">{tr('admin_col_contact')}</th>
                  <th className="px-4 py-3">{tr('admin_col_notes')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line normal-case">
                {appointments.map((a) => (
                  <tr key={a.id} className="text-cream-dim">
                    <td className="px-4 py-3 whitespace-nowrap">
                      {a.date} · {a.start_time.slice(0, 5)}
                    </td>
                    <td className="px-4 py-3 font-semibold text-cream">{a.client_name}</td>
                    <td className="px-4 py-3">{SERVICE_NAMES[a.service_slug] ?? a.service_slug}</td>
                    <td className="px-4 py-3 capitalize">{a.provider_id}</td>
                    <td className="px-4 py-3">
                      <div className="text-cream">{a.client_phone}</div>
                      <div className="text-cream-dim">{a.client_email}</div>
                    </td>
                    <td className="px-4 py-3">{a.client_notes || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  )
}
