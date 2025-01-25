package com.petcemetery.petcemetery.exceptions;

import lombok.Data;

@Data
public class ApiErrorMessage {

    private int codigo;
    private String mensagem;

    public ApiErrorMessage(int codigo, String mensagem) {
        this.codigo = codigo;
        this.mensagem = mensagem;
    }

    public int getCodigo() {
        return this.codigo;
    }
    public String getMensagem() {
        return this.mensagem;
    }
}
