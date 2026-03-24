import { useState, useEffect } from 'react';
import { Director } from '../types';
import { getDirectorById } from '../services/directorService';

export const useDirector = (id: number) => {
  const [director, setDirector] = useState<Director | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getDirectorById(id)
      .then(setDirector)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { director, loading, error };
};
