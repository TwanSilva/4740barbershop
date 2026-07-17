import { useLang } from '../lib/i18n'
import { PHONE_TEL } from '../lib/config'
import { IconPhone } from './icons'

export function MobileCallBar() {
  const { tr } = useLang()

  return (
    <a
      href={`tel:${PHONE_TEL}`}
      className="fixed inset-x-4 bottom-4 z-50 flex items-center justify-center gap-2 rounded-full bg-gold py-4 text-sm font-bold text-ink shadow-[0_10px_30px_rgba(0,0,0,0.4)] sm:hidden"
    >
      <IconPhone className="h-4 w-4" />
      {tr('mobile_call_cta')}
    </a>
  )
}
