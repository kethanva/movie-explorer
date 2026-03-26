import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { FavoritesProvider } from '../../context/FavoritesContext'
import MovieCard from './MovieCard'
import { Movie } from '../../types'

const movie: Movie = {
  id: 5,
  title: 'The Dark Knight',
  release_year: 2008,
  rating: 9.0,
  genres: [{ id: 1, name: 'Action' }],
  director: { id: 1, name: 'Christopher Nolan' },
  actors: [],
}

function renderCard(m = movie) {
  render(
    <BrowserRouter>
      <FavoritesProvider>
        <MovieCard movie={m} />
      </FavoritesProvider>
    </BrowserRouter>
  )
}

beforeEach(() => {
  localStorage.clear()
})

describe('MovieCard', () => {
  it('shows the title', () => {
    renderCard()
    expect(screen.getByText('The Dark Knight')).toBeInTheDocument()
  })

  it('shows the year and director', () => {
    renderCard()
    expect(screen.getByText(/2008/)).toBeInTheDocument()
    expect(screen.getByText(/Christopher Nolan/)).toBeInTheDocument()
  })

  it('shows genres', () => {
    renderCard()
    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  it('links to the detail page', () => {
    renderCard()
    const links = screen.getAllByRole('link')
    expect(links.some(l => l.getAttribute('href') === '/movies/5')).toBe(true)
  })

  it('clicking the heart marks it as favourite', () => {
    renderCard()
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('button').className).toContain('colorError')
  })

  it('shows placeholder when no poster', () => {
    renderCard({ ...movie, poster_url: undefined })
    const img = screen.getByAltText('The Dark Knight') as HTMLImageElement
    expect(img.src).toContain('placeholder')
  })
})
