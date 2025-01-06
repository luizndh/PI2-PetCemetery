package com.petcemetery.petcemetery.model;

import java.time.LocalTime;

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
    private LocalTime abertura;
    private LocalTime fechamento;
    private boolean fechado;
}
