package com.petcemetery.petcemetery.DTO;

import lombok.Data;

@Data
public class ClienteDTO {

    private String email;
    private String telefone;
    private String nome;
    private String rua;
    private String numero;
    private String complemento;
    private String cep;

    public ClienteDTO(String email, String telefone, String nome, String rua, String numero, String complemento, String cep) {
        this.email = email;
        this.telefone = telefone;
        this.nome = nome;
        this.rua = rua;
        this.numero = numero;
        this.complemento = complemento;
        this.cep = cep;
    }
}
