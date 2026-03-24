import React from 'react';
import {
  Box, FormControl, InputLabel, Select, MenuItem,
  Button, Grid, Typography,
} from '@mui/material';
import { Clear as ClearIcon, FilterList as FilterIcon } from '@mui/icons-material';
import { MovieFilters } from '../../types';
import { useGenres } from '../../hooks/useGenres';
import { useDirectors } from '../../hooks/useDirectors';
import { useActors } from '../../hooks/useActors';

interface MovieFiltersProps {
  filters: MovieFilters;
  onChange: (filters: MovieFilters) => void;
  onClear: () => void;
}

const RELEASE_YEARS = Array.from({ length: 35 }, (_, i) => String(2024 - i));

const MovieFiltersPanel: React.FC<MovieFiltersProps> = ({ filters, onChange, onClear }) => {
  const { genres } = useGenres();
  const { directors } = useDirectors();
  const { actors } = useActors();

  const handleChange = (key: keyof MovieFilters, value: string) => {
    onChange({ ...filters, [key]: value || undefined, page: 1 });
  };

  const hasActiveFilters = Boolean(
    filters.genre_id || filters.director_id || filters.actor_id || filters.year
  );

  return (
    <Box sx={{ backgroundColor: 'background.paper', borderRadius: 2, p: 2.5, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterIcon fontSize="small" color="primary" />
          <Typography variant="subtitle2" fontWeight={600}>Filters</Typography>
        </Box>
        {hasActiveFilters && (
          <Button size="small" startIcon={<ClearIcon />} onClick={onClear} color="inherit">
            Clear all
          </Button>
        )}
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Genre</InputLabel>
            <Select
              value={filters.genre_id || ''}
              label="Genre"
              onChange={(e) => handleChange('genre_id', e.target.value)}
            >
              <MenuItem value="">All Genres</MenuItem>
              {genres.map((g) => (
                <MenuItem key={g.id} value={String(g.id)}>{g.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Director</InputLabel>
            <Select
              value={filters.director_id || ''}
              label="Director"
              onChange={(e) => handleChange('director_id', e.target.value)}
            >
              <MenuItem value="">All Directors</MenuItem>
              {directors.map((d) => (
                <MenuItem key={d.id} value={String(d.id)}>{d.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Actor</InputLabel>
            <Select
              value={filters.actor_id || ''}
              label="Actor"
              onChange={(e) => handleChange('actor_id', e.target.value)}
            >
              <MenuItem value="">All Actors</MenuItem>
              {actors.map((a) => (
                <MenuItem key={a.id} value={String(a.id)}>{a.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Year</InputLabel>
            <Select
              value={filters.year || ''}
              label="Year"
              onChange={(e) => handleChange('year', e.target.value)}
            >
              <MenuItem value="">All Years</MenuItem>
              {RELEASE_YEARS.map((y) => (
                <MenuItem key={y} value={y}>{y}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MovieFiltersPanel;
