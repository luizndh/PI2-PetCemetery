package com.petcemetery.petcemetery.services;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.petcemetery.petcemetery.model.Servico;
import com.petcemetery.petcemetery.model.Servico.ServicoEnum;
import com.petcemetery.petcemetery.repositorio.ServicoRepository;

@Service
public class ServicoService {

    @Autowired
    private ServicoRepository repository;

    public List<Servico> exibirServicos() {
        return repository.findAll();
    }

    public boolean alterarServicos(String nomeServico, double valor) {
        ServicoEnum servicoEnum = ServicoEnum.valueOf(nomeServico);
        Servico servicoEntity = repository.findByTipoServico(servicoEnum);

        servicoEntity.setValor(valor);
        repository.save(servicoEntity);

        return true;
    }

    public Servico findByTipoServico(ServicoEnum compra) {
        return this.repository.findByTipoServico(compra);
    }

    public List<Servico> listarPlanos() {
        Servico basic = repository.findByTipoServico(ServicoEnum.BASIC);
        Servico silver = repository.findByTipoServico(ServicoEnum.SILVER);
        Servico gold = repository.findByTipoServico(ServicoEnum.GOLD);

        return Arrays.asList(basic, silver, gold);
    }


}
