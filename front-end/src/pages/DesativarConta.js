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
import { desativarPerfilPost, getExibirPerfil } from '../components/api';
import { getUrlParams } from '../utils/utils';
import ModalPadrao from '../components/ModalPadrao';
const mainTheme = createTheme({ palette: { mode: 'dark', }, });

function DesativarConta() {
  const cpf = sessionStorage.getItem('cpf');
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleLoad = async (e) => {
    let resp = await getExibirPerfil(cpf);
    console.log(resp);

    if (resp != null) resp = resp.split(';');
    else { console.log("Resposta do back = null"); setErrMsg("Erro na conexão com o servidor. Verifique sua rede"); return; }

    if (resp[0] == "OK") {
      setNome(resp[1]);
      setEmail(resp[2]);
    }
    else if (resp[0] == "ERR") {
      console.log("ERRO! motivo: " + resp[1]);
      if (resp[1] == "conta_desativada") setErrMsg("Essa conta já está desativada");
      else setErrMsg("Erro desconhecido");
    }
    else {
      console.log("Erro na formatacao de resposta do servidor");
      setErrMsg("Erro na formatação de resposta do servidor");
    }
  }
  handleLoad();

  const handleDesativar = async (e) => {
    let resp = await desativarPerfilPost(cpf);
    console.log(resp);

    if (resp != null) resp = resp.split(';');
    else { console.log("Resposta do back = null"); setErrMsg("Erro na conexão com o servidor. Verifique sua rede"); return; }

    if (resp[0] == "OK") {
      console.log("Conta desativada. CPF= " + resp[1]);
      setIsModalOpen(true);
    }
    else if (resp[0] == "ERR") {
      console.log("ERRO! motivo: " + resp[1]);
      if (resp[1] == "conta_desativada") setErrMsg("Essa conta já está desativada");
      else setErrMsg("Erro desconhecido");
    }
    else {
      console.log("Erro na formatacao de resposta do servidor");
      setErrMsg("Erro na formatação de resposta do servidor");
    }
  }

  const handleHome = () => { navigate('/'); };
  const handleCadastro = () => { navigate('/Cadastro'); };

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <NavBar isLoggedIn={true} cpf={cpf} />
      <Titulo texto="Desativação de conta" mW="md" />
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
          <Typography variant="h4">Tem certeza que deseja desativar sua conta?</Typography>
          <Stack spacing={2} sx={{ margin: 2 }} direction='column' divider={<Divider orientation="horizontal" flexItem />}>
            <Button variant="contained" color="secondary" href={`/Home?cpf=${cpf}`}>Cancelar</Button>
            <Button variant="contained" color="error" onClick={() => { handleDesativar(); }}>Desativar Conta</Button>
          </Stack>
        </Box>

        <ModalPadrao title={"Conta desativada com sucesso"} open={isModalOpen} bt1Text="Home" bt1Href={handleHome} bt2Text="Cadastro" bt2Href={handleCadastro} colorBorda={"mainTheme.palette.error.main"} />
      </Box>

      <Typography variant="h6" color="error" align='center'>{errMsg}</Typography>

    </ThemeProvider>
  );
}

export default DesativarConta;