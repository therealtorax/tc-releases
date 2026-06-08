import React from 'react'
import { PLATFORMS_LIST, GENRES_LIST } from '../api/rawg.js'

const s = {
  bar: {
    background: 'var(--bg2)',
    borderBottom: '1px solid var(--border)',
    padding: '0.75rem 1.5rem',
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  label: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: '0.6rem',
    fontWeight: 700,
    letterSpacing: '0.18em',
    color: 'var(--accent)',
    textTransform: 'uppercase',
  },
  chips: {
    display: 'flex',
    gap: '0.3rem',
    flexWrap: 'wrap',
  },
  chip: (active) => ({
    padding: '0.25rem 0.6rem',
    border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
    background: active ? 'rgba(240,90,26,0.15)' : 'transparent',
    color: active ? 'var(--accent2)' : 'var(--muted)',
    fontFamily: "'Barlow', sans-serif",
    fontSize: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.12s',
    whiteSpace: 'nowrap',
  }),
  weeksGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    marginLeft: 'auto',
    alignSelf: 'center',
  },
  select: {
    background: 'var(--bg3)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
    padding: '0.25rem 0.6rem',
    fontFamily: "'Barlow', sans-serif",
    fontSize: '0.8rem',
    outline: 'none',
    cursor: 'pointer',
  },
}

export default function FilterBar({
  platforms, setPlatforms,
  genres, setGenres,
  weeks, setWeeks,
  onRefresh, loading,
}) {
  const togglePlatform = (id) => {
    setPlatforms(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }
  const toggleGenre = (id) => {
    setGenres(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  return (
    <div style={s.bar}>
      <div style={s.group}>
        <span style={s.label}>Plateformes</span>
        <div style={s.chips}>
          {PLATFORMS_LIST.map(p => (
            <button
              key={p.id}
              style={s.chip(platforms.includes(p.id))}
              onClick={() => togglePlatform(p.id)}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div style={s.group}>
        <span style={s.label}>Genres</span>
        <div style={s.chips}>
          {GENRES_LIST.map(g => (
            <button
              key={g.id}
              style={s.chip(genres.includes(g.id))}
              onClick={() => toggleGenre(g.id)}
            >
              {g.name}
            </button>
          ))}
        </div>
      </div>

      <div style={s.weeksGroup}>
        <span style={s.label}>Horizon</span>
        <select
          style={s.select}
          value={weeks}
          onChange={e => setWeeks(Number(e.target.value))}
        >
          <option value={4}>4 semaines</option>
          <option value={8}>8 semaines</option>
          <option value={12}>12 semaines</option>
          <option value={24}>6 mois</option>
        </select>
      </div>

      <div style={{ ...s.weeksGroup }}>
        <span style={s.label}>&nbsp;</span>
        <button
          onClick={onRefresh}
          disabled={loading}
          style={{
            background: 'var(--accent)',
            border: 'none',
            color: '#fff',
            padding: '0.28rem 0.9rem',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.5 : 1,
          }}
        >
          {loading ? '…' : '↺ Actualiser'}
        </button>
      </div>
    </div>
  )
}
