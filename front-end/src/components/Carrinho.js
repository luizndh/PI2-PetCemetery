import { Button, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
//import { getInformacoesCarrinho, removerItemCarrinho } from './api';

const Carrinho = ({ cpf }) => {
    console.log("1nisoandfunai9sofasdo")
    const [cartItems, setCartItems] = useState([]);
    console.log("1nisoandfunai9sofasdoasdasdsaff")

    const getInfoCarrinho = () => {
        try {
            const data = JSON.parse(localStorage.getItem('carrinho')) || [];

            console.log("CARRINHOOOOOO")
            console.log(data);
            setCartItems(data);
            console.log(cartItems);
        } catch (error) {
            console.log("Erro ao pegar info do carrinho: " + error);
        }
    };

    const salvarItensCarrinho = (items) => {
        localStorage.setItem('carrinho', JSON.stringify(items));
    };

    console.log("1nisoandfunai9sofasdoasdasdsaffdsfgfdsgsfdgf")

    useEffect(() => {
        console.log("useEffect");
        console.log("CPF: " + cpf);
        getInfoCarrinho();
    }, [cpf]);

    console.log("1nisoandfunai9sofasdoasdasdsaff1231231232")

    const removeItem = (idParaRemover) => {
        const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];
        const carrinhoNovo = carrinhoAtual.filter(item => item.id !== idParaRemover);
        salvarItensCarrinho(carrinhoNovo);

        setCartItems(carrinhoNovo);
        console.log("CARRINHOOOOOOOOO")
        console.log(cartItems)
    };

    const clearCart = () => {
        console.log(cartItems);
        for (let i = 0; i < cartItems.length; i++) {
            console.log("CPF: " + cpf);
            console.log("indice: " + i)
            removeItem(i);
        }
    };

    return (
        <React.Fragment>
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4">Seu Carrinho</Typography>
                <Divider orientation="horizontal" flexItem sx={{ margin: 1 }} />
                {cartItems.length === 0 ? (
                    <Typography variant="body1">O carrinho está vazio</Typography>
                ) : (

                    <List>
                        {cartItems.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={item.tipo} secondary={`$${item.valor}`} />
                                {item.tipo === "COMPRA" || item.tipo === "ALUGUEL" ? (
                                    <Button variant="outlined" sx={{ marginLeft: 10 }} color="error" onClick={() => removeItem(index)}>Remover</Button>
                                ) : null}
                            </ListItem>
                        ))}
                    </List>

                )}
                <Button variant="outlined" disabled={cartItems.length === 0} onClick={clearCart}>Limpar Carrinho</Button>
            </Container>
        </React.Fragment>
    );
};

export default Carrinho;
