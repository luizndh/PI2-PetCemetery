import React, { useEffect, useState } from 'react';
import { getEnterros, gerarPDFenterros } from '../components/api'; // Importando a função
import { Box, Typography, Container, CssBaseline, Divider, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from '../components/NavBar';
import Titulo from '../components/Titulo';

const mainTheme = createTheme({ palette: { mode: 'dark', }, });

function VisualizarEnterros() {
    const [enterros, setEnterros] = useState([]);

    const pegaEnterros = async () => {
        const servicosDTO = await getEnterros();
        setEnterros(servicosDTO);
    };

    const handleGerarPDF = async () => {
        await gerarPDFenterros();
    };

    useEffect(() => {
        pegaEnterros();
    }, []);

    return (
        <ThemeProvider theme={mainTheme}>
            <CssBaseline />
            <NavBar isAdmin={true} />
            <Titulo texto="Enterros" mW="md" />
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
                                {enterros.map(enterro => (
                                    <TableRow key={enterro.valor}>
                                        <TableCell>{enterro.valor}</TableCell>
                                        <TableCell>{enterro.enderecoJazigo}</TableCell>
                                        <TableCell>{enterro.cpfCliente}</TableCell>
                                        <TableCell>{enterro.dataServico}</TableCell>
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

export default VisualizarEnterros;
