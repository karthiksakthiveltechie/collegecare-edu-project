import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import './styles/globals.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <App onMount={() => document.dispatchEvent(new Event('render-event'))} />
      </ErrorBoundary>
    </HelmetProvider>
  </React.StrictMode>,
)
