import React, { useEffect, useState } from 'react';
import { getJazigos, gerarPDFjazigos } from '../components/api'; // Importando a função
import { Box, Typography, Container, CssBaseline, Divider, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from '../components/NavBar';
import Titulo from '../components/Titulo';

const mainTheme = createTheme({ palette: { mode: 'dark', }, });

function VisualizarJazigos() {
    const [jazigos, setJazigos] = useState([]);

    const pegaJazigos = async () => {
        const jazigosDTO = await getJazigos();
        setJazigos(jazigosDTO);
    };

    const handleGerarPDF = async () => {
        await gerarPDFjazigos();
    };

    useEffect(() => {
        pegaJazigos();
    }, []);

    return (
        <ThemeProvider theme={mainTheme}>
            <CssBaseline />
            <NavBar isAdmin={true} />
            <Titulo texto="Jazigos" mW="md" />
            <Container component="main" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ my: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleGerarPDF}>Gerar PDF</Button>
                </Box>
                <Stack spacing={2} direction="column" divider={<Divider orientation="horizontal" flexItem />}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>endereco</TableCell>
                                    <TableCell>CPF</TableCell>
                                    <TableCell>Plano</TableCell>
                                    <TableCell>Pet</TableCell>
                                    <TableCell>Especie</TableCell>
                                    <TableCell>DataNascimento</TableCell>
                                    <TableCell>DataEnterro</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {jazigos.sort((a, b) => a.idJazigo - b.idJazigo).map(jazigo => (
                                    <TableRow key={jazigo.idJazigo}>
                                        <TableCell>{jazigo.idJazigo}</TableCell>
                                        <TableCell>{jazigo.endereco}</TableCell>
                                        <TableCell>{jazigo.cpfCliente}</TableCell>
                                        <TableCell>{jazigo.plano}</TableCell>
                                        <TableCell>{jazigo.nomePet}</TableCell>
                                        <TableCell>{jazigo.especie}</TableCell>
                                        <TableCell>{jazigo.dataNascimento}</TableCell>
                                        <TableCell>{jazigo.dataEnterro}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
            </Container>
        </ThemeProvider>
    );
}

export default VisualizarJazigos;
