package com.petcemetery.petcemetery.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.petcemetery.petcemetery.model.HorarioFuncionamento;

public interface HorarioFuncionamentoRepository extends MongoRepository<HorarioFuncionamento, Long>{
    HorarioFuncionamento findByDiaSemana(String diaSemana);
}
