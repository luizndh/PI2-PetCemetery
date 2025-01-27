package com.petcemetery.petcemetery.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.petcemetery.petcemetery.model.Pet;
import com.petcemetery.petcemetery.repositorio.PetRepository;

@Service
public class PetService {

    @Autowired
    private PetRepository repository;

    public void save(Pet pet) {
        this.repository.save(pet);
    }

}
