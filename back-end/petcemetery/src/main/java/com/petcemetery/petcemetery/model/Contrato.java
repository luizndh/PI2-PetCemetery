package com.petcemetery.petcemetery.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@Entity(name = "Contrato")
@Table(name = "Contrato")
@AllArgsConstructor
public class Contrato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Adicionado para permitir auto incremento do id
    @Column(name = "id_contrato")
    private Long idContrato;

    @ManyToOne
    @JoinColumn(name = "jazigo_id_jazigo")
    private Jazigo jazigo;

    @Column(name = "valor")
    private double valor;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "data_servico")
    private LocalDateTime dataServico;

    @OneToOne
    @JoinColumn(name = "id_pet")
    private Pet pet;

    @ManyToOne
    @JoinColumn(name = "cliente_cpf")
    private Cliente cliente;

    @Column(name = "primeiro_pagamento")
    private LocalDate primeiroPagamento;

    @Column(name = "ultimo_pagamento")
    private LocalDate ultimoPagamento;

    @OneToOne
    @JoinColumn(name = "tipo_servico")
    private Servico servico;

    public Contrato(){}

    // All args constructor
    public Contrato(double valor, Cliente cliente, Jazigo jazigo, Pet pet, LocalDateTime dataServico, LocalDate primeiroPagamento, LocalDate ultimoPagamento, Servico servico) {
        this.valor = valor;
        this.cliente = cliente;
        this.jazigo = jazigo;
        this.pet = pet;
        this.dataServico = dataServico;
        this.primeiroPagamento = primeiroPagamento;
        this.ultimoPagamento = ultimoPagamento;
        this.servico = servico;
    }

    public Contrato(double valor, Cliente cliente, Jazigo jazigo, Pet pet, LocalDateTime dataServico, Servico servico) {
        this.valor = valor;
        this.cliente = cliente;
        this.jazigo = jazigo;
        this.pet = pet;
        this.dataServico = dataServico;
        this.servico = servico;
    }
}
