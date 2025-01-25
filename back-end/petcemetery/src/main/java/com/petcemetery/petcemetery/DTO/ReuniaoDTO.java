package com.petcemetery.petcemetery.DTO;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ReuniaoDTO {
    private String cpfCliente;
    private String data;
    private String assunto;

    public ReuniaoDTO(String cpfCliente, LocalDateTime data, String assunto) {
        this.cpfCliente = cpfCliente;
        this.data = data.toString();
        this.assunto = assunto;
    }
}
