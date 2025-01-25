import React, { useEffect, useState } from 'react';
import { visualizarReuniao } from '../components/api'; // Importando a função
import { Box, Typography, Container, CssBaseline, Divider, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from '../components/NavBar';
import Titulo from '../components/Titulo';

const mainTheme = createTheme({ palette: { mode: 'dark', }, });

function VisualizarReuniao() {
    const cpf = sessionStorage.getItem('cpf');
    const [reunioes, setReunioes] = useState([]);

    const fetchReunioes = async () => {
        const reunioes = await visualizarReuniao();
        setReunioes(reunioes);
    };

    useEffect(() => {
        fetchReunioes();
    }, []);

    return (
        <ThemeProvider theme={mainTheme}>
            <CssBaseline />
            <NavBar isAdmin={true} />
            <Titulo texto="Visualizar Reuniões" mW="md" />
            <Container component="main" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Stack spacing={2} direction="column" divider={<Divider orientation="horizontal" flexItem />}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>CPF do Cliente</TableCell>
                                    <TableCell>Data</TableCell>
                                    <TableCell>Horário</TableCell>
                                    <TableCell>Assunto</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reunioes.map((reuniao, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{reuniao.cpfCliente}</TableCell>
                                        <TableCell>{reuniao.data}</TableCell>
                                        <TableCell>{reuniao.horario}</TableCell>
                                        <TableCell>{reuniao.assunto}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
            </Container>
        </ThemeProvider >
    );
}

export default VisualizarReuniao;
