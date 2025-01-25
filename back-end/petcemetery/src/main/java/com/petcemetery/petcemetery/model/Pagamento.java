package com.petcemetery.petcemetery.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity(name = "Pagamento")
@Table(name = "Pagamento")
public class Pagamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Adicionado para permitir auto incremento do id
    @Column(name = "id_pagamento")
    private Long idPagamento;

    @ManyToOne
    @JoinColumn(name = "cliente_cpf", referencedColumnName = "cpf")
    private Cliente cliente;

    @Column(name = "valor")
    private double valor;

    @Column(name = "data_pagamento")
    private LocalDate dataPagamento;

    @Column(name = "data_vencimento")
    private LocalDate dataVencimento;

    @Column(name = "isPago")
    private boolean pago;

    @OneToOne
    @JoinColumn(name = "id_contrato")
    private Contrato contrato;


    @Column(name = "metodo_pagamento")
    @Enumerated(EnumType.STRING)
    private MetodoEnum metodoPagamento;

    public enum MetodoEnum{
        CREDITO,
        DEBITO,
        PAYPAL
    }

    public Pagamento() {}

    public Pagamento(Cliente cliente, double valor, LocalDate dataPagamento, LocalDate dataVencimento, boolean pago, Contrato contrato, MetodoEnum metodoPagamento) {
        this.cliente = cliente;
        this.valor = valor;
        this.dataPagamento = dataPagamento;
        this.dataVencimento = dataVencimento;
        this.pago = pago;
        this.contrato = contrato;
        this.metodoPagamento = metodoPagamento;
    }
    public Cliente getCliente() {
         return cliente;
    }
    public void setCliente(Cliente cliente) {
         this.cliente = cliente;
    }
    public double getValor() {
        return valor;
    }
    public void setValor(float valor) {
        this.valor = valor;
    }
    public LocalDate getDataPagamento() {
        return dataPagamento;
    }
    public void setDataPagamento(LocalDate dataPagamento) {
        this.dataPagamento = dataPagamento;
    }
    public LocalDate getDataVencimento() {
        return dataVencimento;
    }
    public void setDataVencimento(LocalDate dataVencimento) {
        this.dataVencimento = dataVencimento;
    }
    public boolean isPago() {
        return pago;
    }
    public void setPago(boolean pago) {
        this.pago = pago;
    }
    public Contrato getContrato() {
        return contrato;
    }
    public void setContrato(Contrato contratos) {
        this.contrato = contratos;
    }
    public MetodoEnum getMetodoPagamento() {
        return metodoPagamento;
    }
    public void setMetodoPagamento(MetodoEnum metodoPagamento) {
        this.metodoPagamento = metodoPagamento;
    }
    public Long getIdPagamento() {
        return idPagamento;
    }
    public void setIdPagamento(Long idPagamento) {
        this.idPagamento = idPagamento;
    }
}
