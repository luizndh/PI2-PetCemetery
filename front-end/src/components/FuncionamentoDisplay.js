import { Box, Checkbox, Divider, FormControlLabel, Paper, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
const mainTheme = createTheme({ palette: { mode: 'dark', }, });

const FuncionamentoDisplay = ({ dia, horarioFuncionamento, onChange }) => {
    if (dia != "segunda" && dia != "terca" && dia != "quarta" && dia != "quinta" && dia != "sexta" && dia != "sabado" && dia != "domingo" && dia != "feriado") alert("Dia inválido!");
    function toUpper(string) { return string.charAt(0).toUpperCase() + string.slice(1); }
    const [cor, setCor] = useState('');
    const [abertura, setAbertura] = useState("");
    const [fechamento, setFechamento] = useState("");
    const [fechado, setFechado] = useState(false);

    useEffect(() => {
        if (dia == "segunda" || dia == "terca" || dia == "quarta" || dia == "quinta" || dia == "sexta") setCor('#1f3321');
        else if (dia == "sabado" || dia == "domingo") setCor('#331b1d');
        else if (dia == "feriado") setCor('#4a0f14');
    }, [dia]);

    useEffect(() => {
        if (horarioFuncionamento) {
            setAbertura(dayjs().set('hour', parseInt(horarioFuncionamento.abertura.split(':')[0])).set('minute', parseInt(horarioFuncionamento.abertura.split(':')[1])).format('HH:mm').toString());
            setFechamento(dayjs().set('hour', parseInt(horarioFuncionamento.fechamento.split(':')[0])).set('minute', parseInt(horarioFuncionamento.fechamento.split(':')[1])).format('HH:mm').toString());
            setFechado(horarioFuncionamento.fechado);

            console.log("Horários:");
            console.log(horarioFuncionamento.abertura);
            console.log(horarioFuncionamento.fechamento);
        }
        else { console.log("weird shit"); }
    }, [horarioFuncionamento]);

    return (
        <React.Fragment>
            <ThemeProvider theme={mainTheme}>
                <Paper elevation={3} sx={{ padding: 2, margin: 1, backgroundColor: cor }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h5"> {toUpper(dia)} </Typography>
                        <Divider sx={{ width: '100%', marginBottom: 2 }} />

                        <Typography variant="h6">Abertura</Typography>
                        <Typography variant="h4" sx={{ margin: 2 }}>{fechado ? "----" : abertura}</Typography>

                        <Typography variant="h6">Fechamento</Typography>
                        <Typography variant="h4" sx={{ margin: 2 }}>{fechado ? "----" : fechamento}</Typography>
                        
                        <FormControlLabel control={<Checkbox checked={fechado} disabled />} label="Fechado" />
                    </Box>
                </Paper>

            </ThemeProvider>
        </React.Fragment>
    );
};

export default FuncionamentoDisplay;
