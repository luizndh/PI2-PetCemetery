import { Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import '../Styles/contato.css';
import NavBar from '../components/NavBar';
import Titulo from '../components/Titulo';
import FuncionamentoDisplay from '../components/FuncionamentoDisplay';
import { getHorarios } from '../components/api';
const mainTheme = createTheme({ palette: { mode: 'dark', }, });

function Contato() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cpf = sessionStorage.getItem('cpf');

  useEffect(() => {
    if (cpf == null) setIsLoggedIn(false);
    else setIsLoggedIn(true);
  }, []);

  const [errMsg, setErrMsg] = useState("");

  const [horarioFuncionamento, setHorarioFuncionamento] = useState({
    segunda: {
      abertura: '',
      fechamento: '',
      fechado: false
    },
    terca: {
      abertura: '',
      fechamento: '',
      fechado: false
    },
    quarta: {
      abertura: '',
      fechamento: '',
      fechado: false
    },
    quinta: {
      abertura: '',
      fechamento: '',
      fechado: false
    },
    sexta: {
      abertura: '',
      fechamento: '',
      fechado: true
    },
    sabado: {
      abertura: '',
      fechamento: '',
      fechado: false
    },
    domingo: {
      abertura: '',
      fechamento: '',
      fechado: true
    },
    feriado: {
      abertura: '',
      fechamento: '',
      fechado: true
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHorarios();
        const horarioFuncionamentoData = {};

        response.forEach(item => {
          horarioFuncionamentoData[item.diaSemana] = {
            abertura: item.abertura,
            fechamento: item.fechamento,
            fechado: item.fechado
          };
        });

        setHorarioFuncionamento(horarioFuncionamentoData);
      } catch (error) {
        console.log(error);
        setErrMsg("Erro ao carregar horário de funcionamento");
      }
    };

    fetchData();
  }, []);


  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <NavBar page={4} isLoggedIn={isLoggedIn} cpf={cpf} />
      <Titulo texto="Contato" />

      <Container component="main">
        <Box sx={{ margin: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <Typography variant="h4" sx={{ marginBottom: 4 }}>Email: petcemeterypcs@gmail.com</Typography>
          <Typography variant="h3" sx={{ marginBottom: 2 }}>Horário de Funcionamento:</Typography>

          <Box spacing={2} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
            <FuncionamentoDisplay dia="segunda" horarioFuncionamento={horarioFuncionamento.segunda} />
            <FuncionamentoDisplay dia="terca" horarioFuncionamento={horarioFuncionamento.terca} />
            <FuncionamentoDisplay dia="quarta" horarioFuncionamento={horarioFuncionamento.quarta} />
            <FuncionamentoDisplay dia="quinta" horarioFuncionamento={horarioFuncionamento.quinta} />
            <FuncionamentoDisplay dia="sexta" horarioFuncionamento={horarioFuncionamento.sexta} />
            <FuncionamentoDisplay dia="sabado" horarioFuncionamento={horarioFuncionamento.sabado} />
            <FuncionamentoDisplay dia="domingo" horarioFuncionamento={horarioFuncionamento.domingo} />
            <FuncionamentoDisplay dia="feriado" horarioFuncionamento={horarioFuncionamento.feriado} />
          </Box>
          <Typography variant="h6" color="error" align='center'>{errMsg}</Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Contato;