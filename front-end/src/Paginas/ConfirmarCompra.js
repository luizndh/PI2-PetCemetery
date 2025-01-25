import { Button, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const mainTheme = createTheme({ palette: { mode: 'dark', }, });

function ConfirmarCompra() {
  const navigate = useNavigate();

  const handlePagamento = () => {
    // Você pode fazer algo com o tipo de pagamento aqui, como enviar para o servidor
    navigate('/Home');
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <NavBar />
      <Container component="main" maxWidth="xs">
        <Box sx={{ margin: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <Typography variant="h5" component="h2">Confirmar Compra</Typography>
          <Divider orientation="horizontal" flexItem sx={{ margin: 2 }} />
          <Typography variant="body1" component="p">Escolha o método de pagamento:</Typography>
          <Stack spacing={2} direction='row'>
            <Button variant="contained" onClick={() => { handlePagamento('Cartao de Credito'); }}>Cartão de Crédito</Button>
            <Button variant="contained" onClick={() => { handlePagamento('Debito'); }}>Débito</Button>
            <Button variant="contained" onClick={() => { handlePagamento('Paypal'); }}>Paypal</Button>
          </Stack>
          <Divider orientation="horizontal" flexItem sx={{ margin: 2 }} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ConfirmarCompra;