package com.petcemetery.petcemetery.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity(name = "Servicos")
@Table(name = "Servicos")
@NoArgsConstructor
public class Servico {

    @Id
    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_servico")
    private ServicoEnum tipoServico;

    @Column(name = "valor")
    private double valor;

    public enum ServicoEnum {
        COMPRA,
        ALUGUEL,
        PERSONALIZACAO,
        MANUTENCAO,
        EXUMACAO,
        ENTERRO,
        BASIC,
        SILVER,
        GOLD;
    }

    public Servico(ServicoEnum tipoServico, double valor) {
        this.tipoServico = tipoServico;
        this.valor = valor;
    }
}
