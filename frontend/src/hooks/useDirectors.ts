import { useState, useEffect } from 'react';
import { Director } from '../types';
import { getDirectors } from '../services/directorService';

// Fetch all directors
export const useDirectors = () => {
  const [directors, setDirectors] = useState<Director[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDirectors({ per_page: 100 })
      .then((res) => setDirectors(res.items))
      .finally(() => setLoading(false));
  }, []);

  return { directors, loading };
};
