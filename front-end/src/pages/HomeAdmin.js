import { Button, Grid, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Titulo from '../components/Titulo';

const mainTheme = createTheme({ palette: { mode: 'dark', }, });

function HomeAdmin() {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <NavBar page={1} isAdmin={true} />
      <Titulo texto="Painel do Administrador" mW="md" />
      <Container component="main" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4, }}>
        <Stack direction="column" spacing={3}>
          <Button variant="contained" onClick={() => { navigate(`/AlterarHorarioFuncionamento`) }} sx={{ width: '100%' }}>Alterar Horário de Funcionamento</Button>
          <Button variant="contained" onClick={() => { navigate(`/RelatorioSelecao`) }} sx={{ width: '100%' }}>Relatórios</Button>
          <Button variant="contained" onClick={() => { navigate(`/DetalharJazigos`) }} sx={{ width: '100%' }}>Detalhar Jazigos</Button>
          <Button variant="contained" onClick={() => { navigate(`/VisualizarReuniao`) }} sx={{ width: '100%' }}>Visualizar Reuniões</Button>
          <Button variant="contained" onClick={() => { navigate(`/RelatorioInadimplente`) }} sx={{ width: '100%' }}>Clientes Inadimplentes</Button>
          <Button variant="contained" onClick={() => { navigate(`/ManterServicos`) }} sx={{ width: '100%' }}>Manter Serviços</Button>
          <Button variant="contained" onClick={() => { navigate(`/VerMapaJazigos`) }} sx={{ width: '100%' }}>Visualizar Mapa de Jazigos</Button>
          <Button variant="contained" onClick={() => { navigate(`/TimeSkip`) }} sx={{ width: '100%' }}>Time Skip mágico</Button>
        </Stack>
      </Container>
    </ThemeProvider >
  );
}

export default HomeAdmin;
