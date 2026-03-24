import React, { createContext, useContext, useState, useEffect } from 'react';
import { SavedMovie, Movie, WatchStatus } from '../types';

interface FavoritesContextValue {
  savedMovies: SavedMovie[];
  addMovie: (movie: Movie, status: WatchStatus) => void;
  removeMovie: (movieId: number) => void;
  isMovieSaved: (movieId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

const STORAGE_KEY = 'movie_explorer_saved';

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedMovies, setSavedMovies] = useState<SavedMovie[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedMovies));
  }, [savedMovies]);

  const addMovie = (movie: Movie, status: WatchStatus) => {
    const entry: SavedMovie = {
      id: movie.id,
      title: movie.title,
      release_year: movie.release_year,
      poster_url: movie.poster_url,
      rating: movie.rating,
      genres: movie.genres,
      status,
      saved_at: new Date().toISOString(),
    };
    setSavedMovies((prev) => {
      const exists = prev.findIndex((m) => m.id === movie.id);
      if (exists >= 0) {
        const updated = [...prev];
        updated[exists] = entry;
        return updated;
      }
      return [...prev, entry];
    });
  };

  const removeMovie = (movieId: number) => {
    setSavedMovies((prev) => prev.filter((m) => m.id !== movieId));
  };

  const isMovieSaved = (movieId: number) => savedMovies.some((m) => m.id === movieId);

  return (
    <FavoritesContext.Provider value={{ savedMovies, addMovie, removeMovie, isMovieSaved }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
};
