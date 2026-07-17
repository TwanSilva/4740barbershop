import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Team } from '../components/Team'
import { Services } from '../components/Services'
import { Reviews } from '../components/Reviews'
import { Visit } from '../components/Visit'
import { FinalCta } from '../components/FinalCta'
import { Footer } from '../components/Footer'
import { MobileCallBar } from '../components/MobileCallBar'

export default function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash || hash === '#top') return
    const el = document.querySelector(hash)
    el?.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Team />
        <Services />
        <Reviews />
        <Visit />
        <FinalCta />
      </main>
      <Footer />
      <MobileCallBar />
    </>
  )
}
