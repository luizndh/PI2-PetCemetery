import { Box, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import React from 'react';

const Titulo = ({ texto, mW }) => {
    if(mW === undefined) mW = 'xs';

    return (
        <React.Fragment>
            <Container maxWidth={mW}>
                <Box sx={{ margin: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h2" align='center'>{texto}</Typography>
                    <Divider orientation="horizontal" flexItem />
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default Titulo;