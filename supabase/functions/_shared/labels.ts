// Kept in sync by hand with src/lib/config.ts (TEAM) and src/lib/booking.ts
// (SERVICES) — edge functions run in Deno and don't share the frontend's
// module graph, so display names for emails are duplicated here.

export const PROVIDER_NAMES: Record<string, string> = {
  luis: 'Luís',
  leandro: 'Leandro',
  enzo: 'Enzo',
  sonia: 'Sónia',
}

export const SERVICE_NAMES: Record<string, string> = {
  barbearia: 'Barbearia',
  ictioterapia: 'Ictioterapia',
  massagem: 'Massagem',
  laser: 'Laser',
  'limpeza-de-pele': 'Limpeza de Pele',
}
