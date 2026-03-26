import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import { FavoritesProvider } from './context/FavoritesContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import ActorProfilePage from './pages/ActorProfilePage';
import DirectorProfilePage from './pages/DirectorProfilePage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';

// Root app component
const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <FavoritesProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies/:id" element={<MovieDetailPage />} />
            <Route path="/actors/:id" element={<ActorProfilePage />} />
            <Route path="/directors/:id" element={<DirectorProfilePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </FavoritesProvider>
  </ThemeProvider>
);

export default App;
