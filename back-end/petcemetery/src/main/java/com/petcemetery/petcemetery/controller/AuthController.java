package com.petcemetery.petcemetery.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.petcemetery.petcemetery.DTO.HorarioFuncionamentoDTO;
import com.petcemetery.petcemetery.model.Cliente;
import com.petcemetery.petcemetery.model.HorarioFuncionamento;
import com.petcemetery.petcemetery.repository.ClienteRepository;
import com.petcemetery.petcemetery.repository.HorarioFuncionamentoRepository;
import com.petcemetery.petcemetery.utils.EmailValidator;

import io.micrometer.common.util.StringUtils;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private HorarioFuncionamentoRepository horarioFuncionamentoRepository;

    @PostMapping(path = "/cadastro", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> cadastro(@RequestBody Map<String, Object> requestBody) {

        String email = (String) requestBody.get("email");
        String senha = (String) requestBody.get("senha");
        String senha_repetida = (String) requestBody.get("senharepeat");
        String cpf = (String) requestBody.get("cpf");
        String cep = (String) requestBody.get("cep");
        String rua = (String) requestBody.get("rua");
        String numero = (String) requestBody.get("numero");
        String complemento = "";
        if (!StringUtils.isBlank((String) requestBody.get("complemento"))) {
            complemento = (String) requestBody.get("complemento");
        } //complemento eh opcional
        String nome = (String) requestBody.get("nome");
        String telefone = (String) requestBody.get("telefone");

        // Checa se algum dos campos não foi preenchido e exibe uma mensagem de erro
        if (StringUtils.isBlank(nome) || StringUtils.isBlank(email) || StringUtils.isBlank(senha)
                || StringUtils.isBlank(senha_repetida)
                || StringUtils.isBlank(cep) || StringUtils.isBlank(rua) || StringUtils.isBlank(numero) || StringUtils.isBlank(cpf)
                || StringUtils.isBlank(telefone)) {
            return ResponseEntity.ok("ERR;campo_vazio");
            // Formato: STATUS;dados

            // Checa se a senha é igual a senha repetida e exibe uma mensagem de erro
        } else if (!senha.equals(senha_repetida)) {
            return ResponseEntity.ok("ERR;senhas_diferentes");

            // Checa se o email é válido através de regex e exibe uma mensagem de erro
        } else if (!EmailValidator.isValid(email)) {
            return ResponseEntity.ok("ERR;email_invalido");

            // Adiciona o cliente no banco de dados
        } else { 
            clienteRepository.save(new Cliente(email, telefone, nome, cpf, cep, rua, numero, complemento, senha));
            return ResponseEntity.ok("OK;" + cpf);
        }
    }

    @GetMapping("/horarios")
    public ResponseEntity<List<HorarioFuncionamentoDTO>> getHorarios() {
        List<HorarioFuncionamento> horarios = horarioFuncionamentoRepository.findAll();
        List<HorarioFuncionamentoDTO> horariosDTO = new ArrayList<>();

        for(HorarioFuncionamento horario : horarios) {
            HorarioFuncionamentoDTO horarioDTO = new HorarioFuncionamentoDTO(horario.getDiaSemana(), horario.getAbertura(), horario.getFechamento(), horario.isFechado());
            horariosDTO.add(horarioDTO);
        }
        return ResponseEntity.ok(horariosDTO);
    }
}