import React, { useEffect, useState } from 'react';
import { getExumacoes } from '../components/api'; // Importando a função
import { Box, Typography, Container, CssBaseline, Divider, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import NavBar from '../components/NavBar';
import Titulo from '../components/Titulo';
const mainTheme = createTheme({ palette: { mode: 'dark', }, });

function ClientesInadimplentes() {

    return (
        <ThemeProvider theme={mainTheme}>
            <CssBaseline />
            <NavBar isAdmin={true} />
            <Titulo texto="Clientes inadimplentes" mW="md" />
            <Container component="main" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            </Container>
        </ThemeProvider>
    );
}

export default ClientesInadimplentes;
