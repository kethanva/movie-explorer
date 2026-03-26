import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingSpinnerProps {
  message?: string;
  fullPage?: boolean;
}

// Loading spinner indicator
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading...',
  fullPage = false,
}) => (
  <Box
    sx={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 2,
      minHeight: fullPage ? '60vh' : 200,
    }}
  >
    <CircularProgress color="primary" />
    <Typography color="text.secondary">{message}</Typography>
  </Box>
);

export default LoadingSpinner;
