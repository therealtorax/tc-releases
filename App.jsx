import React, { useState, useEffect } from 'react'
import Onboarding from './components/Onboarding.jsx'
import Dashboard from './components/Dashboard.jsx'

const STORAGE_KEY = 'tc_releases_config'

export default function App() {
  const [config, setConfig] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed?.apiKey) setConfig(parsed)
      }
    } catch {}
    setReady(true)
  }, [])

  const handleOnboardingComplete = (cfg) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg))
    setConfig(cfg)
  }

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY)
    setConfig(null)
  }

  if (!ready) return null

  if (!config) {
    return <Onboarding onComplete={handleOnboardingComplete} />
  }

  return <Dashboard config={config} onReset={handleReset} />
}
