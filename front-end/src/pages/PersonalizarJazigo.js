import { Box, Button, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalOk from '../components/ModalOk';
import NavBar from '../components/NavBar';
import Titulo from '../components/Titulo';
import { alterarPlano, getInfoPersonalizacao, personalizarJazigo } from '../components/api';
import placeholder from '../placeholder.png';
import { getUrlParams } from '../utils/utils';

const mainTheme = createTheme({ palette: { mode: 'dark' } });

const PersonalizarJazigo = () => {
  const cpf = sessionStorage.getItem('cpf');
  const id = getUrlParams('id');

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlano, setSelectedPlano] = useState('');
  const [plano, setPlano] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [foto, setFoto] = useState();
  const [resultado, setResultado] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [textBoxDisabled, setTextBoxDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Recuperar a URL da imagem do armazenamento local
    const cachedUrlFoto = sessionStorage.getItem(`urlFoto${id}`);

    if (cachedUrlFoto) {
      setFoto(cachedUrlFoto);
    }
  }, [id]);

  const handlePlanoChange = (event) => {
    setSelectedPlano(event.target.value);
  };

  const handleAlterarPlano = () => {
    try {
      alterarPlano(cpf, id, selectedPlano)
      setModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchInfoPersonalizacao = async () => {
    try {
      var resp = await getInfoPersonalizacao(cpf, id);
      console.log(resp);


      if (resp != null) resp = resp.split(';');
      else { console.log("Resposta do back = null"); setErrMsg("Erro na conexão com o servidor. Verifique sua rede"); return; }

      if (resp[1] === '""') resp[1] = "null";

      setPlano(resp[3]);

      if (resp[1] !== "null") {
        console.log("Mensagem:" + resp[1] + ".");
        setTextBoxDisabled(true);
        setMensagem(resp[1].replace(/"/g, ""));
      }
      else {
        setMensagem("");
        setTextBoxDisabled(false);
      }
    } catch (error) {
      console.log(error);
      alert("Erro na conexão com o back");
    }
  };

  useEffect(() => {
    fetchInfoPersonalizacao();
  }, [cpf]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await personalizarJazigo(cpf, id, mensagem, foto);

      if (response === 'OK;Mensagem_editada') {
        setIsModalOpen(true);
      } else {
        setErrMsg('Erro ao editar a mensagem do jazigo');
      }
    } catch (error) {
      setErrMsg('Erro ao editar a mensagem do jazigo');
    }
  };

  const handleChooseImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageData = e.target.result;

        // Armazenar os dados da imagem como uma string base64 no estado e no armazenamento local
        setFoto(imageData);
        sessionStorage.setItem(`urlFoto${id}`, imageData);
      };

      reader.readAsDataURL(file);
    };
    input.click();
  };

  const handleHome = () => { navigate('/Home'); };

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <NavBar isLoggedIn={true} cpf={cpf} />
      <Titulo texto="Detalhes do Jazigo" mW="md" />
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box display="flex" marginTop={2}>
          <Box flexBasis="50%" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} >
            {foto ? (
              <img src={foto} alt="Imagem do Jazigo" width="40%" />
            ) : (
              <img src={placeholder} alt="Imagem do Jazigo placeholder" width="40%" />
            )}
            <Button variant="contained" color="secondary" sx={{ marginTop: 2 }} onClick={handleChooseImage}> Escolher Imagem </Button>
          </Box>

          <Divider orientation="vertical" sx={{ marginLeft: 3, marginRight: 3 }} flexItem />

          <Box flexBasis="50%" pl={2}>
            <Typography variant="h5">Mensagem na lápide</Typography>
            <TextField multiline rows={4} disabled={textBoxDisabled} fullWidth placeholder="Digite a mensagem da lápide" value={mensagem} onChange={(e) => setMensagem(e.target.value)} />
            <Typography variant="caption" color="textSecondary"> Limite de 80 caracteres </Typography>
          </Box>

          <Divider orientation="vertical" sx={{ marginLeft: 3, marginRight: 3 }} flexItem />

          <Box flexBasis="50%" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} pl={2}>
            <Typography variant="h5">Plano Atual:</Typography>
            <Typography sx={{ marginBottom: 2 }} variant="h3">{plano}</Typography>

            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Planos Disponíveis:</FormLabel>
              <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={selectedPlano} onChange={handlePlanoChange}>
                <FormControlLabel disabled={plano === "BASIC"} value="BASIC" control={<Radio />} label="Basic" />
                <FormControlLabel disabled={plano === "SILVER"} value="SILVER" control={<Radio />} label="Silver" />
                <FormControlLabel disabled={plano === "GOLD"} value="GOLD" control={<Radio />} label="Gold" />
              </RadioGroup>
              <Button variant="contained" color="secondary" onClick={handleAlterarPlano} >Alterar Plano</Button>
              <ModalOk title="Troca de plano no carrinho" open={modalOpen} onClose={() => setModalOpen(true)} bt1Text="OK" bt1Href={handleHome} />
            </FormControl>
          </Box>

        </Box>
        <Box display="flex" justifyContent="center" gap={2} marginTop={4}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>Alterar Informações</Button>
        </Box>
      </Box>
      <Typography variant="h5" color="error" align='center'>{errMsg}</Typography>
      <ModalOk title={"Informações alteradas com sucesso"} open={isModalOpen} bt1Text="Voltar" bt1Href={handleHome} />
    </ThemeProvider>
  );
};

export default PersonalizarJazigo;
