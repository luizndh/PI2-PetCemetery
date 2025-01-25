import { Button, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react'; // Import useState
import { useNavigate } from 'react-router-dom';
import '../Styles/home.css';
import Carrinho, { Servico } from '../components/Carrinho';
import clearCart from '../components/Carrinho';
import ModalOk from '../components/ModalOk';
import NavBar from '../components/NavBar';
import Titulo from '../components/Titulo';
import { getInformacoesCarrinho, finalizarCompraCarrinho } from '../components/api';
const mainTheme = createTheme({ palette: { mode: 'dark' } });

function ConfirmarCompra() {
  const cpf = sessionStorage.getItem('cpf');

  console.log("cpf: " + cpf);

  const [modalOpen, setModalOpen] = useState(false);
  const [resp, setResp] = useState([]);

  const handleHome = () => { navigate('/Home'); };

  const handleLogout = () => { navigate('/'); };

  const navigate = useNavigate();

  const handleButtonClick = () => {
    handleCompra();
    setModalOpen(true);
  };


  const handleCompra = async (e) => {
    let conteudoCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    console.log(conteudoCarrinho);
    clearCart();

    var resp;

    resp = await finalizarCompraCarrinho(cpf, conteudoCarrinho);

    console.log("resp: " + resp);
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <NavBar isLoggedIn={true} />
      <Titulo texto="Confirmar Compra" mW="sm" />

      <Container component="main" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Paper elevation={1} style={{ height: '100%', textAlign: 'center', padding: 20 }}>
              <Carrinho cpf={cpf} />
            </Paper>
          </Grid>
          <Grid item xs={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Divider orientation="vertical" style={{ height: '100%' }} />
          </Grid>
          <Grid item xs={5}>
            <Paper elevation={1} style={{ height: '100%', textAlign: 'center', padding: 20 }}>
              <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4">Métodos de pagamento</Typography>
                <Divider orientation="horizontal" flexItem sx={{ margin: 1 }} />
                <Stack spacing={2} direction="column" divider={<Divider orientation="horizontal" flexItem />}>
                  <Button variant="contained" color="success" onClick={handleButtonClick}>Cartão de Crédito</Button>
                  <Button variant="contained" color="success" onClick={handleButtonClick}>Cartão de Débito</Button>
                  <Button variant="contained" color="success" onClick={handleButtonClick}>Paypal</Button>
                </Stack>
              </Container>
            </Paper>
          </Grid>
        </Grid>
        <ModalOk title="Pagamento realizado com sucesso" open={modalOpen} onClose={() => setModalOpen(true)} bt1Text="OK" bt1Href={handleHome}/>
      </Container>
    </ThemeProvider>
  );
}

export default ConfirmarCompra;
