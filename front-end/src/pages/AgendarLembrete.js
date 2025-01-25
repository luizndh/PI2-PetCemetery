import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers';
import axios from 'axios';
import { format } from "date-fns";
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalOk from '../components/ModalOk';
import NavBar from '../components/NavBar';
import Titulo from '../components/Titulo';
import { calcDiff } from '../utils/utils';
import { adicionarLembrete } from '../components/api';
const mainTheme = createTheme({ palette: { mode: 'dark', }, });

function AgendarLembrete() {
  const navigate = useNavigate();
  const cpf = sessionStorage.getItem('cpf');

  const apiKey = '54774bb84681436793d142324230806';
  const city = 'Rio de Janeiro';
  const days = 3;

  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${days}&aqi=no&alerts=no&lang=pt`;
  //console.log(url);

  //const [selectedDate, setSelectedDate] = useState(dayjs());
  const [modalOpen, setModalOpen] = useState(false);
  const [clima, setClima] = useState("");
  const [temperatura, setTemperatura] = useState("");
  const [valorData, setValorData] = useState(dayjs());
  const [icone, setIcone] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [validDate, setValidDate] = useState(false);
  const [climaSize, setClimaSize] = useState("h4");

  const handleClima = async (diff) => {
    try {
      const response = await axios.get(url);
      const clima = response.data.forecast;

      if (diff < 0) {
        setErrMsg("Selecione uma data futura");
        setClima("");
        setIcone("");
        setTemperatura("");
        setValidDate(false);
      } else if (diff > 2) {
        setClimaSize("body1");
        setClima("Previsão do tempo indisponível para a data selecionada");
        setIcone("");
        setTemperatura("");
        setValidDate(true);
      } else {
        setClimaSize("h4");
        setClima(clima.forecastday[diff].day.condition.text);
        setTemperatura(Math.floor(clima.forecastday[diff].day.avgtemp_c) + "°C");
        setIcone(clima.forecastday[diff].day.condition.icon);

        setErrMsg("");
        setValidDate(true);
      }
    } catch (error) {
      console.error(error);
      setClima("");
      setIcone("");
      setTemperatura("");
      setErrMsg("Erro inesperado ao obter a previsão do tempo. Tente novamente mais tarde.");
    }
  };

  const handleHome = () => {
    navigate(`/Home`);
  };

  const handleDateChange = (event) => {
    var dataSelecionada = format(event.$d, "yyyy-MM-dd");
    //console.log("DATA SELECIONADA: " + dataSelecionada);
    //console.log("DATA ATUAL: " + format(new Date(), "yyyy-MM-dd"));
    const diff = calcDiff(dataSelecionada);
    console.log("DIFF: " + diff);

    if (diff >= 0) {
      setValorData(event);

      handleClima(diff);
    }
    else {
      setErrMsg("Selecione uma data futura");
      setClima("");
      setIcone("");
      setTemperatura("");
      setValidDate(false);
    }
  };

  const handleAgendar = async () => {
    if (validDate) {
      //mandar pro back
      console.log("Data escolhida: " + format(valorData.$d, "yyyy-MM-dd"));
      let resp = await adicionarLembrete(cpf, format(valorData.$d, "yyyy-MM-dd"));
      console.log(resp);

      if (resp == "ERR;data_invalida") {
        setErrMsg("Data inválida");
      }
      else if (resp == "OK;lembrete_adicionado") {
        setErrMsg("");
        setModalOpen(true);
      }
    }
    else {
      setErrMsg("Selecione uma data válida");
    }
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <NavBar isLoggedIn={true} cpf={cpf} />
      <Titulo texto="Agendar lembrete de visita" mW="md" />
      <Container component="main" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Stack spacing={2} direction="column" divider={<Divider orientation="horizontal" flexItem />}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <Typography variant="h5" align='center'>Escolha a data da sua visita</Typography>
            <DatePicker value={valorData} onChange={handleDateChange} />
            <Box> <img src={icone} /> </Box>
            <Typography variant={climaSize} align='center'>{clima}</Typography>
            <Typography variant="h6" align='center'>{temperatura}</Typography>
          </Box>
          <Button variant="contained" color='secondary' onClick={() => { handleAgendar(); }}>Agendar</Button>
        </Stack>
        <ModalOk title="Agendamento realizado com sucesso" open={modalOpen} onClose={() => setModalOpen(true)} bt1Text="OK" bt1Href={handleHome} />
        <Typography variant="h6" color="error" align='center'>{errMsg}</Typography>
      </Container>
    </ThemeProvider >
  );
}

export default AgendarLembrete;