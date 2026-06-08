import React, { useEffect, useState, useCallback } from 'react'
import { fetchUpcomingGames } from '../api/rawg.js'
import FilterBar from './FilterBar.jsx'
import GameCard from './GameCard.jsx'

const s = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--bg)',
  },
  header: {
    background: 'var(--bg)',
    borderBottom: '1px solid var(--border)',
    padding: '1rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  logo: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: '1.4rem',
    fontWeight: 900,
    color: 'var(--white)',
    textTransform: 'uppercase',
    letterSpacing: '-0.01em',
    lineHeight: 1,
  },
  logoAccent: { color: 'var(--accent)' },
  logoSub: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: '0.6rem',
    fontWeight: 600,
    color: 'var(--muted)',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    display: 'block',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  count: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: '0.75rem',
    color: 'var(--muted)',
    letterSpacing: '0.08em',
  },
  btnSettings: {
    background: 'transparent',
    border: '1px solid var(--border)',
    color: 'var(--muted)',
    padding: '0.3rem 0.7rem',
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
  main: {
    flex: 1,
    padding: '1.5rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '1rem',
  },
  empty: {
    textAlign: 'center',
    padding: '5rem 2rem',
    color: 'var(--muted)',
  },
  emptyTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: '1.5rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    color: 'var(--border)',
    marginBottom: '0.5rem',
  },
  loader: {
    textAlign: 'center',
    padding: '5rem 2rem',
  },
  loaderText: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: '0.8rem',
    letterSpacing: '0.2em',
    color: 'var(--muted)',
    textTransform: 'uppercase',
    animation: 'pulse 1.2s ease-in-out infinite',
  },
  error: {
    margin: '2rem auto',
    maxWidth: '480px',
    padding: '1.5rem',
    background: 'rgba(255,68,68,0.08)',
    border: '1px solid rgba(255,68,68,0.3)',
    color: '#ff6666',
    fontFamily: "'Barlow', sans-serif",
    fontSize: '0.85rem',
    textAlign: 'center',
  },
  sectionHeading: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.2em',
    color: 'var(--muted)',
    textTransform: 'uppercase',
    marginBottom: '0.75rem',
    marginTop: '1.5rem',
    paddingBottom: '0.4rem',
    borderBottom: '1px solid var(--border)',
  },
}

function groupByWeek(games) {
  const groups = {}
  for (const game of games) {
    const d = new Date(game.released)
    const weekStart = new Date(d)
    weekStart.setDate(d.getDate() - d.getDay() + 1)
    weekStart.setHours(0, 0, 0, 0)
    const key = weekStart.toISOString()
    if (!groups[key]) groups[key] = { date: weekStart, games: [] }
    groups[key].games.push(game)
  }
  return Object.values(groups).sort((a, b) => a.date - b.date)
}

function formatWeekLabel(date) {
  const end = new Date(date)
  end.setDate(date.getDate() + 6)
  const fmt = (d) => d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
  return `Semaine du ${fmt(date)} au ${fmt(end)}`
}

export default function Dashboard({ config, onReset }) {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [platforms, setPlatforms] = useState(config.platforms || [])
  const [genres, setGenres] = useState(config.genres || [])
  const [weeks, setWeeks] = useState(12)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const results = await fetchUpcomingGames({
        apiKey: config.apiKey,
        platforms,
        genres,
        weeks,
      })
      setGames(results)
      // Sauvegarder les préférences
      localStorage.setItem('tc_releases_config', JSON.stringify({
        apiKey: config.apiKey,
        platforms,
        genres,
      }))
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [config.apiKey, platforms, genres, weeks])

  useEffect(() => { load() }, [load])

  const grouped = groupByWeek(games)

  return (
    <div style={s.page}>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>

      {/* Header */}
      <header style={s.header}>
        <div>
  
          <div style={s.logo}>TC<span style={s.logoAccent}>.</span>RELEASES</div>
        </div>
        <div style={s.headerRight}>
          {!loading && (
            <span style={s.count}>
              {games.length} jeu{games.length !== 1 ? 'x' : ''} trouvé{games.length !== 1 ? 's' : ''}
            </span>
          )}
          <button style={s.btnSettings} onClick={onReset}>⚙ Paramètres</button>
        </div>
      </header>

      {/* Filtres */}
      <FilterBar
        platforms={platforms} setPlatforms={setPlatforms}
        genres={genres} setGenres={setGenres}
        weeks={weeks} setWeeks={setWeeks}
        onRefresh={load}
        loading={loading}
      />

      {/* Contenu */}
      <main style={s.main}>
        {loading && (
          <div style={s.loader}>
            <div style={s.loaderText}>Chargement des sorties…</div>
          </div>
        )}

        {!loading && error && (
          <div style={s.error}>
            <strong>Erreur :</strong> {error}
          </div>
        )}

        {!loading && !error && games.length === 0 && (
          <div style={s.empty}>
            <div style={s.emptyTitle}>Aucun résultat</div>
            <p style={{ fontSize: '0.85rem' }}>
              Essaie d'élargir tes filtres ou d'augmenter l'horizon.
            </p>
          </div>
        )}

        {!loading && !error && grouped.map(group => (
          <div key={group.date.toISOString()}>
            <div style={s.sectionHeading}>{formatWeekLabel(group.date)}</div>
            <div style={s.grid}>
              {group.games.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
