import { Button, Grid, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Titulo from '../components/Titulo';
import { editarPerfilPost, getAlterarPerfil } from '../components/api';
import { useLocation } from 'react-router-dom';
const mainTheme = createTheme({ palette: { mode: 'dark', }, });

function AlterarPerfil() {
  const cpf = sessionStorage.getItem('cpf');

  const navigate = useNavigate();

  const [emailInput, setEmailInput] = useState("");
  const [senhaInput, setSenhaInput] = useState("");
  const [nomeInput, setNomeInput] = useState("");
  const [telefoneInput, setTelefoneInput] = useState("");
  const [ruaInput, setRuaInput] = useState("");
  const [numeroInput, setNumeroInput] = useState("");
  const [complementoInput, setComplementoInput] = useState("");
  const [cepInput, setCepInput] = useState("");
  const [repitaSenhaInput, setRepitaSenhaInput] = useState("");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const handleLoad = async (e) => {
      let resp = await getAlterarPerfil(cpf);
      console.log(resp);

      if (resp != null) resp = resp.split(';');
      else { console.log("Resposta do back = null"); setErrMsg("Erro na conexão com o servidor. Verifique sua rede"); return; }

      if (resp[0] == "OK") {
        setEmailInput(resp[1]);
        setNomeInput(resp[2]);
        setTelefoneInput(resp[3]);
        setRuaInput(resp[4]);
        setNumeroInput(resp[5]);
        setComplementoInput(resp[6]);
        setCepInput(resp[7]);
      }
      else if (resp[0] == "ERR") {
        console.log("ERRO! motivo: " + resp[1]);
        if (resp[1] == "conta_desativada") setErrMsg("Conta desativada");
        else setErrMsg("Erro desconhecido");
      }
      else {
        console.log("Erro na formatacao de resposta do servidor");
        setErrMsg("Erro na formatação de resposta do servidor");
      }
    }
    handleLoad();
  }, []);

  const handleEmail = (e) => {
    setEmailInput(e.target.value);
    console.log(emailInput);
  }

  const handleNome = (e) => {
    setNomeInput(e.target.value);
    console.log(nomeInput);
  }

  const handleTelefone = (e) => {
    setTelefoneInput(e.target.value);
    console.log(telefoneInput);
  }

  const handleRua = (e) => {
    setRuaInput(e.target.value);
    console.log(ruaInput);
  }

  const handleNumero = (e) => {
    setNumeroInput(e.target.value);
    console.log(numeroInput);
  }

  const handleComplemento = (e) => {
    setComplementoInput(e.target.value);
    console.log(complementoInput);
  }

  const handleCep = (e) => {
    setCepInput(e.target.value);
    console.log(cepInput);
  }

  const handleSenha = (e) => {
    setSenhaInput(e.target.value);
    console.log(senhaInput);
  }

  const handleRepitaSenha = (e) => {
    setRepitaSenhaInput(e.target.value);
    console.log(repitaSenhaInput);
  }

  const handleCancelar = (e) => {
    navigate(`/ExibirPerfil`);
  }

  const handleAlterar = async (e) => {
    let resp = await editarPerfilPost(nomeInput, emailInput, telefoneInput, ruaInput, numeroInput, complementoInput, cepInput, senhaInput, repitaSenhaInput, cpf);
    console.log(resp);

    if (resp != null) resp = resp.split(';');
    else { console.log("Resposta do back = null"); setErrMsg("Erro na conexão com o servidor. Verifique sua rede"); return; }

    if (resp[0] == "OK") {
      console.log("cpf do cliente: " + resp[1]);
      navigate(`/Home`);
    }
    else if (resp[0] == "ERR") {
      console.log("ERRO! motivo: " + resp[1]);
      if (resp[1] == "senhas_nao_coincidem") { setErrMsg("As senhas digitadas não são iguais"); }
      else if (resp[1] == "email_invalido") { setErrMsg("O email digitado não é válido"); }
      else if (resp[1] == "email_ja_cadastrado") { setErrMsg("O email digitado já está cadastrado"); }
      else if (resp[1] == "campo_vazio") { setErrMsg("Preencha todos os campos"); }
      else { setErrMsg("Erro desconhecido"); }
    }
    else {
      console.log("Erro na formatacao de resposta do servidor");
      setErrMsg("Erro na formatação de resposta do servidor");
    }
  }

  //TODO refazer usando useState e state variables.

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <NavBar isLoggedIn={true} cpf={cpf} />
      <Titulo texto="Alterar Perfil" />

      <Box sx={{ margin: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
        <Grid container spacing={2} direction='column'>
          <Grid container spacing={2} direction='row' alignItems='center'>
            <Grid item xs={6}>
              <TextField margin="normal" required fullWidth id="nome" label="Nome" value={nomeInput} name="nome" onChange={handleNome} />
            </Grid>
            <Grid item xs={6}>
              <TextField margin="normal" required fullWidth name="email" label="Email" value={emailInput} type="email" id="email" onChange={handleEmail} />
            </Grid>
          </Grid>
          <Grid container spacing={2} direction='row' alignItems='center'>
            <Grid item xs={6}>
              <TextField margin="normal" required fullWidth name="telefone" label="Telefone" value={telefoneInput} id="telefone" onChange={handleTelefone} />
            </Grid>
            <Grid item xs={6}>
              <TextField margin="normal" required fullWidth name="cep" label="CEP" value={cepInput} id="cep" onChange={handleCep} />
            </Grid>
          </Grid>
          <Grid container spacing={2} direction='row' alignItems='center'>
            <Grid item xs={6}>
              <TextField margin="normal" required fullWidth name="rua" label="Rua" id="rua" value={ruaInput} onChange={handleRua} />
            </Grid>
            <Grid item xs={6}>
              <TextField margin="normal" required fullWidth name="numero" label="Numero" value={numeroInput} id="numero" onChange={handleNumero} />
            </Grid>
          </Grid>
          <Grid container spacing={2} direction='row' alignItems='center'>
            <Grid item xs={6}>
              <TextField margin="normal" fullWidth name="complemento" label="Complemento" id="complemento" value={complementoInput} onChange={handleComplemento} />
            </Grid>
            <Grid item xs={6}>
              <TextField margin="normal" required fullWidth name="senha" type="password" label="Senha" id="senha" onChange={handleSenha} />
            </Grid>
          </Grid>
          <Grid container spacing={2} direction='row' alignItems='center'>
            <Grid item xs={12}>
              <TextField margin="normal" required fullWidth name="senharepeat" type="password" label="Repita a senha" id="senharepeat" onChange={handleRepitaSenha} />
            </Grid>
          </Grid>
        </Grid>

        <Stack spacing={2} sx={{ margin: 2 }} direction='row'>
          <Button variant="contained" color="error" onClick={() => { handleAlterar(); }}>Alterar</Button>
          <Button variant="contained" color="secondary" onClick={() => { handleCancelar(); }}>Cancelar</Button>
        </Stack>

        <Typography variant="h6" color="error" align='center'>{errMsg}</Typography>
      </Box>
    </ThemeProvider>
  );
}

export default AlterarPerfil;