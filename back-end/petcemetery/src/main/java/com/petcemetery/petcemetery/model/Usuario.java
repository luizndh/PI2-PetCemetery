package com.petcemetery.petcemetery.model;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@MappedSuperclass
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id")
    private Long id;

    @Column(name = "cpf")
    private String cpf;

    @Column(name = "email")
    private String email;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "nome")
    private String nome;

    @Column(name = "cep")
    private String cep;

    @Column(name = "rua")
    private String rua;

    @Column(name = "numero")
    private String numero;

    @Column(name = "complemento")
    private String complemento;

    @Column(name = "senha")
    private String senha;

    public Usuario(String email, String telefone, String nome, String cpf, String senha) {
        this.email = email;
        this.telefone = telefone;
        this.nome = nome;
        this.cpf = cpf;
        this.senha = senha;
    }

    public Usuario(String cpf, String email, String telefone, String nome, String cep, String rua, String numero, String complemento, String senha) {
        this.cpf = cpf;
        this.email = email;
        this.telefone = telefone;
        this.nome = nome;
        this.cep = cep;
        this.rua = rua;
        this.numero = numero;
        this.complemento = complemento;
        this.senha = senha;
    }
}
