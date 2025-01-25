import { Button, Checkbox, Container, CssBaseline, Divider, Grid, List, ListItem, ListItemText, Paper, Stack, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Titulo from '../components/Titulo';
import { visualizarDespesas } from '../components/api';
import ConfirmarCompra from './ConfirmarCompra';

const mainTheme = createTheme({ palette: { mode: 'dark' } });

function VisualizarDespesas() {
  const navigate = useNavigate();
  const cpf = sessionStorage.getItem('cpf');
  const [despesasPagas, setDespesasPagas] = useState([]);
  const [despesasNaoPagas, setDespesasNaoPagas] = useState([]);
  const [selectedDespesas, setSelectedDespesas] = useState([]);

  useEffect(() => {
    const fetchDespesas = async () => {
      const despesas = await visualizarDespesas(cpf);
      console.log(despesas);

      setDespesasPagas(despesas.filter((despesa) => despesa.ultimoPagamento !== null));
      setDespesasNaoPagas(despesas.filter((despesa) => despesa.ultimoPagamento === null));
    };

    fetchDespesas();
  }, [cpf]);

  const handleToggle = (index) => {
    const currentIndex = selectedDespesas.indexOf(index);
    const newSelectedDespesas = [...selectedDespesas];

    if (currentIndex === -1) {
      newSelectedDespesas.push(index);
    } else {
      newSelectedDespesas.splice(currentIndex, 1);
    }

    setSelectedDespesas(newSelectedDespesas);
  };

  const handleDataUltimoPagamento = (despesa) => {
    if (despesa.ultimoPagamento === null) {
      return '--/--/----';
    } else {
      const data = new Date(despesa.ultimoPagamento);
      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();

      return `${dia}/${mes}/${ano}`;
    }
  }

  const handleDataVencimento = (despesa) => {
    if (despesa.dataVencimento === null) {
      return '--/--/----';
    } else {
      const data = new Date(despesa.ultimoPagamento);
      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();

      return `${dia}/${mes}/${ano}`;
    }
  }

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <NavBar isLoggedIn={true} cpf={cpf} />
      <Titulo texto="Suas despesas" mW="sm" />
      <Container component="main" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item xs={6}>
            <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, margin: 1 }}>
              <Typography variant="h5" sx={{ marginBottom: 2 }}>Despesas Pagas</Typography>
              <Stack direction='column' divider={<Divider orientation="horizontal" flexItem />} sx={{ width: '100%', maxWidth: '800px' }}>
                {despesasPagas.map((despesaPaga, indexPaga) => {
                  return (
                    <ListItem key={indexPaga} role={undefined}>
                      <ListItemText primary={`Despesa ${indexPaga + 1}`} secondary={`Valor: ${despesaPaga.valor} | Servico: ${despesaPaga.tipoServico} | Ultimo Pagamento: ${handleDataUltimoPagamento(despesaPaga)} | Data Vencimento: ${handleDataVencimento(despesaPaga)}`} secondaryTypographyProps={{ noWrap: false }} />
                    </ListItem>
                  );
                })}
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, margin: 1 }}>
              <Typography variant="h5" sx={{ marginBottom: 2 }}>Despesas Não Pagas</Typography>
              <Stack direction='column' divider={<Divider orientation="horizontal" flexItem />} sx={{ width: '100%', maxWidth: '800px' }}>
                {despesasNaoPagas.map((despesaNaoPaga, indexNaoPaga) => {
                  const labelId = `checkbox-list-label-${indexNaoPaga}`;
                  return (
                    <ListItem key={indexNaoPaga} role={undefined}>
                      <ListItemText primary={`Despesa ${indexNaoPaga + 1}`} secondary={`Valor: ${despesaNaoPaga.valor} | Servico: ${despesaNaoPaga.tipoServico} | Ultimo Pagamento: ${handleDataUltimoPagamento(despesaNaoPaga)} | Data Vencimento: ${handleDataVencimento(despesaNaoPaga)}`} secondaryTypographyProps={{ noWrap: false }} />
                    </ListItem>
                  );
                })}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={() => { navigate("/ConfirmarCompra") }}>Ir para carrinho</Button>
      </Container>
    </ThemeProvider>
  );
}

export default VisualizarDespesas;
