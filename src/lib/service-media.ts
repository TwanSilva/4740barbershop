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
import barbeariaVideoMp4 from '../assets/services/barbearia-video.mp4'
import barbeariaVideoWebm from '../assets/services/barbearia-video.webm'
import barbeariaPoster from '../assets/services/barbearia-poster.jpg'
import limpezaVideoMp4 from '../assets/services/limpeza-video.mp4'
import limpezaVideoWebm from '../assets/services/limpeza-video.webm'
import limpezaPoster from '../assets/services/limpeza-poster.jpg'

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
        pt: 'Na 4740, a depilação a laser é para eles e para elas, eficaz, segura e sem complicações.',
        en: 'At 4740, laser hair removal is for everyone, effective, safe and hassle-free.',
      },
    },
  },
  ictioterapia: {
    video: { mp4: ictioterapiaVideoMp4, webm: ictioterapiaVideoWebm, poster: ictioterapiaPoster },
  },
  massagem: {
    video: { mp4: massagemVideoMp4, webm: massagemVideoWebm, poster: massagemPoster },
    caption: {
      headline: {
        pt: 'Cuidados que vão além da estética: bem-estar para ELE e para ELA!',
        en: 'Care that goes beyond aesthetics: well-being for HIM and for HER!',
      },
      subline: {
        pt: 'Na 4740 encontra o serviço de massagem pensado para si, com conforto, profissionalismo e dedicação.',
        en: 'At 4740 you’ll find a massage service designed for you, with comfort, professionalism and dedication.',
      },
    },
  },
  barbearia: {
    video: { mp4: barbeariaVideoMp4, webm: barbeariaVideoWebm, poster: barbeariaPoster },
    caption: {
      headline: {
        pt: 'Na 4740 Barbershop o estilo fala mais alto.',
        en: 'At 4740 Barbershop, style speaks louder.',
      },
      subline: {
        pt: 'Dos cortes clássicos aos modernos, aqui cada detalhe é pensado para realçar a tua melhor versão. Um espaço onde tradição e cuidado se encontram, porque não é só cortar o cabelo, é viver a experiência.',
        en: 'From classic cuts to modern ones, every detail here is designed to bring out your best version. A space where tradition and care meet, because it’s not just about cutting hair, it’s about living the experience.',
      },
    },
  },
  'limpeza-de-pele': {
    video: { mp4: limpezaVideoMp4, webm: limpezaVideoWebm, poster: limpezaPoster },
  },
}
