import React, { createContext, useContext, useState, useCallback } from 'react'

const STORAGE_KEY = 'counsellingModalDismissedUntil'
const HIDE_DAYS = 7

const CounsellingModalContext = createContext(null)

export function CounsellingModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    const until = Date.now() + HIDE_DAYS * 24 * 60 * 60 * 1000
    localStorage.setItem(STORAGE_KEY, String(until))
  }, [])

  const value = { isOpen, openModal, closeModal }
  return (
    <CounsellingModalContext.Provider value={value}>
      {children}
    </CounsellingModalContext.Provider>
  )
}

export function useCounsellingModal() {
  const ctx = useContext(CounsellingModalContext)
  if (!ctx) return { isOpen: false, openModal: () => {}, closeModal: () => {} }
  return ctx
}
