import { Button, Checkbox, FormControlLabel, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Titulo from '../components/Titulo';
import { getUrlParams } from '../utils/utils';
import { getCompraJazigoPlanos, addItemCarrinho } from '../components/api';

const mainTheme = createTheme({ palette: { mode: 'dark', }, });

function ComprarOrnamento() {
  const navigate = useNavigate();
  const jazigoId = getUrlParams('id');
  const tipo = getUrlParams('tipo');
  const cpf = sessionStorage.getItem('cpf');

  const [selectedOrnament, setSelectedOrnament] = useState('gold');
  const [precoBasic, setPrecoBasic] = useState(0);
  const [precoSilver, setPrecoSilver] = useState(0);
  const [precoGold, setPrecoGold] = useState(0);

  const getPlanoInfo = async (e) => { //formato: STATUS;endereco;preco
    let resp = "";
    resp = await getCompraJazigoPlanos(cpf, jazigoId);

    console.log(resp);

    if (resp != null) resp = resp.split(';');
    else { console.log("Resposta do back = null"); return; }

    if (resp[0] == "OK") {
      setPrecoBasic(resp[2]);
      setPrecoSilver(resp[4]);
      setPrecoGold(resp[6]);
    }
    else {
      console.log("Erro desconhecido na conexao com o back");
    }
  }

  useEffect(() => {
    getPlanoInfo();
  }, []);

  const handleChange = (event) => {
    setSelectedOrnament(event.target.value);
  };

  const handleAddToCart =  () => {
    //await addItemCarrinho(cpf, jazigoId, selectedOrnament, tipo);
    const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];

    const item = {
      id: carrinhoAtual.length,
      jazigoId: jazigoId,
      selectedOrnament: selectedOrnament,
      tipo: tipo.toUpperCase(),
      valor: selectedOrnament === 'basic' ? precoBasic : selectedOrnament === 'silver' ? precoSilver : precoGold
    };
    
    const novoCarrinho = [...carrinhoAtual, item];
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));

    navigate(`/ConfirmarCompra`);
  };
  //TODO: fazer o componente de compra e usar aqui
  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <NavBar isLoggedIn={true} cpf={cpf} />
      <Titulo texto="Escolha o pacote de ornamentos" mW="lg" />
      <Container component="main" maxWidth="xs">

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Stack direction='column'>
            <FormControlLabel control={<Checkbox checked={selectedOrnament === 'basic'} onChange={handleChange} value="basic" />} label={"Basic: Mensagem e Foto - R$" + precoBasic} />
            <FormControlLabel control={<Checkbox checked={selectedOrnament === 'silver'} onChange={handleChange} value="silver" />} label={"Silver: Mensagem, Foto e Flores - R$" + precoSilver} />
            <FormControlLabel control={<Checkbox checked={selectedOrnament === 'gold'} onChange={handleChange} value="gold" />} label={"Gold: Mensagem, Foto, Flores e Catavento - R$" + precoGold} />
            <Divider orientation="horizontal" flexItem sx={{ margin: 2 }} />
            <Stack spacing={2} direction='row'>
              <Button variant="contained" onClick={ handleAddToCart }>Comprar</Button>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ComprarOrnamento;