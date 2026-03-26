import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { NavProvider } from './context/NavContext'
import { ThemeProvider } from './context/ThemeContext'
import { CounsellingModalProvider } from './context/CounsellingModalContext'

import Header from './components/layout/Header'
import CategoryMenu from './components/layout/CategoryMenu'
import Footer from './components/layout/Footer'
import CounsellingEnrollModal from './components/ui/CounsellingEnrollModal'

import Home from './pages/Home'
import Colleges from './pages/Colleges'
import Engineering from './pages/Engineering'
import StudyAbroad from './pages/StudyAbroad'
import Services from './pages/Services'
import EntranceExams from './pages/EntranceExams'
import Gallery from './pages/Gallery'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from './pages/NotFound'
import SearchResults from './pages/SearchResults'

function App({ onMount }) {
  useEffect(() => {
    if (onMount) onMount()
  }, [])

  return (
    <ThemeProvider>
      <AuthProvider>
        <NavProvider>
          <Router>
            <CounsellingModalProvider>
            <div className="flex flex-col min-h-screen">
              <CounsellingEnrollModal />
              {/* MAIN HEADER */}
              <Header />

              {/* SECOND LEVEL MENU (AWS STYLE) */}
              <CategoryMenu />

              {/* PAGE CONTENT */}
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<SearchResults />} />

                  <Route path="/colleges" element={<Colleges />} />
                <Route path="/colleges/engineering" element={<Engineering />} />
                <Route path="/colleges/:category" element={<Colleges />} />
                <Route path="/colleges/:category/:collegeSlug" element={<Colleges />} />

                <Route path="/study-abroad" element={<StudyAbroad />} />
                <Route path="/study-abroad/:country" element={<StudyAbroad />} />

                <Route path="/services" element={<Services />} />
                <Route path="/entrance-exams" element={<EntranceExams />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              <Footer />
            </div>
            </CounsellingModalProvider>
          </Router>
        </NavProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
