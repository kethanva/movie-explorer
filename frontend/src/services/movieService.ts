import { apiClient } from './api';
import { Movie, MovieFilters, PaginatedResponse } from '../types';

/**
 * Fetches a paginated list of movies with optional filters.
 * Filtering is performed server-side.
 */
export const getMovies = async (
  filters: MovieFilters = {}
): Promise<PaginatedResponse<Movie>> => {
  const params = Object.fromEntries(
    Object.entries(filters).filter(([, v]) => v !== undefined && v !== '')
  );
  const response = await apiClient.get<PaginatedResponse<Movie>>('/api/movies', { params });
  return response.data;
};

/** Fetches a single movie by its ID, including full cast and review details. */
export const getMovieById = async (id: number): Promise<Movie> => {
  const response = await apiClient.get<Movie>(`/api/movies/${id}`);
  return response.data;
};
