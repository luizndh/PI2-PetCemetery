import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers';
import React, { useState } from 'react';
import ModalOk from '../components/ModalOk';
import NavBar from '../components/NavBar';
import Titulo from '../components/Titulo';
import { useNavigate } from 'react-router-dom';
import { alterarDataAtual } from '../components/api';
import { format } from 'date-fns';

const mainTheme = createTheme({ palette: { mode: 'dark', }, });

function TimeSkip() {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const handleHomeAdmin = () => { navigate(`/HomeAdmin`); };

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    const handleConfirmDate = async () => {
        if (selectedDate) {
            await alterarDataAtual(format(selectedDate.$d, "yyyy-MM-dd"));
            setModalOpen(true);
        };
    }

    return (
      <ThemeProvider theme={mainTheme}>
        <CssBaseline />
        <NavBar isAdmin={true} />
        <Titulo texto="Time Skip" mW="sm" />
        <Container component="main" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
              <Typography variant="h5" align='center'>Escolha a data do time skip</Typography>
              <DatePicker label="Data do time skip" sx={{ marginBottom: 2 }} onChange={handleDateChange} />
              <Button variant="contained" color='secondary' onClick={handleConfirmDate}>Confirmar</Button>
            </Box>
          <ModalOk title="Time skip realizado com sucesso!" open={modalOpen} onClose={() => setModalOpen(true)} bt1Text="OK" bt1Href={handleHomeAdmin} />
        </Container>
      </ThemeProvider >
    );
};

export default TimeSkip;
