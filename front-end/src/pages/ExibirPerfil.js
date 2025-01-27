import { Button, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Titulo from '../components/Titulo';
import { getExibirPerfil } from '../components/api';
const mainTheme = createTheme({ palette: { mode: 'dark', }, });

function ExibirPerfil() {

  const cpf = sessionStorage.getItem('cpf');
  console.log("CPF: " + cpf)
  const navigate = useNavigate();
  const handleDesativar = (e) => {
    navigate(`/DesativarConta`);
  }

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const handleLoad = async () => {
    let resp = await getExibirPerfil(cpf);
    setNome(resp.nome);
    setEmail(resp.email);
  }
  handleLoad();

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <NavBar isLoggedIn={true} cpf={cpf} />
      <Titulo texto="Seu Perfil" />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', width: '100%' }}>
            <Typography variant="h5">Nome</Typography>
            <TextField margin="normal" fullWidth id="nome" label={nome} name="nome" disabled InputProps={{ readOnly: true, style: { color: 'white' }, }} InputLabelProps={{ style: { color: 'white' }, }} />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', width: '100%' }}>
            <Typography variant="h5">Email</Typography>
            <TextField margin="normal" fullWidth id="email" label={email} name="email" disabled InputProps={{ readOnly: true, style: { color: 'white' }, }} InputLabelProps={{ style: { color: 'white' }, }} />
          </Box>
        </Box>

        <Box sx={{ margin: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Stack spacing={2} direction='column' divider={<Divider orientation="horizontal" flexItem />}>
            <Button variant="contained" onClick={() => { navigate(`/AlterarPerfil?cpf=${cpf}`) }}>Alterar Informações da Conta</Button>
            <Button variant="contained" color="secondary" onClick={() => { navigate(`/Home?cpf=${cpf}`) }}>Cancelar</Button>
            <Button variant="contained" color="error" onClick={() => { handleDesativar(); }}>Desativar Conta</Button>
          </Stack>
        </Box>
      </Box>

      <Typography variant="h6" color="error" align='center'>{errMsg}</Typography>

    </ThemeProvider>
  );
}

export default ExibirPerfil;