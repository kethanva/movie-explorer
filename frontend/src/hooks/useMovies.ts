import { useState, useEffect } from 'react';
import { Movie, MovieFilters, PaginatedResponse } from '../types';
import { getMovies } from '../services/movieService';

interface UseMoviesResult {
  movies: Movie[];
  total: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

export const useMovies = (filters: MovieFilters): UseMoviesResult => {
  const [data, setData] = useState<PaginatedResponse<Movie> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getMovies(filters)
      .then((res) => setData(res))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  return {
    movies: data?.items ?? [],
    total: data?.total ?? 0,
    totalPages: data?.total_pages ?? 0,
    loading,
    error,
  };
};
