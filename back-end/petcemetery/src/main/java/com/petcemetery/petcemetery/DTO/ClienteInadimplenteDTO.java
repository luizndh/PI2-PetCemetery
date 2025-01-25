package com.petcemetery.petcemetery.DTO;

import lombok.Data;

@Data
public class ClienteInadimplenteDTO {

    private String email;
    private String telefone;
    private String nome;
    private Boolean desativado;
    private Boolean inadimplente;

    public ClienteInadimplenteDTO(String email, String telefone, String nome, Boolean desativado, Boolean inadimplente) {
        this.email = email;
        this.telefone = telefone;
        this.nome = nome;
        this.desativado = desativado;
        this.inadimplente = inadimplente;
    }
}
