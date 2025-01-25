import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DiaFuncionamento from '../components/DiaFuncionamento';
import ModalOk from '../components/ModalOk';
import NavBar from '../components/NavBar';
import Titulo from '../components/Titulo';
import { alterarHorarios, getHorarios } from '../components/api';
const mainTheme = createTheme({ palette: { mode: 'dark', }, });

function AlterarHorarioFuncionamento() {
  const navigate = useNavigate();
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

  const [modalOpen, setModalOpen] = useState(false);

  const handleHome = () => {
    navigate(`/HomeAdmin`);
  };

  const handleSalvar = async () => {
    console.log("JSON sendo enviado:");
    console.log(horarioFuncionamento);
    const response = await alterarHorarios(horarioFuncionamento);
    console.log(response);

    if (response == "OK;horario_alterado;") {
      setModalOpen(true);
    }
    else {
      setErrMsg("Erro ao alterar horário de funcionamento. Verifique a rede");
    }
  };

  const handleDiaFuncionamentoChange = (dia, updatedHorarioFuncionamento) => {
    setHorarioFuncionamento(prevState => ({
      ...prevState,
      [dia]: updatedHorarioFuncionamento
    }));
    console.log("FUNCIONAMENTO ALTERADO: ");
    console.log(horarioFuncionamento);
  };

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
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <NavBar isAdmin={true} />
      <Titulo texto="Alterar horário de funcionamento" mW="lg" />
      <Container component="main" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Stack spacing={2} direction="column" divider={<Divider orientation="horizontal" flexItem />}>
          <Box spacing={2} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
            <DiaFuncionamento dia="segunda" horarioFuncionamento={horarioFuncionamento.segunda} onChange={handleDiaFuncionamentoChange} />
            <DiaFuncionamento dia="terca" horarioFuncionamento={horarioFuncionamento.terca} onChange={handleDiaFuncionamentoChange} />
            <DiaFuncionamento dia="quarta" horarioFuncionamento={horarioFuncionamento.quarta} onChange={handleDiaFuncionamentoChange} />
            <DiaFuncionamento dia="quinta" horarioFuncionamento={horarioFuncionamento.quinta} onChange={handleDiaFuncionamentoChange} />
            <DiaFuncionamento dia="sexta" horarioFuncionamento={horarioFuncionamento.sexta} onChange={handleDiaFuncionamentoChange} />
            <DiaFuncionamento dia="sabado" horarioFuncionamento={horarioFuncionamento.sabado} onChange={handleDiaFuncionamentoChange} />
            <DiaFuncionamento dia="domingo" horarioFuncionamento={horarioFuncionamento.domingo} onChange={handleDiaFuncionamentoChange} />
            <DiaFuncionamento dia="feriado" horarioFuncionamento={horarioFuncionamento.feriado} onChange={handleDiaFuncionamentoChange} />
          </Box>

          <Button variant="contained" color='secondary' onClick={handleSalvar}>Salvar novos horários</Button>
        </Stack>
        <ModalOk title="Horário alterado com sucesso" open={modalOpen} onClose={() => setModalOpen(true)} bt1Text="OK" bt1Href={handleHome} />
        <Typography variant="h6" color="error" align='center'>{errMsg}</Typography>
      </Container>
    </ThemeProvider >
  );
}

export default AlterarHorarioFuncionamento;
