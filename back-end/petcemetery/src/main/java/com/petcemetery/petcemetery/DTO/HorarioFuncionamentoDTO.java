package com.petcemetery.petcemetery.DTO;

import lombok.Data;

@Data
public class HorarioFuncionamentoDTO {
    private String diaSemana;
    private String abertura;
    private String fechamento;
    private boolean fechado;

    public HorarioFuncionamentoDTO(String diaSemana, String abertura, String fechamento, boolean fechado) {
        this.diaSemana = diaSemana;
        this.abertura = abertura;
        this.fechamento = fechamento;
        this.fechado = fechado;
    }
}
