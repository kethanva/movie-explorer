import React from 'react';
import {
  Typography, Box, Avatar, Grid, Card, CardContent,
  CardMedia, Button, Chip,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, CalendarToday as CalendarIcon } from '@mui/icons-material';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useActor } from '../hooks/useActor';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import RatingStars from '../components/common/RatingStars';
import EmptyState from '../components/common/EmptyState';

const PLACEHOLDER_POSTER = 'https://via.placeholder.com/300x450/1F1F1F/B3B3B3?text=No+Poster';

const ActorProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { actor, loading, error } = useActor(Number(id));

  if (loading) return <LoadingSpinner message="Loading actor profile..." fullPage />;
  if (error || !actor) return <ErrorMessage message={error || 'Actor not found'} onRetry={() => navigate(-1)} />;

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 3 }}>
        Back
      </Button>

      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        <Avatar sx={{ width: 100, height: 100, bgcolor: 'secondary.dark', fontSize: '2.5rem' }}>
          {actor.name[0]}
        </Avatar>
        <Box>
          <Typography variant="h4" fontWeight={700}>{actor.name}</Typography>
          {actor.birth_date && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
              <CalendarIcon fontSize="small" color="action" />
              <Typography color="text.secondary">
                Born {new Date(actor.birth_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </Typography>
            </Box>
          )}
          {actor.nationality && (
            <Chip label={actor.nationality} size="small" sx={{ mt: 1 }} />
          )}
          {actor.bio && (
            <Typography color="text.secondary" sx={{ mt: 1.5, maxWidth: 700, lineHeight: 1.8 }}>
              {actor.bio}
            </Typography>
          )}
        </Box>
      </Box>

      <Typography variant="h5" fontWeight={600} gutterBottom>
        Filmography {actor.movies && `(${actor.movies.length})`}
      </Typography>

      {!actor.movies || actor.movies.length === 0 ? (
        <EmptyState title="No movies found" message="This actor has no movies listed yet." />
      ) : (
        <Grid container spacing={3}>
          {actor.movies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <Card component={Link} to={`/movies/${movie.id}`} sx={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  image={movie.poster_url || PLACEHOLDER_POSTER}
                  alt={movie.title}
                  sx={{ height: 240, objectFit: 'cover' }}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.src = PLACEHOLDER_POSTER; }}
                />
                <CardContent>
                  <Typography fontWeight={600} noWrap>{movie.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{movie.release_year}</Typography>
                  <RatingStars rating={movie.rating} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ActorProfilePage;
