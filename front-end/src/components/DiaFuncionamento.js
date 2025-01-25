import { Box, Checkbox, Divider, FormControlLabel, Paper, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { TimePicker } from '@mui/x-date-pickers';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
const mainTheme = createTheme({ palette: { mode: 'dark', }, });

const DiaFuncionamento = ({ dia, horarioFuncionamento, onChange }) => {
    if (dia != "segunda" && dia != "terca" && dia != "quarta" && dia != "quinta" && dia != "sexta" && dia != "sabado" && dia != "domingo" && dia != "feriado") alert("Dia inválido!");
    function toUpper(string) { return string.charAt(0).toUpperCase() + string.slice(1); }
    const [cor, setCor] = useState('');
    const [abertura, setAbertura] = useState(dayjs());
    const [fechamento, setFechamento] = useState(dayjs());
    const [fechado, setFechado] = useState(false);

    useEffect(() => {
        if (dia == "segunda" || dia == "terca" || dia == "quarta" || dia == "quinta" || dia == "sexta") setCor('#1f3321');
        else if (dia == "sabado" || dia == "domingo") setCor('#331b1d');
        else if (dia == "feriado") setCor('#4a0f14');
    }, [dia]);

    useEffect(() => {
        if (horarioFuncionamento) {
            setAbertura(dayjs().set('hour', parseInt(horarioFuncionamento.abertura.split(':')[0])).set('minute', parseInt(horarioFuncionamento.abertura.split(':')[1])));;
            setFechamento(dayjs().set('hour', parseInt(horarioFuncionamento.fechamento.split(':')[0])).set('minute', parseInt(horarioFuncionamento.fechamento.split(':')[1])));
            setFechado(horarioFuncionamento.fechado);

            console.log("Horários:");
            console.log(horarioFuncionamento.abertura);
            console.log(horarioFuncionamento.fechamento);
        }
        else { console.log("weird shit"); }
    }, [horarioFuncionamento]);

    const handleChange = (newAbertura, newFechamento, newFechado) => {
        const updatedHorarioFuncionamento = {
            abertura: newAbertura.format('HH:mm'),
            fechamento: newFechamento.format('HH:mm'),
            fechado: newFechado
        };

        onChange(dia, updatedHorarioFuncionamento);
    };

    const handleAberturaChange = (value) => {
        handleChange(value, fechamento, fechado);
    };

    const handleFechamentoChange = (value) => {
        handleChange(abertura, value, fechado);
    };

    const handleFechadoChange = (event) => {
        handleChange(abertura, fechamento, event.target.checked);
    };

    return (
        <React.Fragment>
            <ThemeProvider theme={mainTheme}>
                <Paper elevation={3} sx={{ padding: 2, margin: 1, backgroundColor: cor }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h5"> {toUpper(dia)} </Typography>
                        <Divider sx={{ width: '100%', marginBottom: 2 }} />

                        <Typography variant="h6">Abertura</Typography>
                        <TimePicker value={abertura} onChange={handleAberturaChange} sx={{ marginBottom: 2 }} />

                        <Typography variant="h6">Fechamento</Typography>
                        <TimePicker value={fechamento} onChange={handleFechamentoChange} sx={{ marginBottom: 2 }} />
                        <FormControlLabel control={<Checkbox checked={fechado} onChange={handleFechadoChange} />} label="Fechado" />

                    </Box>
                </Paper>

            </ThemeProvider>
        </React.Fragment>
    );
};

export default DiaFuncionamento;
