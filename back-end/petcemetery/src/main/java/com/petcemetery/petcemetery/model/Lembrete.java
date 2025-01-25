package com.petcemetery.petcemetery.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;


@Data
@Table(name = "Lembrete")
@Entity(name = "Lembrete")
public class Lembrete {
    @Id
    @Column(name = "id_lembrete")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idLembrete;

    @Column(name = "data")
    private LocalDate data;

    @ManyToOne
    @JoinColumn(name = "cliente_cpf", referencedColumnName = "cpf")
    private Cliente cliente;

    @Column(name = "enviado")
    private boolean enviado;

    public Lembrete (LocalDate data, Cliente cliente) {
        this.data = data;
        this.cliente = cliente;
    }

    public Lembrete() {}
}
