import React, { useState } from 'react'

function daysUntil(dateStr) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const release = new Date(dateStr)
  const diff = Math.ceil((release - today) / (1000 * 60 * 60 * 24))
  return diff
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function getDaysBadge(days) {
  if (days <= 7) return { label: `J-${days}`, color: '#f05a1a' }
  if (days <= 30) return { label: `J-${days}`, color: '#e8a020' }
  return { label: `J-${days}`, color: '#4a7a4a' }
}

export default function GameCard({ game }) {
  const [imgError, setImgError] = useState(false)
  const days = daysUntil(game.released)
  const badge = getDaysBadge(days)

  const platforms = game.platforms
    ? game.platforms.map(p => p.platform.name).slice(0, 3).join(' · ')
    : ''

  const genres = game.genres
    ? game.genres.map(g => g.name).slice(0, 2).join(', ')
    : ''

  const metacritic = game.metacritic

  return (
    <div style={{
      background: 'var(--bg2)',
      border: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      transition: 'border-color 0.2s',
      position: 'relative',
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      {/* Image */}
      <div style={{ position: 'relative', aspectRatio: '16/9', background: 'var(--bg3)', overflow: 'hidden' }}>
        {game.background_image && !imgError ? (
          <img
            src={game.background_image}
            alt={game.name}
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--muted)', fontSize: '0.75rem', fontFamily: "'Barlow Condensed', sans-serif",
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            Pas d'image
          </div>
        )}
        {/* Badge J- */}
        <div style={{
          position: 'absolute', top: '0.6rem', right: '0.6rem',
          background: badge.color,
          color: '#fff',
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: '0.75rem', fontWeight: 900,
          letterSpacing: '0.05em',
          padding: '0.2rem 0.5rem',
        }}>
          {badge.label}
        </div>
        {/* Metacritic */}
        {metacritic && (
          <div style={{
            position: 'absolute', top: '0.6rem', left: '0.6rem',
            background: metacritic >= 75 ? '#2d7a2d' : metacritic >= 50 ? '#7a6a2d' : '#7a2d2d',
            color: '#fff',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: '0.75rem', fontWeight: 900,
            padding: '0.2rem 0.5rem',
          }}>
            {metacritic}
          </div>
        )}
      </div>

      {/* Contenu */}
      <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: '1.05rem',
          fontWeight: 700,
          color: 'var(--white)',
          lineHeight: 1.1,
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
        }}>
          {game.name}
        </div>

        {genres && (
          <div style={{
            fontSize: '0.72rem',
            color: 'var(--accent)',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            {genres}
          </div>
        )}

        <div style={{
          fontSize: '0.8rem',
          color: 'var(--muted)',
          marginTop: 'auto',
          paddingTop: '0.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '0.5rem',
        }}>
          <span>{formatDate(game.released)}</span>
          {platforms && (
            <span style={{ fontSize: '0.68rem', textAlign: 'right', lineHeight: 1.3 }}>{platforms}</span>
          )}
        </div>
      </div>
    </div>
  )
}
