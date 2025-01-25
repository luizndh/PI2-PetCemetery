import React, { useEffect, useState } from 'react';
import { Modal, Typography, Button, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const mainTheme = createTheme({ palette: { mode: 'dark', }, });

const ModalPadrao = ({ title, open, onClose, bt1Text, bt1Href, bt2Text, bt2Href, colorBorda }) => {
    const [corBorda, setCorBorda] = useState("mainTheme.palette.secondary.main");

    useEffect(() => { if (colorBorda) setCorBorda(colorBorda); }, []);

    return (
        <React.Fragment>
            <ThemeProvider theme={mainTheme}>
                <Modal open={open} onClose={onClose}>
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'black', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', border: '4px solid', borderColor: { corBorda }, borderRadius: '4px' }}>
                        <Typography variant="h5">{title}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                            <Button onClick={bt1Href} variant="outlined" color="secondary" sx={{ margin: 2 }}>{bt1Text}</Button>
                            <Button onClick={bt2Href} variant="outlined" color="primary" sx={{ margin: 2 }}>{bt2Text}</Button>
                        </Box>
                    </Box>
                </Modal>
            </ThemeProvider>
        </React.Fragment>
    );
};

export default ModalPadrao;
