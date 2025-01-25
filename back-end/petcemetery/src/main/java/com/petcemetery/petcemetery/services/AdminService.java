package com.petcemetery.petcemetery.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.petcemetery.petcemetery.DTO.HistoricoJazigoDTO;
import com.petcemetery.petcemetery.DTO.HorarioFuncionamentoDTO;
import com.petcemetery.petcemetery.model.Admin;
import com.petcemetery.petcemetery.model.Cliente;
import com.petcemetery.petcemetery.model.Jazigo;
import com.petcemetery.petcemetery.model.Pet;
import com.petcemetery.petcemetery.repositorio.ClienteRepository;
import com.petcemetery.petcemetery.repositorio.HorarioFuncionamentoRepository;

@Service
public class AdminService {

    @Autowired
    private JazigoService jazigoService;

    @Autowired
    private HorarioFuncionamentoService horarioFuncionamentoService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private HorarioFuncionamentoRepository horarioFuncionamentoRepository;

    public List<HistoricoJazigoDTO> visualizarHistorico(Long id) {
        Jazigo jazigo = this.jazigoService.findById(id);
        List<HistoricoJazigoDTO> historico = new ArrayList<>();

        if(jazigo != null) {
            for(Pet pet: jazigo.getHistoricoPets()) {
                historico.add(new HistoricoJazigoDTO(id, pet.getNomePet(), pet.getDataNascimento(), pet.getEspecie(), pet.getProprietario().getNome(), pet.getDataEnterro().toLocalDate(), pet.getDataExumacao().toLocalDate()));
            }

        } else {
            throw new IllegalArgumentException("Jazigo não encontrado");
        }

        return historico;
    }

    public boolean alterarHorarioFuncionamento(List<HorarioFuncionamentoDTO> horarios) {
        boolean horarioAlterado = this.horarioFuncionamentoService.alterarHorarioFuncionamento(horarios);

        if(horarioAlterado) {
            this.notificaClientes();
            return true;
        }
        return false;
    }


    // Método que é chamado depois que o admin altera o horário de funcionamento do cemitério, e envia para todos os clientes os novos horários.
    @Async
    private void notificaClientes() {
        List<Cliente> clientes = clienteRepository.findAll();
        String[] emails = new String[clientes.size()];
        for(Cliente cliente : clientes) {
            emails[clientes.indexOf(cliente)] = cliente.getEmail();
        }

        String subject = "Horário de funcionamento do cemitério alterado";
        String body = "Olá! Os horários de funcionamento do cemítério foram alterados para essa semana. Seguem os novos horários:\n" +
                "Segunda: " + horarioFuncionamentoRepository.findByDiaSemana("segunda").getAbertura() + " - " + horarioFuncionamentoRepository.findByDiaSemana("segunda").getFechamento() + "\n" +
                "Terça: " + horarioFuncionamentoRepository.findByDiaSemana("terca").getAbertura() + " - " + horarioFuncionamentoRepository.findByDiaSemana("terca").getFechamento() + "\n" +
                "Quarta: " + horarioFuncionamentoRepository.findByDiaSemana("quarta").getAbertura() + " - " + horarioFuncionamentoRepository.findByDiaSemana("quarta").getFechamento() + "\n" +
                "Quinta: " + horarioFuncionamentoRepository.findByDiaSemana("quinta").getAbertura() + " - " + horarioFuncionamentoRepository.findByDiaSemana("quinta").getFechamento() + "\n" +
                "Sexta: " + horarioFuncionamentoRepository.findByDiaSemana("sexta").getAbertura() + " - " + horarioFuncionamentoRepository.findByDiaSemana("sexta").getFechamento() + "\n" +
                "Sábado: " + horarioFuncionamentoRepository.findByDiaSemana("sabado").getAbertura() + " - " + horarioFuncionamentoRepository.findByDiaSemana("sabado").getFechamento() + "\n" +
                "Domingo: " + horarioFuncionamentoRepository.findByDiaSemana("domingo").getAbertura() + " - " + horarioFuncionamentoRepository.findByDiaSemana("domingo").getFechamento() + "\n" +
                "Feriado: " + horarioFuncionamentoRepository.findByDiaSemana("feriado").getAbertura() + " - " + horarioFuncionamentoRepository.findByDiaSemana("feriado").getFechamento() + "\n" +
                "Atenciosamente, Pet Cemetery.";

        emailService.sendEmail(emails, subject, body);
    }

    public Admin findByEmailAndSenha(String email, String senha) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByEmailAndSenha'");
    }
}
