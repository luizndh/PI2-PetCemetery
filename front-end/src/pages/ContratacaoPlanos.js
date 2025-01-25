import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import '../Styles/contratacao-planos.css';
import NavBar from '../components/NavBar';
import Titulo from '../components/Titulo';
import { getUrlParams } from '../utils/utils';
const mainTheme = createTheme({ palette: { mode: 'dark', }, });

function ContratacaoPlanos() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cpf = sessionStorage.getItem('cpf');

  useEffect(() => {
    if (cpf == null) setIsLoggedIn(false);
    else setIsLoggedIn(true);
  }, []);

  const checkboxStyle = {
    color: 'black',
    '&$disabled': {
      color: 'black',
    },
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <NavBar page={3} isLoggedIn={isLoggedIn} cpf={cpf} />
      <Titulo texto="Conheça nossos planos de personalização" mW="md" />
      <Container component="main">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          <div className="planos">
            <div id="basic" className='plano'>
              <Typography variant="h2">Basic</Typography>
              <Typography variant="h6" color='black'>R$ 1,00</Typography>
              <Box>
                <FormControlLabel class="fcl" label="Mensagem" disabled control={<Checkbox checked style={checkboxStyle} />} />
                <FormControlLabel class="fcl" label="Foto" disabled control={<Checkbox checked style={checkboxStyle} />} />
                <FormControlLabel class="fcl" label="Flores" disabled control={<Checkbox style={checkboxStyle} />} />
                <FormControlLabel class="fcl" label="Catavento" disabled control={<Checkbox style={checkboxStyle} />} />
              </Box>
            </div>
            <div id="silver" className='plano'>
              <Typography variant="h2">Silver</Typography>
              <Typography variant="h6" color='black'>R$ 50,00</Typography>
              <Box>
                <FormControlLabel class="fcl" label="Mensagem" disabled control={<Checkbox checked style={checkboxStyle} />} />
                <FormControlLabel class="fcl" label="Foto" disabled control={<Checkbox checked style={checkboxStyle} />} />
                <FormControlLabel class="fcl" label="Flores" disabled control={<Checkbox checked style={checkboxStyle} />} />
                <FormControlLabel class="fcl" label="Catavento" disabled control={<Checkbox style={checkboxStyle} />} />
              </Box>
            </div>
            <div id="gold" className='plano'>
              <Typography variant="h2">Gold</Typography>
              <Typography variant="h6" color='black'>R$ 80,00</Typography>
              <Box>
                <FormControlLabel class="fcl" label="Mensagem" disabled color="primary" control={<Checkbox checked style={checkboxStyle} />} />
                <FormControlLabel class="fcl" label="Foto" disabled control={<Checkbox checked style={checkboxStyle} />} />
                <FormControlLabel class="fcl" label="Flores" disabled control={<Checkbox checked style={checkboxStyle} />} />
                <FormControlLabel class="fcl" label="Catavento" disabled control={<Checkbox checked style={checkboxStyle} />} />
              </Box>
            </div>
          </div>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ContratacaoPlanos;