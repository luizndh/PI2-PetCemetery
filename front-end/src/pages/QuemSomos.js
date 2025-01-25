import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import '../Styles/quem-somos.css';
import NavBar from '../components/NavBar';
import Titulo from '../components/Titulo';
import { getUrlParams } from '../utils/utils';
const mainTheme = createTheme({ palette: { mode: 'dark', }, });

function QuemSomos() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cpf = sessionStorage.getItem('cpf');

  useEffect(() => {
    if (cpf == null) setIsLoggedIn(false);
    else setIsLoggedIn(true);
  }, []);

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <NavBar page={2} isLoggedIn={isLoggedIn} cpf={cpf} />
      <Titulo texto="Quem Somos" />

      <Container component="main">
        <Box sx={{ margin: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <Typography variant="h6">Aqui no nosso cemitério de animais, nós entendemos que os animais são membros da família e merecem ser tratados com o mesmo respeito e dignidade que qualquer outro ente querido. É por isso que criamos este espaço dedicado a homenagear e lembrar aqueles que partem.
            Nossa empresa foi fundada por um grupo de universitários que compartilhavam um amor profundo por animais e um desejo de criar um lugar onde os donos pudessem honrar a memória de seus animais de estimação. A partir daí, nosso cemitério cresceu e evoluiu para atender às necessidades de nossos clientes, oferecendo serviços de sepultamento, memorialização e muito mais.
            Estamos comprometidos em fornecer um ambiente tranquilo e sereno para homenagear a vida de seus pets. Nossa equipe de funcionários é apaixonada por ajudar nossos clientes a encontrar o caminho certo para lembrar e honrar seus pets, e estamos sempre disponíveis para ajudar em qualquer necessidade que possam ter.
            Se você está procurando um lugar para homenagear a vida do seu pet, esperamos que você considere nossa empresa. Estamos honrados em poder cuidar de você e seu pets em um dos momentos mais difíceis da vida.
          </Typography>
          <Button variant="contained" href="/ContratacaoPlanos">Conheça nossos planos</Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default QuemSomos;