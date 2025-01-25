package com.petcemetery.petcemetery.services;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.petcemetery.petcemetery.DTO.HorarioFuncionamentoDTO;
import com.petcemetery.petcemetery.model.HorarioFuncionamento;
import com.petcemetery.petcemetery.repositorio.HorarioFuncionamentoRepository;

@Service
public class HorarioFuncionamentoService {

    @Autowired
    private HorarioFuncionamentoRepository repository;

    public boolean alterarHorarioFuncionamento(List<HorarioFuncionamentoDTO> horarios) {
        try {
            for(HorarioFuncionamentoDTO horarioDTO : horarios) {
                HorarioFuncionamento horario = convertToModel(horarioDTO);
                repository.save(horario);
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private HorarioFuncionamento convertToModel(HorarioFuncionamentoDTO horarioDTO) {
        HorarioFuncionamento horario = new HorarioFuncionamento();
        horario.setDiaSemana(horarioDTO.getDiaSemana());
        horario.setAbertura(LocalTime.parse(horarioDTO.getAbertura()));
        horario.setFechamento(LocalTime.parse(horarioDTO.getFechamento()));
        return horario;
    }

    public List<HorarioFuncionamentoDTO> getHorarios() {
        List<HorarioFuncionamento> horarios = repository.findAll();
        List<HorarioFuncionamentoDTO> horariosDTO = new ArrayList<>();

        for(HorarioFuncionamento horario : horarios) {
            HorarioFuncionamentoDTO horarioDTO = new HorarioFuncionamentoDTO(horario.getDiaSemana(), horario.getAbertura(), horario.getFechamento(), horario.isFechado());
            horariosDTO.add(horarioDTO);
        }

        return horariosDTO;
    }
}
