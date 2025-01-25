package com.petcemetery.petcemetery.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.petcemetery.petcemetery.model.Pet;

public interface PetRepository extends JpaRepository<Pet, Long> {
}
