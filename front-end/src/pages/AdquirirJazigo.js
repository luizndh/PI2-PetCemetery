import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Mapa from '../components/Mapa';
import ModalPadrao from '../components/ModalPadrao';
import NavBar from '../components/NavBar';
import Titulo from '../components/Titulo';
const mainTheme = createTheme({ palette: { mode: 'dark' } });

function AdquirirJazigo() {
  const cpf = sessionStorage.getItem('cpf');

  const navigate = useNavigate();

  const [JazigoEscolhido, setJazigoEscolhido] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function getCoordinates(id) {
    var row = String.fromCharCode(65 + Math.floor((id - 1) / 12));
    var column = (id - 1) % 12 + 1;
    return row + '-' + column;
  }

  const handleEscolha = (id) => {
    setJazigoEscolhido(id);
    setIsModalOpen(true);
    console.log("Jazigo escolhido: " + JazigoEscolhido);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setJazigoEscolhido(null);
  };

  const handleComprar = (tipo) => {
    navigate(`/CompraAlugaJazigo?id=${JazigoEscolhido}&tipo=${tipo}`);
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <NavBar isLoggedIn={true} cpf={cpf} />
      <Titulo texto="Escolha o jazigo no mapa" mW="md" />
      <Container component="main">
        <Mapa onJazigoSelect={handleEscolha} isModalOpen={isModalOpen} />
        <ModalPadrao title={"Jazigo " + getCoordinates(JazigoEscolhido)} open={isModalOpen} onClose={handleModalClose} bt1Text="Comprar" bt1Href={() => handleComprar('compra')} bt2Text="Alugar" bt2Href={() => handleComprar('aluguel')} />
      </Container>
    </ThemeProvider>
  );
}

export default AdquirirJazigo;
