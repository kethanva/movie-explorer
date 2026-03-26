import { apiClient } from './api';
import { Movie, MovieFilters, PaginatedResponse } from '../types';

// Fetch filtered paginated movies
export const getMovies = async (
  filters: MovieFilters = {}
): Promise<PaginatedResponse<Movie>> => {
  const params = Object.fromEntries(
    Object.entries(filters).filter(([, v]) => v !== undefined && v !== '')
  );
  const response = await apiClient.get<PaginatedResponse<Movie>>('/api/movies', { params });
  return response.data;
};

// Fetch movie by id
export const getMovieById = async (id: number): Promise<Movie> => {
  const response = await apiClient.get<Movie>(`/api/movies/${id}`);
  return response.data;
};
