import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Movie as MovieIcon } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'background.paper', backgroundImage: 'none' }}>
      <Toolbar sx={{ gap: 2 }}>
        <Box
          component={Link}
          to="/"
          sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'primary.main' }}
        >
          <MovieIcon />
          <Typography variant="h6" fontWeight={700} color="primary">
            MovieExplorer
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          component={Link}
          to="/"
          color={location.pathname === '/' ? 'primary' : 'inherit'}
          sx={{ color: location.pathname === '/' ? 'primary.main' : 'text.primary' }}
        >
          Movies
        </Button>
        <Button
          component={Link}
          to="/favorites"
          color={location.pathname === '/favorites' ? 'primary' : 'inherit'}
          sx={{ color: location.pathname === '/favorites' ? 'primary.main' : 'text.primary' }}
        >
          Favorites
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
