import { Box, Grid, IconButton, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getGravesOccupationStatus } from '../components/api';
import jazul from '../jazul.png';
import jverde from '../jverde.png';
import jvermelho from '../jvermelho.png';

const Mapa = ({ onJazigoSelect, isModalOpen, readOnly }) => {
    const [selectedButton, setSelectedButton] = useState(0);
    const [mapArray, setMapArray] = useState([]);
    const [disableButtons, setDisableButtons] = useState(false);

    const letras = ['A', 'B', 'C', 'D', 'E', 'F'];
    const numeros = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

    useEffect(() => {
        if(readOnly) setDisableButtons(true);
        const fetchData = async () => {
            try {
                var data = await getGravesOccupationStatus();
                if (data != null) data = data.split(';').map((value) => value === 'true');
                else { console.log("Resposta do back = null. Erro na conexão com o servidor. Verifique sua rede"); return; }

                setMapArray(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    console.log("\nmapArray=" + mapArray + "\n");

    const clickedGrave = (index) => {
        if (mapArray[index]) {
            const selectedID = index + 1;
            onJazigoSelect(selectedID);
            setSelectedButton(selectedID);
        }
    };

    const gridItems = mapArray.map((value, index) => {
        const graveID = index + 1;

        return (
            <Grid item key={graveID} xs={3} sm={2} md={1} lg={1} xl={1}>
                <IconButton id={graveID} disabled={disableButtons} onClick={() => clickedGrave(index)}>
                    <img src={selectedButton === graveID && isModalOpen ? jazul : value ? jverde : jvermelho} alt="icone" />
                </IconButton>
            </Grid>
        );
    });

    return (
        <React.Fragment>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={5} />
                    <Grid item xs={12} sm={2}>
                        <Paper elevation={3}>
                            <Typography variant="h4" align='center'>Entrada</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={5} />
                </Grid>

                <Grid container spacing={2}>
                    {numeros.map((item, index) => (
                        <Grid item xs={1} key={index}><Typography variant="body1">{item}</Typography></Grid>
                    ))}
                </Grid>

                <Box sx={{ display: 'flex' }}>
                    <Grid container sx={{ width: '1%', justifyContent: 'center', alignItems: 'center' }}>
                        {letras.map((item, index) => (
                            <Grid item xs={12} key={index}>
                                <Typography variant="body1">{item}</Typography>
                            </Grid>
                        ))}
                    </Grid>
                    <Box>
                        <Grid container rowSpacing={2} columnSpacing={2}>
                            {gridItems}
                        </Grid>
                    </Box>
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={5} />
                    <Grid item xs={12} sm={2}>
                        <Paper elevation={3}>
                            <Typography variant="h4" align='center'>Saída</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={5} />
                </Grid>

            </Box>
        </React.Fragment>
    );
};

export default Mapa;