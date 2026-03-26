import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getMovies } from './movieService'

vi.mock('./api', () => ({
  apiClient: {
    get: vi.fn().mockResolvedValue({
      data: { items: [], total: 0, page: 1, per_page: 20, total_pages: 1 }
    })
  }
}))

import { apiClient } from './api'

beforeEach(() => {
  vi.clearAllMocks()
})

describe('getMovies', () => {
  it('calls the right endpoint', async () => {
    await getMovies()
    expect(apiClient.get).toHaveBeenCalledWith('/api/movies', expect.any(Object))
  })

  it('removes undefined filters before sending', async () => {
    await getMovies({ genre_id: undefined, search: 'batman' })
    expect(apiClient.get).toHaveBeenCalledWith('/api/movies', {
      params: { search: 'batman' }
    })
  })

  it('removes empty string filters', async () => {
    await getMovies({ director_id: '', year: '2020' })
    expect(apiClient.get).toHaveBeenCalledWith('/api/movies', {
      params: { year: '2020' }
    })
  })
})
