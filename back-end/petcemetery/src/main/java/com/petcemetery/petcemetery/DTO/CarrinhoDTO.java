package com.petcemetery.petcemetery.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarrinhoDTO {
    Long id;
    Long jazigoId;
    String selectedOrnament;
    String tipo;
    double valor;
}
