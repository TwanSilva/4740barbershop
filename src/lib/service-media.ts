import type { Bilingual } from './config'
import laserVideoMp4 from '../assets/services/laser-video.mp4'
import laserVideoWebm from '../assets/services/laser-video.webm'
import laserPoster from '../assets/services/laser-poster.jpg'
import ictioterapiaVideoMp4 from '../assets/services/ictioterapia-video.mp4'
import ictioterapiaVideoWebm from '../assets/services/ictioterapia-video.webm'
import ictioterapiaPoster from '../assets/services/ictioterapia-poster.jpg'
import massagemVideoMp4 from '../assets/services/massagem-video.mp4'
import massagemVideoWebm from '../assets/services/massagem-video.webm'
import massagemPoster from '../assets/services/massagem-poster.jpg'

// Optional per-service background video + marketing caption, layered onto
// the service detail page hero in place of the flat surface. Most services
// won't have one — this is additive, not a replacement for the standard
// icon/title/description template. Caption is optional: only add one when
// specific marketing copy has actually been provided for that service.
export type ServiceMedia = {
  video: { mp4: string; webm: string; poster: string }
  caption?: { headline: Bilingual; subline: Bilingual }
}

export const SERVICE_MEDIA: Record<string, ServiceMedia> = {
  laser: {
    video: { mp4: laserVideoMp4, webm: laserVideoWebm, poster: laserPoster },
    caption: {
      headline: {
        pt: 'Pelos a mais? Só se for na barba!',
        en: 'Too much hair? Only if it’s your beard!',
      },
      subline: {
        pt: 'Na 4740, a depilação a laser é para eles e para elas – eficaz, segura e sem complicações.',
        en: 'At 4740, laser hair removal is for everyone – effective, safe and hassle-free.',
      },
    },
  },
  ictioterapia: {
    video: { mp4: ictioterapiaVideoMp4, webm: ictioterapiaVideoWebm, poster: ictioterapiaPoster },
  },
  massagem: {
    video: { mp4: massagemVideoMp4, webm: massagemVideoWebm, poster: massagemPoster },
  },
}
