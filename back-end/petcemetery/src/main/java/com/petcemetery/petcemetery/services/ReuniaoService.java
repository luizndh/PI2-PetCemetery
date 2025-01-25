package com.petcemetery.petcemetery.services;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.petcemetery.petcemetery.DTO.ReuniaoDTO;
import com.petcemetery.petcemetery.model.Cliente;
import com.petcemetery.petcemetery.model.Reuniao;
import com.petcemetery.petcemetery.repositorio.ReuniaoRepository;

@Service
public class ReuniaoService {

    @Autowired
    private ReuniaoRepository repository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ClienteService clienteService;

    public List<ReuniaoDTO> visualizarReunioes() {
        List<Reuniao> reunioes = repository.findAllOrderByDataAsc();
        List<ReuniaoDTO> reunioesDTO = new ArrayList<>();

        for (Reuniao reuniao : reunioes) {
            ReuniaoDTO reuniaoDTO = new ReuniaoDTO(
                reuniao.getCliente().getCpf(),
                reuniao.getData(),
                reuniao.getAssunto()
            );

            reunioesDTO.add(reuniaoDTO);
        }

        return reunioesDTO;
    }

    public boolean agendarReuniao(String cpf, Reuniao reuniao) {
        // Verificando se a reunião está sendo agendada com uma antecedência de dois dias
        if(reuniao.getData().toLocalDate().isBefore(LocalDate.now().minusDays(2))) {
            return false;
        }

        Cliente cliente = clienteService.findByCpf(cpf);
        reuniao.setCliente(cliente);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        repository.save(reuniao);

        String[] to = {cliente.getEmail()};
        emailService.sendEmail(to, "Agendamento de reunião", "Sua reunião foi agendada com sucesso para o dia " + reuniao.getData().toLocalDate().format(formatter) + ", no horário " + reuniao.getData().toLocalTime() + "!");
        return true;
    }

}
