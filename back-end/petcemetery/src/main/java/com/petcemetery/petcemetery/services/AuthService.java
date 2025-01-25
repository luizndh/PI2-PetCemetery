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
                return "conta desativada";
            }

        return cliente.getCpf();

        } else if (admin != null) {
            return admin.getCpf();

        } else {
            return "informações inválidas";
        }
    }

    public String cadastro(String email, String senha, String senhaRepetida, String cpf, String cep, String rua,
            String numero, String complemento, String nome, String telefone) {

        // Checa se algum dos campos não foi preenchido e exibe uma mensagem de erro
        if (StringUtils.isBlank(nome) || StringUtils.isBlank(email) || StringUtils.isBlank(senha)
            || StringUtils.isBlank(senhaRepetida)
            || StringUtils.isBlank(cep) || StringUtils.isBlank(rua) || StringUtils.isBlank(numero) || StringUtils.isBlank(cpf)
            || StringUtils.isBlank(telefone)) {
            return "campo vazio";
            // Formato: STATUS;dados

            // Checa se a senha é igual a senha repetida e exibe uma mensagem de erro
        } else if (!senha.equals(senhaRepetida)) {
            return "senhas diferentes";

            // Checa se o email é válido através de regex e exibe uma mensagem de erro
        } else if (!EmailValidator.isValid(email)) {
            return "formato invalido do email";
            // Checa se já existe um cliente cadastrado com o email fornecido e exibe uma
            // mensagem de erro
        } else if (clienteService.findByEmail(email) != null) {
            return "email ja cadastrado";

            // Adiciona o cliente no banco de dados
        } else {
            clienteService.save(new Cliente(email, telefone, nome, cpf, cep, rua, numero, complemento, senha));
            return cpf;
        }
    }

}
