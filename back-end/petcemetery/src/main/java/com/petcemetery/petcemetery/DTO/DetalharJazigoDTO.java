package com.petcemetery.petcemetery.DTO;


import com.petcemetery.petcemetery.model.Jazigo;
import com.petcemetery.petcemetery.model.Pet;

import lombok.Data;

@Data
public class DetalharJazigoDTO{
    String nomePet;
    String dataNascimento;
    String especiePet;
    String nomeProrietario;
    String endereçoJazigo;
    String dataEnterro;
    String ornamentacao;
    String mensagemLapide;
    String urlImagem;


    public DetalharJazigoDTO(Pet pet, Jazigo jazigo){
        if ( pet == null){
            this.nomePet = null;
            this.dataEnterro = null;
            this.dataNascimento = null;
            this.especiePet = null;
        }
        else{
            this.nomePet = pet.getNomePet();
            this.dataNascimento = pet.getDataNascimento().toString();
            this.dataNascimento = pet.getDataNascimento().toString();
            this.especiePet = pet.getEspecie();
        }

        if (jazigo.getPlano() == null){
            this.ornamentacao = null;
        }
        else{
            this.ornamentacao = jazigo.getPlano().toString();
        }

        this.nomeProrietario = jazigo.getProprietario().getNome();
        this.endereçoJazigo = jazigo.getEndereco();
        this.mensagemLapide = jazigo.getMensagem();
        this.urlImagem = jazigo.getFoto();
    }

}