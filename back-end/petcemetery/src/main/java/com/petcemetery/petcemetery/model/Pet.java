package com.petcemetery.petcemetery.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Data
@Entity(name = "Pet")
@Table(name = "Pet")
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pet")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "proprietario_cpf", referencedColumnName = "cpf")
    private Cliente proprietario;

    @Column(name = "nome_pet")
    private String nomePet;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "data_enterro")
    private LocalDateTime dataEnterro;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "data_exumacao")
    private LocalDateTime dataExumacao;

    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;

    @Column(name = "especie")
    private String especie;

    public Pet() {
        // Construtor padrão sem argumentos
    }
    public Pet(String nomePet, String especie, Cliente proprietario) {
        this.nomePet = nomePet;
        this.especie = especie;
        this.proprietario = proprietario;
    }
    public Pet(String nomePet, LocalDate dataNascimento, String especie, Cliente proprietario) {
        this.nomePet = nomePet;
        this.dataNascimento = dataNascimento;
        this.especie = especie;
        this.proprietario = proprietario;
    }
    public Pet(LocalDateTime data, Cliente proprietario) {
        this.dataEnterro = data;
        this.proprietario = proprietario;
    }
    public Pet(String nomePet, LocalDateTime dataEnterro, LocalDate dataNascimento, String especie, Cliente proprietario) {
        this.nomePet = nomePet;
        this.dataEnterro = dataEnterro;
        this.dataNascimento = dataNascimento;
        this.especie = especie;
        this.proprietario = proprietario;
    }
    public Pet(String nomePet, LocalDateTime dataEnterro, LocalDate dataNascimento, String especie, Cliente proprietario, LocalDateTime dataExumacao) {
        this.nomePet = nomePet;
        this.dataEnterro = dataEnterro;
        this.dataNascimento = dataNascimento;
        this.especie = especie;
        this.proprietario = proprietario;
        this.dataExumacao = dataExumacao;
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNomePet() {
        return nomePet;
    }
    public void setNomePet(String nomePet) {
        this.nomePet = nomePet;
    }
    public LocalDateTime getDataEnterro() {
        return dataEnterro;
    }
    public void setDataEnterro(LocalDateTime dataEnterro) {
        this.dataEnterro = dataEnterro;
    }
    public LocalDate getDataNascimento() {
        return dataNascimento;
    }
    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }
    public String getEspecie() {
        return especie;
    }
    public void setEspecie(String especie) {
        this.especie = especie;
    }
    public Cliente getProprietario() {
        return proprietario;
    }
    public void setProprietario(Cliente proprietario) {
        this.proprietario = proprietario;
    }


}
