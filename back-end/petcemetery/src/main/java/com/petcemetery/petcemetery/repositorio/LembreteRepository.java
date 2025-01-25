package com.petcemetery.petcemetery.repositorio;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petcemetery.petcemetery.model.Lembrete;

public interface LembreteRepository extends JpaRepository<Lembrete, Long>{
    Lembrete findByData(LocalDate data);
    List<Lembrete> findAllByEnviado(boolean enviado);
}
