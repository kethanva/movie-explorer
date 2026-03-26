import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Movie as MovieIcon } from '@mui/icons-material';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

// Page layout wrapper
const Layout: React.FC<LayoutProps> = ({ children }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'background.default' }}>
    <Navbar />
    <Box component="main" sx={{ flexGrow: 1 }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {children}
      </Container>
    </Box>
    <Box
      component="footer"
      sx={{
        py: 3, px: 2, mt: 'auto',
        backgroundColor: 'background.paper',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >

    </Box>
  </Box>
);

export default Layout;
