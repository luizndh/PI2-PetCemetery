import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../logo.svg';
import IconCarrinho from './IconCarrinho';
import './navbar.css';


const NavBar = ({ page, isLoggedIn, isAdmin }) => {
    var color1, color2, color3, color4;
    const navigate = useNavigate();

    switch (page) {
        case 1:
            color1 = "primary";
            color2 = "inherit";
            color3 = "inherit";
            color4 = "inherit";
            break;
        case 2:
            color1 = "inherit";
            color2 = "primary";
            color3 = "inherit";
            color4 = "inherit";
            break;
        case 3:
            color1 = "inherit";
            color2 = "inherit";
            color3 = "primary";
            color4 = "inherit";
            break;
        case 4:
            color1 = "inherit";
            color2 = "inherit";
            color3 = "inherit";
            color4 = "primary";
            break;
        default:
            color1 = "inherit";
            color2 = "inherit";
            color3 = "inherit";
            color4 = "inherit";
            break;
    }

    const [numItensCarrinho, setNumItensCarrinho] = useState("");

    const getInfoCarrinho = () => {
        try {
            const data = JSON.parse(localStorage.getItem('carrinho')) || [];
            if (data.length === 0) setNumItensCarrinho("");
            else setNumItensCarrinho(data.length);
        } catch (error) {
            console.log("Erro ao pegar info do carrinho: " + error);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            console.log("useEffect");
            getInfoCarrinho();
        }
        else {
            setNumItensCarrinho("");
        }
    }, [isLoggedIn]);

    const handleLogout = () => {
        localStorage.removeItem('carrinho');
        sessionStorage.removeItem('cpf');
        navigate('/');
    }

    useEffect(() => {
        const clearCartOnClose = () => {
            handleLogout();
        };

        window.addEventListener("beforeunload", clearCartOnClose);

        return () => {
            window.removeEventListener("beforeunload", clearCartOnClose);
        };
    }, []);

    return (
        <React.Fragment>
            <AppBar position='static' sx={{ top: 0, left: 0, right: 0, position: 'fixed', width: '100%' }}>
                <Toolbar sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >

                    <Box style={{ paddingTop: 10, paddingLeft: 15, top: 0, left: 0, position: 'fixed' }}>
                        <Logo />
                    </Box>

                    <Stack direction='row' spacing={2}>
                        <Button color={color1} component="a" variant="contained" onClick={() => { isAdmin ? navigate(`/HomeAdmin`) : (isLoggedIn ? navigate(`/Home`) : navigate(`/`))}}>Home</Button>
                        <Button color={color2} component="a" variant="contained" onClick={() => { navigate(`/QuemSomos`) }}>Quem Somos</Button>
                        <Button color={color3} component="a" variant="contained" onClick={() => { navigate(`/ContratacaoPlanos`) }}>Planos</Button>
                        <Button color={color4} component="a" variant="contained" onClick={() => { navigate(`/Contato`) }}>Contato</Button>
                    </Stack>

                    <Box sx={{ position: "fixed", top: 0, right: 0, zIndex: 2000, padding: 2 }}>
                        {(!isLoggedIn && !isAdmin) &&
                            <Stack spacing={2} direction='row'>
                                <Button variant="contained" onClick={() => { navigate(`/Login`) }}>Login</Button>
                                <Button variant="contained" color="secondary" onClick={() => { navigate(`/Cadastro`) }}>Cadastro</Button>
                            </Stack>
                        }
                        {(isLoggedIn) &&

                            <Stack spacing={1} direction="row" alignItems="center">
                                <Button variant="contained" component="a" color="primary" onClick={() => { navigate(`/ExibirPerfil`) }}> Meu Perfil </Button>
                                <Button variant="contained" component="a" color="error" onClick={() => handleLogout()}> Logout </Button>
                                <Button variant="contained" component="a" color="secondary" onClick={() => { navigate(`/ConfirmarCompra`) }}> <IconCarrinho onClick={() => { navigate(`/ConfirmarCompra`) }} /> <Typography sx={{ spacingLeft: 2 }} variant="subtitle">{numItensCarrinho}</Typography> </Button>
                            </Stack>
                        }
                        {(isAdmin) &&
                            <Stack spacing={1} direction="row" alignItems="center">
                                <Button variant="contained" color="error" href={'/'}> Logout </Button>
                            </Stack>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

export default NavBar;