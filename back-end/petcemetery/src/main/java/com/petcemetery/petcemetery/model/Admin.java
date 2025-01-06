package com.petcemetery.petcemetery.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;

@Entity(name = "Administrador")
@Table(name = "Administrador")
@NoArgsConstructor
public class Admin extends Usuario{

    public Admin(String email, String telefone, String nome, String cpf, String senha) {
        super(email, telefone, nome, cpf, senha);
    }

    public Admin(String email, String telefone, String nome, String cpf, String cep,  String rua, String numero,
        String complemento, String senha) {

        super(email, telefone, nome, cpf, cep, rua, numero, complemento, senha);
    }
}
