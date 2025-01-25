import { Button, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import NavBar from '../components/NavBar';
import Titulo from '../components/Titulo';
const mainTheme = createTheme({ palette: { mode: 'dark', }, });
//TODO: verificar e trocar os vários boxes por um stack em outras paginas
function RealizarDoacoes() {
  const cpf = sessionStorage.getItem('cpf');
  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <NavBar isLoggedIn={true} cpf={cpf} />
      <Titulo texto="ONGs que ajudam os animais" mW="md" />
      <Container component="main" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
        <Stack spacing={2} direction='column' divider={<Divider orientation="horizontal" flexItem />}>
          <Button variant="outlined" color="success" href="https://www.instagram.com/osindefesos/">ONG indefesos RJ</Button>
          <Button variant="outlined" color="success" href="https://amparanimal.org.br/">Ampara Animal</Button>
          <Button variant="outlined" color="success" href="https://www.suipa.org.br/">SUIPA</Button>
          <Button variant="outlined" color="success" href="https://www.onggarra.com/">ONG Garra</Button>
          <Button variant="outlined" color="success" href="https://petssemfronteiras.org.br/">Pets Sem Fronteiras</Button>
        </Stack>
      </Container>

    </ThemeProvider >
  );
}

export default RealizarDoacoes;