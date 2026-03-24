import { useState, useEffect } from 'react';
import { Actor } from '../types';
import { getActorById } from '../services/actorService';

export const useActor = (id: number) => {
  const [actor, setActor] = useState<Actor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getActorById(id)
      .then(setActor)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { actor, loading, error };
};
