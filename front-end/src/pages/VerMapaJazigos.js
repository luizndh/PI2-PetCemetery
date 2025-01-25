import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import Mapa from '../components/Mapa';
import NavBar from '../components/NavBar';
import Titulo from '../components/Titulo';
const mainTheme = createTheme({ palette: { mode: 'dark' } });

function VerMapaJazigos() {
  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <NavBar isAdmin={true} />
      <Titulo texto="Mapa de jazigos" mW="md" />
      <Container component="main">
        <Mapa readOnly />
      </Container>
    </ThemeProvider>
  );
}

export default VerMapaJazigos;
