package com.petcemetery.petcemetery.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.petcemetery.petcemetery.model.Jazigo;

public interface JazigoRepository extends JpaRepository<Jazigo, Long> {
    Jazigo findByIdJazigo(Long id_jazigo);
    List<Jazigo> findByProprietarioCpf(String cpf_proprietario);

    @Query("SELECT j FROM Jazigo j ORDER BY j.id ASC")
    List<Jazigo> findAllOrderByIdAsc();
}