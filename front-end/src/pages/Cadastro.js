import { Button, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Titulo from '../components/Titulo';
import { cadastroPost } from '../components/api';
const mainTheme = createTheme({ palette: { mode: 'dark', }, });

function Cadastro() {
  const navigate = useNavigate();

  const [emailInput, setEmailInput] = useState("");
  const [senhaInput, setSenhaInput] = useState("");
  const [nomeInput, setNomeInput] = useState("");
  const [cpfInput, setCpfInput] = useState("");
  const [telefoneInput, setTelefoneInput] = useState("");
  const [ruaInput, setRuaInput] = useState("");
  const [numeroInput, setNumeroInput] = useState("");
  const [complementoInput, setComplementoInput] = useState("");
  const [cepInput, setCepInput] = useState("");
  const [repitaSenhaInput, setRepitaSenhaInput] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const handleEmail = (e) => {
    setEmailInput(e.target.value);
    console.log(emailInput);
  }

  const handleNome = (e) => {
    setNomeInput(e.target.value);
    console.log(nomeInput);
  }

  const handleCpf = (e) => {
    setCpfInput(e.target.value);
    console.log(cpfInput);
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

  const handleCadastro = async (e) => {
    let resp = await cadastroPost(emailInput, senhaInput, repitaSenhaInput, nomeInput, cpfInput, telefoneInput, ruaInput, numeroInput, complementoInput, cepInput);
    console.log(resp);

    if (resp != null) resp = resp.split(';');
    else { console.log("Resposta do back = null"); setErrMsg("Erro na conexão com o servidor. Verifique sua rede"); return; }

    if (resp[0] == "OK") {
      navigate(`/`);
    }
    else if (resp[0] == "ERR") {
      console.log("ERRO! motivo: " + resp[1]);
      if (resp[1] == "senhas_diferentes") { setErrMsg("As senhas digitadas não são iguais"); }
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

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <NavBar />
      <Titulo texto="Cadastro" />

      <Grid container spacing={2} direction='column'>
        <Grid container spacing={2} direction='row' alignItems='center'>
          <Grid item xs={6}>
            <TextField margin="normal" required fullWidth id="nome" label="Nome" name="nome" onChange={handleNome} />
          </Grid>
          <Grid item xs={6}>
            <TextField margin="normal" required fullWidth name="email" label="Email" type="email" id="email" onChange={handleEmail} />
          </Grid>
        </Grid>
        <Grid container spacing={2} direction='row' alignItems='center'>
          <Grid item xs={6}>
            <TextField margin="normal" required fullWidth name="cpf" label="CPF" id="cpf" onChange={handleCpf} />
          </Grid>
          <Grid item xs={6}>
            <TextField margin="normal" required fullWidth name="telefone" label="Telefone" id="telefone" onChange={handleTelefone} />
          </Grid>
        </Grid>
        <Grid container spacing={2} direction='row' alignItems='center'>
          <Grid item xs={6}>
            <TextField margin="normal" required fullWidth name="cep" label="CEP" id="cep" onChange={handleCep} />
          </Grid>
          <Grid item xs={6}>
            <TextField margin="normal" required fullWidth name="rua" label="Rua" id="rua" onChange={handleRua} />
          </Grid>
        </Grid>
        <Grid container spacing={2} direction='row' alignItems='center'>
          <Grid item xs={6}>
            <TextField margin="normal" required fullWidth name="numero" label="Numero" id="numero" onChange={handleNumero} />
          </Grid>
          <Grid item xs={6}>
            <TextField margin="normal" fullWidth name="complemento" label="Complemento" id="complemento" onChange={handleComplemento} />
          </Grid>
        </Grid>
        <Grid container spacing={2} direction='row' alignItems='center'>
          <Grid item xs={6}>
            <TextField margin="normal" required fullWidth name="senha" type="password" label="Senha" id="senha" onChange={handleSenha} />
          </Grid>
          <Grid item xs={6}>
            <TextField margin="normal" required fullWidth name="senharepeat" type="password" label="Repita a senha" id="senharepeat" onChange={handleRepitaSenha} />
          </Grid>
        </Grid>
      </Grid>

      <Box sx={{ margin: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Button variant="contained" onClick={() => { handleCadastro(); }}>Cadastro</Button>
      </Box>

      <Typography variant="h6" color="error" align='center'>{errMsg}</Typography>

    </ThemeProvider>
  );
}

export default Cadastro;