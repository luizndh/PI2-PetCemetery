package com.petcemetery.petcemetery.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.petcemetery.petcemetery.model.Admin;
import com.petcemetery.petcemetery.model.Cliente;
import com.petcemetery.petcemetery.outros.EmailValidator;

import io.micrometer.common.util.StringUtils;

@Service
public class AuthService {

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private AdminService adminService;

    public String login(String email, String senha) {
        Cliente cliente = clienteService.findByEmailAndSenha(email, senha);
        Admin admin = adminService.findByEmailAndSenha(email, senha);

        if (cliente != null) {
            if(cliente.getDesativado()) {
                throw new IllegalArgumentException("Cliente desativado");
            }

        return cliente.getCpf();

        } else if (admin != null) {
            return admin.getCpf();

        } else {
            throw new IllegalArgumentException("Email ou senha incorretos");
        }
    }

    public String cadastro(String email, String senha, String senhaRepetida, String cpf, String cep, String rua,
            String numero, String complemento, String nome, String telefone) {

        // Checa se algum dos campos não foi preenchido e exibe uma mensagem de erro
        if (StringUtils.isBlank(nome) || StringUtils.isBlank(email) || StringUtils.isBlank(senha)
            || StringUtils.isBlank(senhaRepetida)
            || StringUtils.isBlank(cep) || StringUtils.isBlank(rua) || StringUtils.isBlank(numero) || StringUtils.isBlank(cpf)
            || StringUtils.isBlank(telefone)) {
            
            throw new IllegalArgumentException("Preencha todos os campos necessários");

            // Checa se a senha é igual a senha repetida e exibe uma mensagem de erro
        } else if (!senha.equals(senhaRepetida)) {
            throw new IllegalArgumentException("As senhas devem ser iguais");

            // Checa se o email é válido através de regex e exibe uma mensagem de erro
        } else if (!EmailValidator.isValid(email)) {
            throw new IllegalArgumentException("Formato de email inválido");
            // Checa se já existe um cliente cadastrado com o email fornecido e exibe uma
            // mensagem de erro
        } else if (clienteService.findByEmail(email) != null) {
            throw new IllegalArgumentException("Esse email já está cadastrado");

            // Adiciona o cliente no banco de dados
        } else {
            clienteService.save(new Cliente(email, telefone, nome, cpf, cep, rua, numero, complemento, senha));
            return cpf;
        }
    }

}
