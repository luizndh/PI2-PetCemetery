import { Button, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/login.css';
import NavBar from '../components/NavBar';
import Titulo from '../components/Titulo';
import { loginPost } from '../components/api';
import logo from '../logo.png';
const mainTheme = createTheme({ palette: { mode: 'dark', }, });

function Login() {
  const navigate = useNavigate();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const handleCadastro = (e) => { navigate('/Cadastro'); }

  const handleEmail = (e) => {
    setEmailInput(e.target.value);
    console.log(emailInput);
  }

  const handlePassword = (e) => {
    setPasswordInput(e.target.value);
    console.log(passwordInput);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogin = async () => { //formato: tipo_cliente;cpf
    let resp = await loginPost(emailInput, passwordInput);
    console.log(resp);

    if (resp != null) resp = resp.split(';');
    else { console.log("Resposta do back = null"); setErrMsg("Erro na conexão com o servidor. Verifique sua rede"); return; }

    if (!isNaN(resp[1])) {
      sessionStorage.setItem('usuario', resp[0]); // Armazena o tipo de usuário em sessão
      sessionStorage.setItem('cpf', resp[1]); // Armazena o CPF do usuário em sessão
      if (resp[0] === "cliente") {
        navigate(`/Home`);
      } else if (resp[0] === "admin") {
        navigate(`/HomeAdmin`);
      }
    }
    else {
        setErrMsg(resp);
    }
  }

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <NavBar />
      <Titulo texto="Login" />
      <img src={logo} alt="logo" className='logo'></img>
      <Container component="main" maxWidth="xs">
        <Box sx={{ margin: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

          <TextField margin="normal" required fullWidth id="email" label="Email" name="email" autoComplete="email" onKeyPress={handleKeyPress} autoFocus onChange={handleEmail} />
          <TextField margin="normal" required fullWidth name="senha" label="Senha" type="password" id="senha" onKeyPress={handleKeyPress} autoComplete="current-password" onChange={handlePassword} />

          <Box sx={{ margin: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Stack spacing={2} direction='row'>
              <Button variant="contained" onClick={() => { handleLogin(); }}>Login</Button>
              <Button variant="contained" color="secondary" onClick={() => { handleCadastro(); }}>Cadastro</Button>
            </Stack>
          </Box>
          <Typography variant="h6" color="error" align='center'>{errMsg}</Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;