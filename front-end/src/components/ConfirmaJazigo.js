import { Button, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { createTheme } from '@mui/material/styles';
import React from 'react';
const mainTheme = createTheme({ palette: { mode: 'dark', }, });

function ConfirmaJazigo() {
  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <Box sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <Box>
            <Typography variant="h2">Jazigo {index}</Typography>
            <Divider orientation="horizontal" flexItem />
          </Box>

          <Stack spacing={2} direction='row'>
            <Button variant="contained" color="primary">Comprar</Button>
            <Button variant="contained" color="secondary">Alugar</Button>
          </Stack>

        </Box>
      </Container>
    </React.Fragment>
  );
}

export default ConfirmaJazigo;