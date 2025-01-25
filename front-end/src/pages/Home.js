import React from 'react';
import { Button, Divider, Grid, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ListaJazigos from '../components/ListaJazigos';

const mainTheme = createTheme({ palette: { mode: 'dark' } });

function Home() {
  const cpf = sessionStorage.getItem('cpf');
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <NavBar page={1} isLoggedIn={true} cpf={cpf} />
      <Container component="main" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Grid container rowSpacing={2} columnSpacing={2} sx={{ margin: 2 }}>
          <Grid item xs={6}>
            <Grid item>
              <Typography variant="h2" align="center">Meus Jazigos</Typography>
              <Divider sx={{ marginBottom: 2, marginTop: 1 }} />
            </Grid>
            <Grid container spacing={2} direction="column" alignItems="left">
              <Grid item>
                <ListaJazigos admin={false} cliente={true} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Grid container spacing={2} direction="column" alignItems="right" sx={{ marginTop: 2 }}>
              <Grid item>
                <Button variant="contained" onClick={() => { navigate(`/AdquirirJazigo`) }}>Adquirir Jazigo</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={() => { navigate(`/VisualizarDespesas`) }}>Visualizar Despesas</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={() => { navigate(`/AgendarLembrete`) }}>Agendar Lembrete de Visitas</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={() => { navigate(`/AgendarReuniao`) }}>Agendar Reunião</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={() => { navigate(`/RealizarDoacoes`) }}>Realizar Doações</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default Home;