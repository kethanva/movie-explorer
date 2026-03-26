import { useState, useEffect } from 'react';
import { Movie } from '../types';
import { getMovieById } from '../services/movieService';

// Fetch single movie
export const useMovie = (id: number) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getMovieById(id)
      .then(setMovie)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { movie, loading, error };
};
