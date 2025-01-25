import { Box, Divider, Paper, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { alterarValorServico, exibirServicos } from '../components/api';
import InputAdornment from '@mui/material/InputAdornment';
import { Button, TextField } from '@mui/material';
const mainTheme = createTheme({ palette: { mode: 'dark', }, });

const ServicoDisplay = ({ nomeServico, precoServico }) => {
    const [preco, setPreco] = useState("");
    const [nome, setNome] = useState("");

    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        if (nomeServico) {
            setNome(nomeServico);
            console.log("Nome do servico: " + nomeServico);
        }
        else { console.log("weird shit"); }
    }, [nomeServico]);

    useEffect(() => {
        console.log(precoServico);
        if (precoServico) {
            setPreco(precoServico);
            console.log("Preço do servico: " + precoServico);
        }
        else { console.log("weird shit"); }
    }, [precoServico]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAlteraValor();
        }
    };

    const handleAlteraValor = async () => {
        console.log('Serviço selecionado:', nome);
        console.log('Valor:', preco);

        try {
            let response = await alterarValorServico(nome, preco);
            console.log(response);
            if (response == "OK;servico_alterado;") { setErrMsg("Valor alterado"); }
            else { setErrMsg("Erro ao alterar o serviço"); }
        }
        catch (error) {
            setErrMsg("Erro inesperado na conexão");
            console.log(error);
        }
    };

    const handlePrecoChange = (e) => {
        setPreco(e.target.value);
    };

    //TODO 

    return (
        <React.Fragment>
            <ThemeProvider theme={mainTheme}>
                <Paper elevation={3} sx={{ padding: 2, margin: 1 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h5"> {nomeServico.toLowerCase().charAt(0).toUpperCase() + nomeServico.slice(1).toLowerCase()} </Typography>
                        <Divider sx={{ width: '100%', marginBottom: 2 }} />

                        <TextField margin="normal" fullWidth value={preco} label="Valor do serviço" onKeyPress={handleKeyPress} onChange={handlePrecoChange} startAdornment={<InputAdornment position="start">R$</InputAdornment>} />

                        <Button variant="contained" onClick={handleAlteraValor}>Alterar valor do serviço</Button>
                        <Typography variant="h6" color="secondary" align='center'>{errMsg}</Typography>
                    </Box>
                </Paper>

            </ThemeProvider>
        </React.Fragment>
    );
};

export default ServicoDisplay;
