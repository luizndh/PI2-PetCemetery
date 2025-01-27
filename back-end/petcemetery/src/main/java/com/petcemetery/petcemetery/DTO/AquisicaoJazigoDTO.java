package com.petcemetery.petcemetery.DTO;

import lombok.Data;

@Data
public class AquisicaoJazigoDTO {

    String endereco;
    double valor;

    public AquisicaoJazigoDTO(String endereco, double valor) {
        this.endereco = endereco;
        this.valor = valor;
    }
}
