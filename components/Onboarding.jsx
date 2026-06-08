import React, { useState } from 'react'
import { validateApiKey, PLATFORMS_LIST, GENRES_LIST } from '../api/rawg.js'

const s = {
  wrap: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    background: 'var(--bg)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  tag: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: 'var(--accent)',
    textTransform: 'uppercase',
    marginBottom: '0.75rem',
    display: 'block',
  },
  title: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 'clamp(2.5rem, 8vw, 5rem)',
    fontWeight: 900,
    lineHeight: 0.9,
    color: 'var(--white)',
    textTransform: 'uppercase',
    letterSpacing: '-0.02em',
  },
  accent: { color: 'var(--accent)' },
  sub: {
    marginTop: '1rem',
    color: 'var(--muted)',
    fontSize: '0.9rem',
    fontWeight: 300,
  },
  card: {
    width: '100%',
    maxWidth: '640px',
    background: 'var(--bg2)',
    border: '1px solid var(--border)',
    padding: '2rem',
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: 'var(--accent)',
    textTransform: 'uppercase',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  step: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '18px',
    height: '18px',
    background: 'var(--accent)',
    color: 'var(--white)',
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: '0.7rem',
    fontWeight: 900,
  },
  inputRow: {
    display: 'flex',
    gap: '0.5rem',
  },
  input: {
    flex: 1,
    background: 'var(--bg3)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
    padding: '0.7rem 1rem',
    fontFamily: "'Barlow', sans-serif",
    fontSize: '0.9rem',
    outline: 'none',
  },
  btnSmall: {
    background: 'var(--accent)',
    color: 'var(--white)',
    border: 'none',
    padding: '0.7rem 1.2rem',
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  hint: {
    marginTop: '0.6rem',
    fontSize: '0.78rem',
    color: 'var(--muted)',
  },
  hintLink: {
    color: 'var(--accent)',
    textDecoration: 'none',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
    gap: '0.4rem',
  },
  chip: (active) => ({
    padding: '0.45rem 0.75rem',
    border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
    background: active ? 'rgba(240,90,26,0.12)' : 'var(--bg3)',
    color: active ? 'var(--accent2)' : 'var(--muted)',
    fontFamily: "'Barlow', sans-serif",
    fontSize: '0.82rem',
    cursor: 'pointer',
    transition: 'all 0.15s',
    textAlign: 'center',
  }),
  btnPrimary: {
    width: '100%',
    maxWidth: '640px',
    padding: '1rem',
    background: 'var(--accent)',
    color: 'var(--white)',
    border: 'none',
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: '1rem',
    fontWeight: 900,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
  error: {
    color: '#ff4444',
    fontSize: '0.82rem',
    marginTop: '0.5rem',
  },
  success: {
    color: '#44cc88',
    fontSize: '0.82rem',
    marginTop: '0.5rem',
  },
}

export default function Onboarding({ onComplete }) {
  const [apiKey, setApiKey] = useState('')
  const [validating, setValidating] = useState(false)
  const [keyStatus, setKeyStatus] = useState(null) // null | 'ok' | 'error'
  const [selectedPlatforms, setSelectedPlatforms] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])

  const handleValidate = async () => {
    if (!apiKey.trim()) return
    setValidating(true)
    setKeyStatus(null)
    try {
      const ok = await validateApiKey(apiKey.trim())
      setKeyStatus(ok ? 'ok' : 'error')
    } catch {
      setKeyStatus('error')
    } finally {
      setValidating(false)
    }
  }

  const togglePlatform = (id) => {
    setSelectedPlatforms(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const toggleGenre = (id) => {
    setSelectedGenres(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const canSubmit = keyStatus === 'ok'

  const handleSubmit = () => {
    if (!canSubmit) return
    onComplete({ apiKey: apiKey.trim(), platforms: selectedPlatforms, genres: selectedGenres })
  }

  return (
    <div style={s.wrap}>
      <div style={s.header}>
  
        <div style={s.title}>
          TC<span style={s.accent}>.</span>RELEASES
        </div>
        <p style={s.sub}>Ton calendrier des sorties, filtré pour toi.</p>
      </div>

      {/* Étape 1 : Clé API */}
      <div style={s.card}>
        <div style={s.sectionTitle}>
          <span style={s.step}>1</span>
          Clé API RAWG
        </div>
        <div style={s.inputRow}>
          <input
            style={s.input}
            type="text"
            placeholder="Colle ta clé RAWG ici…"
            value={apiKey}
            onChange={e => { setApiKey(e.target.value); setKeyStatus(null) }}
            onKeyDown={e => e.key === 'Enter' && handleValidate()}
          />
          <button style={s.btnSmall} onClick={handleValidate} disabled={validating}>
            {validating ? '…' : 'Vérifier'}
          </button>
        </div>
        {keyStatus === 'ok' && <p style={s.success}>✓ Clé valide — on est bons.</p>}
        {keyStatus === 'error' && <p style={s.error}>✗ Clé invalide ou problème réseau.</p>}
        <p style={s.hint}>
          Clé gratuite en 30 secondes sur{' '}
          <a href="https://rawg.io/apidocs" target="_blank" rel="noreferrer" style={s.hintLink}>
            rawg.io/apidocs
          </a>
          . Elle ne quitte pas ton navigateur.
        </p>
      </div>

      {/* Étape 2 : Plateformes */}
      <div style={s.card}>
        <div style={s.sectionTitle}>
          <span style={s.step}>2</span>
          Plateformes qui t'intéressent <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(optionnel)</span>
        </div>
        <div style={s.grid}>
          {PLATFORMS_LIST.map(p => (
            <button
              key={p.id}
              style={s.chip(selectedPlatforms.includes(p.id))}
              onClick={() => togglePlatform(p.id)}
            >
              {p.name}
            </button>
          ))}
        </div>
        <p style={s.hint}>Aucune sélection = toutes les plateformes.</p>
      </div>

      {/* Étape 3 : Genres */}
      <div style={s.card}>
        <div style={s.sectionTitle}>
          <span style={s.step}>3</span>
          Genres <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(optionnel)</span>
        </div>
        <div style={s.grid}>
          {GENRES_LIST.map(g => (
            <button
              key={g.id}
              style={s.chip(selectedGenres.includes(g.id))}
              onClick={() => toggleGenre(g.id)}
            >
              {g.name}
            </button>
          ))}
        </div>
        <p style={s.hint}>Aucune sélection = tous les genres.</p>
      </div>

      <button
        style={{ ...s.btnPrimary, opacity: canSubmit ? 1 : 0.4 }}
        onClick={handleSubmit}
        disabled={!canSubmit}
      >
        Afficher le calendrier →
      </button>
    </div>
  )
}
