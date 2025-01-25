import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMeusJazigos, getJazigos } from './api';

const ListaJazigos = ({ cliente, admin }) => {
  const cpf = sessionStorage.getItem('cpf');
  const navigate = useNavigate();
  const [jazigos, setJazigos] = useState([]);

  const fetchJazigos = async () => {
    try {
      var response;
      if (cliente) response = await getMeusJazigos(cpf);
      else if (admin) response = await getJazigos();
      else alert("Erro! Especifique se o usuário é cliente ou admin na chamada do componente ListaJazigos");

      console.log("Resposta da API: ");
      console.log(response);
      setJazigos(response);
    } catch (error) {
      console.log(error);
      alert("Erro na conexão com o back");
    }
  };

  useEffect(() => {
    fetchJazigos();
  }, [cpf]);

  const handleAgendarEnterro = (idJazigo) => {
    navigate(`/AgendarEnterro?id=${idJazigo}`);
  };

  const handleAgendarExumacao = (idJazigo) => {
    navigate(`/AgendarExumacao?id=${idJazigo}`);
  };

  const handlePersonalizarJazigo = (idJazigo) => {
    navigate(`/PersonalizarJazigo?id=${idJazigo}`);
  };

  const handleHistorico = (idJazigo) => {
    navigate(`/Historico?id=${idJazigo}`);
  };

  return (
    <React.Fragment>

      <Container component="main" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {jazigos.map((jazigo, index) => (
          <Accordion sx={{ width: '100%', backgroundColor: jazigo.nomePet ? '#471f1d' : '#262e26' }} key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index + 1}-content`} id={`panel${index + 1}-header`}>
              <Typography variant="h6">Jazigo {jazigo.endereco}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="h6">ID: {jazigo.idJazigo}</Typography>
              <Typography variant="h6">Nome do Pet: {jazigo.nomePet}</Typography>
              {jazigo.dataEnterro ? (
                <Typography variant="h6">Data de Enterro: {format(new Date(jazigo.dataEnterro), 'dd/MM/yyyy')}</Typography>
              ) : (
                <Typography variant="h6">Data de Enterro: </Typography>
              )}
              <Typography variant="h6">Endereço: {jazigo.endereco}</Typography>
              <Typography variant="h6">Plano: {jazigo.plano}</Typography>
              {jazigo.dataNascimento ? (
                <Typography variant="h6">Data de Nascimento: {format(new Date(jazigo.dataNascimento), 'dd/MM/yyyy')}</Typography>
              ) : (
                <Typography variant="h6">Data de Nascimento: </Typography>
              )}
              <Typography variant="h6">Espécie: {jazigo.especie}</Typography>
              {jazigo.mensagem && (
                <Typography variant="h6">Mensagem: {(jazigo.mensagem).replace(/"/g, '')}</Typography>
              )}

              {cliente && jazigo.nomePet == "" && (
                <Stack spacing={2} direction='row' sx={{ margin: 2 }}>
                  <Button variant="contained" color="primary" onClick={() => handleAgendarEnterro(jazigo.idJazigo)}> Agendar enterro </Button>
                  <Button variant="contained" color="secondary" onClick={() => handlePersonalizarJazigo(jazigo.idJazigo)}> Personalizar Jazigo </Button>
                </Stack>
              )}

              {cliente && jazigo.nomePet != "" && (
                <Stack spacing={2} direction='row' sx={{ margin: 2 }}>
                  <Button variant="contained" color="error" onClick={() => handleAgendarExumacao(jazigo.idJazigo)}> Agendar exumação </Button>
                  <Button variant="contained" color="secondary" onClick={() => handlePersonalizarJazigo(jazigo.idJazigo)}> Personalizar Jazigo </Button>
                </Stack>
              )}

              {admin && (
                <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={() => handleHistorico(jazigo.idJazigo)}>Histórico</Button>
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>

    </React.Fragment>
  );
};

export default ListaJazigos;
