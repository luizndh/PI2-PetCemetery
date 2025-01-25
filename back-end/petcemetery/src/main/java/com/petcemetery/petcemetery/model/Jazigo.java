
package com.petcemetery.petcemetery.model;

import java.util.ArrayList;
import java.util.List;

import com.petcemetery.petcemetery.model.Servico.ServicoEnum;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity(name = "Jazigo")
@Table(name = "Jazigo")
public class Jazigo {

    @Column(name = "endereco")
    private String endereco;

    @ManyToOne
    @JoinColumn(name = "cpf_proprietario", referencedColumnName = "cpf")
    private Cliente proprietario;

    @OneToMany(fetch=FetchType.EAGER)
    @Column(name = "historico_pets")
    private List<Pet> historicoPets;

    @Id
    @Column(name = "id_jazigo")
    private long idJazigo;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private StatusEnum status;

    @Column(name = "mensagem")
    private String mensagem;

    @Column(name = "foto")
    private String foto;

    @Column(name = "notas")
    private String notas;

    @Column(name = "plano")
    @Enumerated(EnumType.STRING)
    private ServicoEnum plano;

    @OneToOne
    @JoinColumn(name = "pet_enterrado_id", referencedColumnName = "id_pet")
    private Pet petEnterrado;

    public enum StatusEnum {
        DISPONIVEL,
        OCUPADO
    }

    public Jazigo() {
    }

    public Jazigo(String endereco, Cliente proprietario, int idJazigo, StatusEnum status, ServicoEnum plano) {
        this.endereco = endereco;
        this.proprietario = proprietario;
        this.idJazigo = idJazigo;
        this.status = status;
        this.plano = plano;
        this.historicoPets = new ArrayList<>();
    }

    public Jazigo(String endereco, Cliente proprietario, int idJazigo, StatusEnum status,
                String mensagem, String foto, String notas, ServicoEnum plano, Pet petEnterrado) {
        this.endereco = endereco;
        this.proprietario = proprietario;
        this.idJazigo = idJazigo;
        this.status = status;

        this.mensagem = mensagem;
        this.foto = foto;
        this.notas = notas;
        this.plano = plano;
        this.petEnterrado = petEnterrado;
        this.historicoPets = new ArrayList<>();
    }

    public String getEndereco() {
        return endereco;
    }
    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }
    public Cliente getProprietario() {
        return proprietario;
    }
    public void setProprietario(Cliente proprietario) {
        this.proprietario = proprietario;
    }
    public long getIdJazigo() {
        return idJazigo;
    }
    public void setIdJazigo(long idJazigo) {
        this.idJazigo = idJazigo;
    }
    public StatusEnum getStatus() {
        return status;
    }
    public void setStatus(StatusEnum status) {
        this.status = status;
    }
    public String getMensagem() {
        return mensagem;
    }
    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }
    public String getFoto() {
        return foto;
    }
    public void setFoto(String foto) {
        this.foto = foto;
    }
    public String getNotas() {
        return notas;
    }
    public void setNotas(String notas) {
        this.notas = notas;
    }
    public Pet getPetEnterrado() {
        return petEnterrado;
    }
    public void setPetEnterrado(Pet petEnterrado) {
        this.petEnterrado = petEnterrado;
    }
    public ServicoEnum getPlano() {
        return plano;
    }
    public void setPlano(ServicoEnum plano) {
        this.plano = plano;
    }

    public List<Pet> getHistoricoPets() {
        return historicoPets;
    }
    public void setHistoricoPets(List<Pet> historicoPets) {
        this.historicoPets = historicoPets;
    }
    public void addPetHistorico(Pet pet) {
        this.historicoPets.add(pet);
    }
    public void removePetHistorico(Pet pet) {
        this.historicoPets.remove(pet);
    }
}