const BASE = 'https://api.rawg.io/api'

export async function fetchUpcomingGames({ apiKey, platforms, genres, weeks = 12 }) {
  const today = new Date()
  const future = new Date()
  future.setDate(today.getDate() + weeks * 7)

  const fmt = (d) => d.toISOString().split('T')[0]
  const dateRange = `${fmt(today)},${fmt(future)}`

  const params = new URLSearchParams({
    key: apiKey,
    dates: dateRange,
    ordering: 'released',
    page_size: 40,
  })

  if (platforms && platforms.length > 0) {
    params.append('platforms', platforms.join(','))
  }
  if (genres && genres.length > 0) {
    params.append('genres', genres.join(','))
  }

  const res = await fetch(`${BASE}/games?${params}`)
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.detail || `Erreur API RAWG (${res.status})`)
  }
  const data = await res.json()
  return data.results || []
}

export async function validateApiKey(apiKey) {
  const res = await fetch(`${BASE}/games?key=${apiKey}&page_size=1`)
  return res.ok
}

export const PLATFORMS = [
  { id: 7,   name: 'PC' },
  { id: 187, name: 'PS5' },
  { id: 18,  name: 'PS4' },
  { id: 186, name: 'Xbox Series X' },
  { id: 1,   name: 'Xbox One' },
  { id: 7,   name: 'PC' },
  { id: 21,  name: 'Android' },
  { id: 3,   name: 'iOS' },
  { id: 7,   name: 'PC' },
].filter((p, i, arr) => arr.findIndex(x => x.id === p.id) === i)

export const PLATFORMS_LIST = [
  { id: 187, name: 'PS5' },
  { id: 18,  name: 'PS4' },
  { id: 186, name: 'Xbox Series X/S' },
  { id: 1,   name: 'Xbox One' },
  { id: 7,   name: 'PC' },
  { id: 4,   name: 'PC (autre)' },
  { id: 21,  name: 'Android' },
  { id: 3,   name: 'iOS' },
]

export const GENRES_LIST = [
  { id: 4,  name: 'Action' },
  { id: 51, name: 'Indie' },
  { id: 3,  name: 'Aventure' },
  { id: 5,  name: 'RPG' },
  { id: 2,  name: 'Tir (Shooter)' },
  { id: 10, name: 'Stratégie' },
  { id: 14, name: 'Simulation' },
  { id: 7,  name: 'Puzzle' },
  { id: 11, name: 'Arcade' },
  { id: 83, name: 'Plateforme' },
  { id: 1,  name: 'Course' },
  { id: 15, name: 'Sport' },
  { id: 6,  name: 'Combat' },
  { id: 19, name: 'Famille' },
]
