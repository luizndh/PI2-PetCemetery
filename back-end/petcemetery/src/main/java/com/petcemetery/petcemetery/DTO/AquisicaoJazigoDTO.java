package com.petcemetery.petcemetery.DTO;

import lombok.Data;

@Data
public class AquisicaoJazigoDTO {

    String endereço;
    double valor;

    public AquisicaoJazigoDTO(String endereço, double valor) {
        this.endereço = endereço;
        this.valor = valor;
    }
}
