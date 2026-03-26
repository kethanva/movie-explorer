import React from 'react';
import { Grid, Pagination, Box } from '@mui/material';
import { Movie } from '../../types';
import MovieCard from './MovieCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import EmptyState from '../common/EmptyState';

interface MovieGridProps {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onClearFilters?: () => void;
}

// Paginated movie grid
const MovieGrid: React.FC<MovieGridProps> = ({
  movies, loading, error, totalPages, currentPage, onPageChange, onClearFilters,
}) => {
  if (loading) return <LoadingSpinner message="Loading movies..." />;
  if (error) return <ErrorMessage message={error} />;
  if (movies.length === 0) {
    return (
      <EmptyState
        title="No movies found"
        message="Try adjusting your search or filters."
        actionLabel={onClearFilters ? 'Clear Filters' : undefined}
        onAction={onClearFilters}
      />
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => onPageChange(page)}
            color="primary"
          />
        </Box>
      )}
    </>
  );
};

export default MovieGrid;
