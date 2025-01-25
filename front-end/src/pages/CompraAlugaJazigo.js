import { Button, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Titulo from '../components/Titulo';
import { getUrlParams } from '../utils/utils';
import { getCompraJazigo } from '../components/api';

const mainTheme = createTheme({ palette: { mode: 'dark', }, });

function CompraAlugaJazigo() {
  const navigate = useNavigate();
  const [tipoTransacao, setTipoTransacao] = useState("");
  const [preco, setPreco] = useState(0);
  const [endereco, setEndereco] = useState("");

  const jazigoId = getUrlParams('id');
  const cpf = sessionStorage.getItem('cpf');
  const tipo = getUrlParams('tipo');

  const getJazigoInfo = async (e) => { //formato: STATUS;endereco;preco
    let resp = "";
    resp = await getCompraJazigo(cpf, jazigoId, tipo);

    console.log(resp);

    if (resp != null) resp = resp.split(';');
    else { console.log("Resposta do back = null"); return; }

    if (resp[0] == "OK") {
      setEndereco(resp[1]);
      setPreco(resp[2]);
    }
    else {
      console.log("Erro desconhecido na conexao com o back");
    }
  }

  useEffect(() => {
    setTipoTransacao(tipo == "compra" ? "Comprar" : "Alugar");

    getJazigoInfo();
  }, []);

  const handleComprar = (e) => { navigate(`/ComprarOrnamento?id=${jazigoId}&tipo=${tipo}`); }

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <NavBar isLoggedIn={true} cpf={cpf} />
      <Titulo texto={tipoTransacao + " Jazigo " + endereco} />
      <Container component="main" maxWidth="xs">
        <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <Typography variant="h6">Valor do Jazigo: R$ {preco}</Typography>
          <Divider orientation="horizontal" flexItem sx={{ margin: 2 }} />
          <Stack spacing={2} direction='row'>
            <Button variant="contained" onClick={() => { handleComprar(); }}>Comprar Pacote de Ornamentos</Button>
          </Stack>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default CompraAlugaJazigo;