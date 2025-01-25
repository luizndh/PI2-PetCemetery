import { Button, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import '../Styles/pagina-inicial.css';
import NavBar from '../components/NavBar';
import logo from '../logo.png';
const mainTheme = createTheme({ palette: { mode: 'dark', }, });

function PaginaInicial() {
  sessionStorage.clear();
  
  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <NavBar page={1} />
      <Container component="main" maxWidth="xs">

        <Box sx={{ marginTop: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <Typography variant="h1">Pet Cemetery</Typography>
          <img src={logo} alt="logo" className='logoImg' />

          <Stack spacing={2} direction='column' divider={<Divider orientation="horizontal" flexItem />}>
            <Button variant="contained" href="/QuemSomos">Quem somos</Button>
            <Button variant="contained" href="/ContratacaoPlanos">Conheça nossos planos</Button>
            <Button variant="contained" href="/Contato">Contato</Button>
          </Stack>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default PaginaInicial;