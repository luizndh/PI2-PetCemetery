package com.petcemetery.petcemetery.DTO;

import java.time.LocalTime;

import lombok.Data;

@Data
public class HorarioFuncionamentoDTO {
    private String diaSemana;
    private String abertura;
    private String fechamento;
    private boolean fechado;

    public HorarioFuncionamentoDTO(String diaSemana, LocalTime abertura, LocalTime fechamento, boolean fechado) {
        this.diaSemana = diaSemana;
        this.abertura = abertura.toString();
        this.fechamento = fechamento.toString();
        this.fechado = fechado;
    }
}
