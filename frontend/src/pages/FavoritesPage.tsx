import React from 'react';
import {
  Typography, Box, Grid, Card, CardMedia,
  CardContent, CardActions, Chip, IconButton,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import RatingStars from '../components/common/RatingStars';
import EmptyState from '../components/common/EmptyState';

const PLACEHOLDER_POSTER = 'https://via.placeholder.com/300x450/1F1F1F/B3B3B3?text=No+Poster';

// Saved favorites page
const FavoritesPage: React.FC = () => {
  const { savedMovies, removeMovie } = useFavorites();

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Favorites ({savedMovies.length})
      </Typography>

      {savedMovies.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          message="Browse movies and click the heart icon to save them here."
        />
      ) : (
        <Grid container spacing={3}>
          {savedMovies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box component={Link} to={`/movies/${movie.id}`} sx={{ textDecoration: 'none' }}>
                  <CardMedia
                    component="img"
                    image={movie.poster_url || PLACEHOLDER_POSTER}
                    alt={movie.title}
                    sx={{ height: 280, objectFit: 'cover' }}
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      e.currentTarget.src = PLACEHOLDER_POSTER;
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    fontWeight={600}
                    component={Link}
                    to={`/movies/${movie.id}`}
                    sx={{ textDecoration: 'none', color: 'text.primary', display: 'block' }}
                    noWrap
                  >
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {movie.release_year}
                  </Typography>
                  <RatingStars rating={movie.rating} />
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                    {movie.genres.slice(0, 2).map((g) => (
                      <Chip key={g.id} label={g.name} size="small" variant="outlined" color="secondary" />
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <IconButton size="small" color="error" onClick={() => removeMovie(movie.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FavoritesPage;
