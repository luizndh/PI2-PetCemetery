package com.petcemetery.petcemetery.DTO;

import java.time.LocalDate;

import lombok.Data;

@Data
public class HistoricoJazigoDTO {

    private long id_jazigo;
    private String nomePet;
    private String dataNascimentoPet;
    private String especiePet;
    private String nomeProprietario;
    private String dataEnterro;
    private String dataExumacao;

    public HistoricoJazigoDTO(Long id_jazigo, String nomePet, LocalDate dataNascimentoPet, String especiePet, String nomeProprietario, LocalDate dataEnterro, LocalDate dataExumacao) {
        this.id_jazigo = id_jazigo;
        this.nomePet = nomePet;
        this.dataNascimentoPet = dataNascimentoPet.toString();
        this.especiePet = especiePet;
        this.nomeProprietario = nomeProprietario;
        this.dataEnterro = dataEnterro.toString();
        
        if(dataExumacao != null)
            this.dataExumacao = dataExumacao.toString();
        else
            this.dataExumacao = "";
    }
    
}
