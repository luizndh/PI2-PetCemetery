package com.petcemetery.petcemetery.DTO;

import lombok.Data;

@Data
public class JazigoPerfilDTO {

    String mensagem;
    String foto; // ?
    String plano;

    public JazigoPerfilDTO(String mensagem, String foto, String plano) {
        this.mensagem = mensagem;
        this.foto = foto;
        this.plano = plano;
    }
}
