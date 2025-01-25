import { Divider, Grid, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import ServicoDisplay from '../components/ServicoDisplay';
import Titulo from '../components/Titulo';
import { exibirServicos } from '../components/api';
const mainTheme = createTheme({ palette: { mode: 'dark', }, });

function AlterarValorPlanos() {
  const [errMsg, setErrMsg] = useState("");
  const [servicos, setServicos] = useState(
    [{
      tipoServico: "COMPRA",
      valor: 0
    },
    {
      tipoServico: "ALUGUEL",
      valor: 0
    },
    {
      tipoServico: "PERSONALIZACAO",
      valor: 0
    },
    {
      tipoServico: "MANUTENCAO",
      valor: 0
    },
    {
      tipoServico: "ENTERRO",
      valor: 0
    },
    {
      tipoServico: "EXUMACAO",
      valor: 0
    },
    {
      tipoServico: "BASIC",
      valor: 0
    },
    {
      tipoServico: "SILVER",
      valor: 0
    },
    {
      tipoServico: "GOLD",
      valor: 0
    }
    ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await exibirServicos();
        console.log(response);

        const servicoResponse = {};

        response.forEach((item) => {
          const { tipoServico, valor } = item;

          switch (tipoServico) {
            case "COMPRA":
              servicoResponse.precoCompra = valor;
              break;
            case "ALUGUEL":
              servicoResponse.precoAluguel = valor;
              break;
            case "PERSONALIZACAO":
              servicoResponse.precoPersonalizacao = valor;
              break;
            case "MANUTENCAO":
              servicoResponse.precoManutencao = valor;
              break;
            case "ENTERRO":
              servicoResponse.precoEnterro = valor;
              break;
            case "EXUMACAO":
              servicoResponse.precoExumacao = valor;
              break;
            case "BASIC":
              servicoResponse.precoBasic = valor;
              break;
            case "SILVER":
              servicoResponse.precoSilver = valor;
              break;
            case "GOLD":
              servicoResponse.precoGold = valor;
              break;
            default:
              break;
          }
        });

        setServicos(servicoResponse);
      } catch (error) {
        setErrMsg("Erro ao requisitar o valor serviços");
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <NavBar isAdmin={true} />
      <Titulo texto="Alterar valor dos serviços" mW="md" />
      <Container component="main" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Stack direction="column" spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
              <ServicoDisplay nomeServico="COMPRA" precoServico={servicos.precoCompra} />
              <ServicoDisplay nomeServico="ALUGUEL" precoServico={servicos.precoAluguel} />
              <ServicoDisplay nomeServico="ENTERRO" precoServico={servicos.precoEnterro} />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="column" spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
              <ServicoDisplay nomeServico="BASIC" precoServico={servicos.precoBasic} />
              <ServicoDisplay nomeServico="SILVER" precoServico={servicos.precoSilver} />
              <ServicoDisplay nomeServico="GOLD" precoServico={servicos.precoGold} />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="column" spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
              <ServicoDisplay nomeServico="MANUTENCAO" precoServico={servicos.precoManutencao} />
              <ServicoDisplay nomeServico="EXUMACAO" precoServico={servicos.precoExumacao} />
            </Stack>
          </Grid>
        </Grid>
        <Typography variant="h6" color="error" align='center'>{errMsg}</Typography>
      </Container>
    </ThemeProvider >
  );
}

export default AlterarValorPlanos;
