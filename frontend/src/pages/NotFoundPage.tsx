import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

// 404 not found page
const NotFoundPage: React.FC = () => (
  <Box
    sx={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      minHeight: '60vh', textAlign: 'center', gap: 2,
    }}
  >
    <Typography variant="h1" color="primary" fontWeight={900} sx={{ fontSize: '8rem', lineHeight: 1 }}>
      404
    </Typography>
    <Typography variant="h5" fontWeight={600}>Page Not Found</Typography>
    <Typography color="text.secondary">
      The page you are looking for doesn't exist or has been moved.
    </Typography>
    <Button variant="contained" startIcon={<HomeIcon />} component={Link} to="/" size="large">
      Go Home
    </Button>
  </Box>
);

export default NotFoundPage;
