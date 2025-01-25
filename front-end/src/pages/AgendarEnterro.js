import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers';
import { format } from "date-fns";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalOk from '../components/ModalOk';
import NavBar from '../components/NavBar';
import Titulo from '../components/Titulo';
import { agendarEnterro } from '../components/api';
import { getUrlParams } from '../utils/utils';

const mainTheme = createTheme({ palette: { mode: 'dark', }, });

function AgendarEnterro() {
  const navigate = useNavigate();
  const cpf = sessionStorage.getItem('cpf');
  const idJazigo = getUrlParams('id');

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [nomePet, setNomePet] = useState('');
  const [especie, setEspecie] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  const [modalOpen, setModalOpen] = useState(false);

  const handleHome = () => {
    navigate(`/Home`);
  };

  const handleDateEnterroChange = (event) => { setSelectedDate(format(event.$d, "yyyy-MM-dd")); };
  const handleTimeChange = (event) => { setSelectedTime(event.target.value + ""); };
  const handleNomePetChange = (event) => { setNomePet(event.target.value); };
  const handleEspecieChange = (event) => { setEspecie(event.target.value); };
  const handleDateNascimentoChange = (event) => { setDataNascimento(format(event.$d, "yyyy-MM-dd")); };

  const handleAgendar = async () => { // Função atualizada
    const enterro = {
      data: selectedDate,
      horario: selectedTime,
    };

    console.log("Dados do agendamento sendo feito:");
    console.log("CPF: " + cpf);
    console.log("ID do jazigo: " + idJazigo);
    console.log("Data: " + enterro.data);
    console.log("Horário: " + enterro.horario);
    console.log("Nome do pet: " + nomePet);
    console.log("Espécie: " + especie);
    console.log("Data de nascimento: " + dataNascimento);

    try {
      const response = await agendarEnterro(cpf, idJazigo, enterro.data, enterro.horario, nomePet, especie, dataNascimento);
      console.log(response);
      let resp = response.split(';');
      if (resp[0] === "OK") {
        console.log(resp);
        setModalOpen(true);
      } else {
        console.error('Erro ao agendar enterro:', response);
      }
    } catch (error) {
      console.error('Erro ao agendar enterro:', error);
    }
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <NavBar isLoggedIn={true} cpf={cpf} />
      <Titulo texto="Agendar Enterro" mW="sm" />
      <Container component="main" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Stack spacing={2} direction="column" divider={<Divider orientation="horizontal" flexItem />}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <TextField label="Nome do Pet" sx={{ marginBottom: 2 }} value={nomePet} onChange={handleNomePetChange} fullWidth required />
            <TextField label="Espécie" value={especie} onChange={handleEspecieChange} fullWidth required />
          </Box>
          <DatePicker label="Data de Nascimento do Pet" sx={{ marginBottom: 2 }} onChange={handleDateNascimentoChange} />
          <DatePicker label="Data de Enterro" onChange={handleDateEnterroChange} />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <Typography variant="h5" align='center'>Lista de horários disponíveis</Typography>
            <FormControl fullWidth>
              <InputLabel></InputLabel>
              <Select value={selectedTime} onChange={handleTimeChange}>
                <MenuItem value="08:00">08:00</MenuItem>
                <MenuItem value="09:00">09:00</MenuItem>
                <MenuItem value="10:00">10:00</MenuItem>
                <MenuItem value="11:00">11:00</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button variant="contained" color='secondary' onClick={handleAgendar}>Agendar</Button>
        </Stack>
        <ModalOk title="Agendamento realizado com sucesso" open={modalOpen} onClose={() => setModalOpen(true)} bt1Text="OK" bt1Href={handleHome} />
      </Container>
    </ThemeProvider >
  );
}

export default AgendarEnterro;
