package com.petcemetery.petcemetery.model;

import java.time.LocalDateTime;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity(name = "Reuniao")
@Table(name = "Reuniao")
public class Reuniao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reuniao")
    private Long idReuniao;

    @ManyToOne
    @JoinColumn(name = "cpf_cliente", referencedColumnName = "cpf")
    private Cliente cliente;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "data")
    private LocalDateTime data;

    @Column(name = "assunto")
    private String assunto;

    public Reuniao(Cliente cliente, LocalDateTime data, String assunto) {
        this.cliente = cliente;
        this.data = data;
        this.assunto = assunto;
    }

    public Long getIdReuniao() {
        return idReuniao;
    }

    public void setIdReuniao(Long idReuniao) {
        this.idReuniao = idReuniao;
    }

    public Cliente getCliente() {
        return this.cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public LocalDateTime getData() {
        return this.data;
    }

    public void setData(LocalDateTime data) {
        this.data = data;
    }

    public String getAssunto() {
        return this.assunto;
    }

    public void setAssunto(String assunto) {
        this.assunto = assunto;
    }

    public void setHora(LocalTime hora) {
    }
}
