import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Chip, Box, IconButton } from '@mui/material';
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Movie } from '../../types';
import { useFavorites } from '../../context/FavoritesContext';
import RatingStars from '../common/RatingStars';

const PLACEHOLDER_POSTER = 'https://via.placeholder.com/300x450/1F1F1F/B3B3B3?text=No+Poster';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { addMovie, removeMovie, isMovieSaved } = useFavorites();
  const saved = isMovieSaved(movie.id);

  const toggleFavorite = () => {
    if (saved) {
      removeMovie(movie.id);
    } else {
      addMovie(movie, 'favorite');
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box component={Link} to={`/movies/${movie.id}`} sx={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          image={movie.poster_url || PLACEHOLDER_POSTER}
          alt={movie.title}
          sx={{ height: 300, objectFit: 'cover' }}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.src = PLACEHOLDER_POSTER;
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component={Link}
          to={`/movies/${movie.id}`}
          sx={{ textDecoration: 'none', color: 'text.primary', display: 'block', mb: 0.5 }}
          noWrap
        >
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {movie.release_year} &bull; {movie.director.name}
        </Typography>
        <RatingStars rating={movie.rating} />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
          {movie.genres.slice(0, 3).map((g) => (
            <Chip key={g.id} label={g.name} size="small" variant="outlined" color="secondary" />
          ))}
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <IconButton size="small" onClick={toggleFavorite} color={saved ? 'error' : 'default'}>
          {saved ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
