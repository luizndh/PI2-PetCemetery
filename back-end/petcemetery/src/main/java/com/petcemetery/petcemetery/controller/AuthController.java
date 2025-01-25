package com.petcemetery.petcemetery.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.petcemetery.petcemetery.services.AuthService;

import io.micrometer.common.util.StringUtils;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String senha = loginRequest.get("senha");

        String resposta = this.authService.login(email, senha);

        if (resposta.chars().anyMatch(Character::isDigit)) {
            return ResponseEntity.ok(resposta);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(resposta);
        }
    }

    @PostMapping(path = "/cadastro", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> cadastro(@RequestBody Map<String, Object> requestBody) {


        String email = (String) requestBody.get("email");
        String senha = (String) requestBody.get("senha");
        String senhaRepetida = (String) requestBody.get("senharepeat");
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

        String resposta = this.authService.cadastro(email, senha, senhaRepetida, cpf, cep, rua, numero, complemento, nome, telefone);

        if (resposta.chars().anyMatch(Character::isDigit)) {
            return ResponseEntity.ok(resposta);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resposta);
        }
    }
}