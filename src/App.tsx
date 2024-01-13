import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { CharacterDetails } from './pages/CharacterDetails';
import { theme } from './ui/theme';
import PrimarySearchAppBar from './features/AppBar';

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PrimarySearchAppBar />
      <Container
        sx={{
          padding: 10,
          '@media (max-width: 600px)': {
            padding: '60px 20px',
          },
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/character/:characterId"
            element={<CharacterDetails />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
};
