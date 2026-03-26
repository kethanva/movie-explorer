import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import React from 'react'
import { FavoritesProvider, useFavorites } from './FavoritesContext'
import { Movie } from '../types'

const movie: Movie = {
  id: 1,
  title: 'Inception',
  release_year: 2010,
  rating: 8.8,
  genres: [{ id: 1, name: 'Sci-Fi' }],
  director: { id: 1, name: 'Christopher Nolan' },
  actors: [],
}

function wrapper({ children }: { children: React.ReactNode }) {
  return <FavoritesProvider>{children}</FavoritesProvider>
}

beforeEach(() => {
  localStorage.clear()
})

describe('FavoritesContext', () => {
  it('starts with no saved movies', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper })
    expect(result.current.savedMovies).toHaveLength(0)
  })

  it('can add a movie', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper })
    act(() => result.current.addMovie(movie, 'favorite'))
    expect(result.current.savedMovies).toHaveLength(1)
    expect(result.current.savedMovies[0].title).toBe('Inception')
  })

  it('adding the same movie again just updates it', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper })
    act(() => result.current.addMovie(movie, 'favorite'))
    act(() => result.current.addMovie(movie, 'watch_later'))
    expect(result.current.savedMovies).toHaveLength(1)
    expect(result.current.savedMovies[0].status).toBe('watch_later')
  })

  it('can remove a movie', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper })
    act(() => result.current.addMovie(movie, 'favorite'))
    act(() => result.current.removeMovie(movie.id))
    expect(result.current.savedMovies).toHaveLength(0)
  })

  it('isMovieSaved works', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper })
    expect(result.current.isMovieSaved(movie.id)).toBe(false)
    act(() => result.current.addMovie(movie, 'favorite'))
    expect(result.current.isMovieSaved(movie.id)).toBe(true)
  })

  it('saves to localStorage', () => {
    const { result } = renderHook(() => useFavorites(), { wrapper })
    act(() => result.current.addMovie(movie, 'favorite'))
    const saved = JSON.parse(localStorage.getItem('movie_explorer_saved') || '[]')
    expect(saved[0].title).toBe('Inception')
  })
})
