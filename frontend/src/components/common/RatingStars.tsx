import React from 'react';
import { Box, Rating, Typography } from '@mui/material';
import { Star as StarIcon } from '@mui/icons-material';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  showValue?: boolean;
  size?: 'small' | 'medium' | 'large';
}

// Star rating display
const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 10,
  showValue = true,
  size = 'small',
}) => {
  const normalised = (rating / maxRating) * 5;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Rating
        value={normalised}
        precision={0.1}
        readOnly
        size={size}
        icon={<StarIcon fontSize="inherit" />}
        emptyIcon={<StarIcon fontSize="inherit" style={{ opacity: 0.3 }} />}
      />
      {showValue && (
        <Typography variant="body2" color="secondary" fontWeight={600}>
          {rating.toFixed(1)}
        </Typography>
      )}
    </Box>
  );
};

export default RatingStars;
