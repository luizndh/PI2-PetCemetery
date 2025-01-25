package com.petcemetery.petcemetery.DTO;

import com.petcemetery.petcemetery.model.Servico.ServicoEnum;

import lombok.Data;

@Data
public class ContratoDTO {

    String cpfCliente;
    long idJazigo; // Pode ser nulo!
    double valor;
    ServicoEnum tipoServico;
    String enderecoJazigo; // Pode ser nulo!
    long idPet; // Pode ser nulo!
    String dataServico;

    // CONSTRUTOR - Full args
    public ContratoDTO(double valor, ServicoEnum tipoServico, String enderecoJazigo, long idJazigo, long idPet, String dataServico, String cpfCliente) {
        this.idJazigo = idJazigo;
        this.valor = valor;
        this.tipoServico = tipoServico;
        this.enderecoJazigo = enderecoJazigo;
        this.idPet = idPet;
        this.dataServico = dataServico;
        this.cpfCliente = cpfCliente;
    }

    // CONSTRUTOR - Pet nulo
    public ContratoDTO(double valor, ServicoEnum tipoServico, String enderecoJazigo, long idJazigo, String cpfCliente) {
        this.idJazigo = idJazigo;
        this.valor = valor;
        this.tipoServico = tipoServico;
        this.enderecoJazigo = enderecoJazigo;
        this.cpfCliente = cpfCliente;
    }

    // CONSTRUTOR - Pet e Jazigo nulos
    public ContratoDTO(double valor, ServicoEnum tipoServico, String cpfCliente) {
        this.valor = valor;
        this.tipoServico = tipoServico;
        this.cpfCliente = cpfCliente;
    }
}
