package com.petcemetery.petcemetery.repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petcemetery.petcemetery.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, String> {
    Cliente findByEmailAndSenha(String email, String senha);
    Cliente findByEmail(String email);
    Cliente findByCpf(String cpf);
    List<Cliente> findByInadimplenteTrue();
}