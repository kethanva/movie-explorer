import React from 'react';
import {
  Typography, Box, Chip, Grid, Avatar,
  Divider, Button, IconButton, Paper,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon,
  CalendarToday as CalendarIcon, Person as PersonIcon,
} from '@mui/icons-material';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMovie } from '../hooks/useMovie';
import { useFavorites } from '../context/FavoritesContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import RatingStars from '../components/common/RatingStars';

const PLACEHOLDER_POSTER = 'https://via.placeholder.com/400x600/1F1F1F/B3B3B3?text=No+Poster';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { movie, loading, error } = useMovie(Number(id));
  const { addMovie, removeMovie, isMovieSaved } = useFavorites();

  if (loading) return <LoadingSpinner message="Loading movie details..." fullPage />;
  if (error || !movie) return <ErrorMessage message={error || 'Movie not found'} />;

  const saved = isMovieSaved(movie.id);

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 3 }}>
        Back
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4} lg={3}>
          <Box
            component="img"
            src={movie.poster_url || PLACEHOLDER_POSTER}
            alt={movie.title}
            sx={{ width: '100%', borderRadius: 2, boxShadow: 6 }}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src = PLACEHOLDER_POSTER;
            }}
          />
        </Grid>

        <Grid item xs={12} md={8} lg={9}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            {movie.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CalendarIcon fontSize="small" color="action" />
              <Typography color="text.secondary">{movie.release_year}</Typography>
            </Box>
            <RatingStars rating={movie.rating} size="medium" />
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
            {movie.genres.map((g) => (
              <Chip key={g.id} label={g.name} color="secondary" variant="outlined" />
            ))}
          </Box>

          <IconButton
            onClick={() => saved ? removeMovie(movie.id) : addMovie(movie, 'favorite')}
            color={saved ? 'error' : 'default'}
            sx={{ border: 1, borderColor: 'divider', mb: 3 }}
          >
            {saved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>

          {movie.synopsis && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>Synopsis</Typography>
              <Typography color="text.secondary" lineHeight={1.8}>{movie.synopsis}</Typography>
            </Box>
          )}

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>Director</Typography>
            <Box
              component={Link}
              to={`/directors/${movie.director.id}`}
              sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'text.primary' }}
            >
              <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.dark' }}>
                {movie.director.name[0]}
              </Avatar>
              <Typography fontWeight={500}>{movie.director.name}</Typography>
            </Box>
          </Box>

          {movie.actors.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>Cast</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {movie.actors.map((actor) => (
                  <Chip
                    key={actor.id}
                    label={actor.name}
                    component={Link}
                    to={`/actors/${actor.id}`}
                    clickable
                    icon={<PersonIcon />}
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>

      {movie.reviews && movie.reviews.length > 0 && (
        <Box sx={{ mt: 5 }}>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Reviews ({movie.reviews.length})
          </Typography>
          <Grid container spacing={2}>
            {movie.reviews.map((review) => (
              <Grid item xs={12} md={6} key={review.id}>
                <Paper variant="outlined" sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography fontWeight={600}>{review.reviewer}</Typography>
                    <RatingStars rating={review.rating} />
                  </Box>
                  <Typography variant="body2" color="text.secondary">{review.comment}</Typography>
                  <Typography variant="caption" color="text.disabled" sx={{ mt: 1, display: 'block' }}>
                    {new Date(review.date).toLocaleDateString()}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default MovieDetailPage;
