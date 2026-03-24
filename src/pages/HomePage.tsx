import React, { useState } from 'react';
import { Typography, Box, TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { MovieFilters } from '../types';
import { useMovies } from '../hooks/useMovies';
import MovieFiltersPanel from '../components/movies/MovieFilters';
import MovieGrid from '../components/movies/MovieGrid';

const HomePage: React.FC = () => {
  const [filters, setFilters] = useState<MovieFilters>({ page: 1, per_page: 12 });
  const [search, setSearch] = useState('');

  const { movies, loading, error, total, totalPages } = useMovies(filters);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ ...filters, search: search.trim() || undefined, page: 1 });
  };

  const handleFilterChange = (newFilters: MovieFilters) => {
    setFilters({ ...filters, ...newFilters, page: 1 });
  };

  const handleClearFilters = () => {
    setSearch('');
    setFilters({ page: 1, per_page: 12 });
  };

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Discover Movies
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {total > 0 ? `${total} movies available` : 'Explore the full catalogue'}
        </Typography>

        <Box component="form" onSubmit={handleSearchSubmit} sx={{ mb: 3, maxWidth: 480 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <MovieFiltersPanel filters={filters} onChange={handleFilterChange} onClear={handleClearFilters} />
      </Box>

      <MovieGrid
        movies={movies}
        loading={loading}
        error={error}
        totalPages={totalPages}
        currentPage={filters.page || 1}
        onPageChange={(page) => setFilters({ ...filters, page })}
        onClearFilters={handleClearFilters}
      />
    </>
  );
};

export default HomePage;
