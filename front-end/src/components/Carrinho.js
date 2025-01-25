import { Button, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
//import { getInformacoesCarrinho, removerItemCarrinho } from './api';

const Carrinho = ({ cpf }) => {
    const [cartItems, setCartItems] = useState([]);

    const getInfoCarrinho = () => {
        try {
            /*
            console.log("getInfoCarrinho");
            const data = await getInformacoesCarrinho(cpf);
            */

            const data = JSON.parse(localStorage.getItem('carrinho')) || [];

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

    useEffect(() => {
        console.log("useEffect");
        getInfoCarrinho();
    }, [cpf]);

    const removeItem = (idParaRemover) => {
        /*if (cartItems[index].tipoServico !== "COMPRA" && cartItems[index].tipoServico !== "ALUGUEL") return;
        var resp = await removerItemCarrinho(cpf, cartItems[index].idJazigo);

        if (resp != null) resp = resp.split(';');
        else { console.log("Resposta do back = null"); return; }

        if (resp[0] === "OK") {
            console.log("Servico removido com sucesso: " + index);
            getInfoCarrinho();
        }
        else {
            console.log("Erro: servico nao encontrado");
        }*/
       
        const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];
        const carrinhoNovo = carrinhoAtual.filter(item => item.id !== idParaRemover);
        salvarItensCarrinho(carrinhoNovo);

        setCartItems(carrinhoNovo);
    };

    const clearCart = () => {
        for (let i = 0; i < cartItems.length; i++) {
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
