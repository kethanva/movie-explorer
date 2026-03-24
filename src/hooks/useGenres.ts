import { useState, useEffect } from 'react';
import { Genre } from '../types';
import { getGenres } from '../services/genreService';

export const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGenres()
      .then(setGenres)
      .finally(() => setLoading(false));
  }, []);

  return { genres, loading };
};
