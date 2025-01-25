package com.petcemetery.petcemetery.DTO;

import java.time.LocalDate;

import lombok.Data;

@Data
public class JazigoDTO {
    String nomePet;
    String cpfCliente;
    private LocalDate dataEnterro;
    private String endereco;
    private Long idJazigo;
    LocalDate dataNascimento;
    String especie;
    String mensagem;
    String plano;

    public JazigoDTO(String nomePet, LocalDate dataEnterro, String endereco, Long idJazigo, LocalDate dataNascimento, String especie, String mensagem, String plano, String cpfCliente) {
        this.nomePet = nomePet;
        this.dataEnterro = dataEnterro;
        this.endereco = endereco;
        this.idJazigo = idJazigo;
        this.dataNascimento = dataNascimento;
        this.especie = especie;
        this.mensagem = mensagem;
        this.plano = plano;
        this.cpfCliente = cpfCliente;
    }

    public JazigoDTO() {}
}
