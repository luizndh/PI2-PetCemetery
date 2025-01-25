import React, { useEffect, useState } from 'react';
import { relatorioInadimplente } from '../components/api'; // Importando a função
import { Box, Typography, Container, CssBaseline, Divider, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from '../components/NavBar';
import Titulo from '../components/Titulo';

const mainTheme = createTheme({ palette: { mode: 'dark', }, });

function RelatorioInadimplente() {
    const [clientes, setClientes] = useState([]);

    const fetchClientesInadimplentes = async () => {
        const dadosClientes = await relatorioInadimplente();
        console.log(dadosClientes);
        setClientes(dadosClientes);
    };

    useEffect(() => {
        fetchClientesInadimplentes();
    }, []);

    return (
        <ThemeProvider theme={mainTheme}>
            <CssBaseline />
            <NavBar isAdmin={true} />
            <Titulo texto="Clientes Inadimplentes" mW="md" />
            <Container component="main" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Stack spacing={2} direction="column" divider={<Divider orientation="horizontal" flexItem />}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Telefone</TableCell>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Desativado</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {clientes && clientes.map(cliente => (
                                    <TableRow key={cliente.email}>
                                        <TableCell>{cliente.email}</TableCell>
                                        <TableCell>{cliente.telefone}</TableCell>
                                        <TableCell>{cliente.nome}</TableCell>
                                        <TableCell>{cliente.desativado ? "Sim" : "Não"}</TableCell>
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

export default RelatorioInadimplente;
