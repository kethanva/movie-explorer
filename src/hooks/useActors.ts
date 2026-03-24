import { useState, useEffect } from 'react';
import { Actor } from '../types';
import { getActors } from '../services/actorService';

export const useActors = () => {
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActors({ per_page: 100 })
      .then((res) => setActors(res.items))
      .finally(() => setLoading(false));
  }, []);

  return { actors, loading };
};
