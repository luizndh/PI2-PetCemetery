import React, { useEffect, useState } from 'react';
import { getExumacoes, gerarPDFexumacoes } from '../components/api'; // Importando a função
import { Box, Typography, Container, CssBaseline, Divider, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from '../components/NavBar';
import Titulo from '../components/Titulo';

const mainTheme = createTheme({ palette: { mode: 'dark', }, });

function VisualizarExumacoes() {
    const [exumacoes, setExumacoes] = useState([]);

    const pegaExumacoes = async () => {
        const servicosDTO = await getExumacoes();
        setExumacoes(servicosDTO);
    };

    const handleGerarPDF = async () => {
        await gerarPDFexumacoes();
    };

    useEffect(() => {
        pegaExumacoes();
    }, []);

    return (
        <ThemeProvider theme={mainTheme}>
            <CssBaseline />
            <NavBar isAdmin={true} />
            <Titulo texto="Exumações" mW="md" />
            <Container component="main" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ my: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleGerarPDF}>Gerar PDF</Button>
                </Box>
                <Stack spacing={2} direction="column" divider={<Divider orientation="horizontal" flexItem />}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Valor</TableCell>
                                    <TableCell>Jazigo</TableCell>
                                    <TableCell>CPF</TableCell>
                                    <TableCell>Data</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {exumacoes.map(exumacao => (
                                    <TableRow key={exumacao.valor}>
                                        <TableCell>{exumacao.valor}</TableCell>
                                        <TableCell>{exumacao.enderecoJazigo}</TableCell>
                                        <TableCell>{exumacao.cpfCliente}</TableCell>
                                        <TableCell>{exumacao.dataServico}</TableCell>
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

export default VisualizarExumacoes;
