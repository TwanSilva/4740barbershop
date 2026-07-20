import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { LanguageProvider } from './lib/i18n'
import HomePage from './routes/Home'
import ServiceDetailPage from './routes/ServiceDetail'
import BookingStartPage from './routes/BookingStart'
import BookingPage from './routes/Booking'
import AdminPage from './routes/Admin'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])
  return null
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/book" element={<BookingStartPage />} />
          <Route path="/book/barber" element={<BookingPage flow="barber" />} />
          <Route path="/book/aesthetics/:service" element={<BookingPage flow="aesthetics" />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
