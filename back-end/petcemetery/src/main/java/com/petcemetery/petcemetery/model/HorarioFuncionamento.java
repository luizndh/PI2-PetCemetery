package com.petcemetery.petcemetery.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "horario_funcionamento")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HorarioFuncionamento {

    @Id
    private Long id;
    private String diaSemana;
    private String abertura;
    private String fechamento;
    private boolean fechado;
}
