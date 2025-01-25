package com.petcemetery.petcemetery.services;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.petcemetery.petcemetery.DTO.ClienteDTO;
import com.petcemetery.petcemetery.DTO.ClienteInadimplenteDTO;
import com.petcemetery.petcemetery.DTO.ClientePerfilDTO;
import com.petcemetery.petcemetery.model.Cliente;
import com.petcemetery.petcemetery.outros.EmailValidator;
import com.petcemetery.petcemetery.repositorio.ClienteRepository;

import io.micrometer.common.util.StringUtils;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository repository;

    public List<ClienteInadimplenteDTO> findInadimplentes() {
        List<Cliente> clientesInadimplentes = repository.findByInadimplenteTrue();

        return clientesInadimplentes.stream().map(cliente -> new ClienteInadimplenteDTO(
                cliente.getEmail(),
                cliente.getTelefone(),
                cliente.getNome(),
                cliente.getDesativado(),
                cliente.getInadimplente()
        )).collect(Collectors.toList());
    }

    public Cliente findByEmailAndSenha(String email, String senha) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByEmailAndSenha'");
    }

    public void save(Cliente cliente) {
        this.repository.save(cliente);
    }

    public Cliente findByEmail(String email) {
        return this.repository.findByEmail(email);
    }

    public Cliente findByCpf(String cpf) {
        return this.repository.findByCpf(cpf);
    }

    public boolean editaPerfil(String cpf, Map<String, Object> requestBody) {

        Cliente cliente = this.repository.findByCpf(cpf);
        // Vai passar por todos os valores do forms de editar perfil, para verificar
        // quais foram preenchidos e quais não foram
        for (Map.Entry<String, Object> entry : requestBody.entrySet()) {
            String campo = entry.getKey();
            Object valor = entry.getValue();

            if (!StringUtils.isBlank((String) valor)) {
                // Atualizar o campo correspondente no cliente
                switch (campo) {
                    case "nome":
                        cliente.setNome((String) valor);
                        break;
                    case "email":
                        if (!EmailValidator.isValid((String) valor)) {
                            return false;
                        }
                        cliente.setEmail((String) valor);
                        break;
                    case "telefone":
                        cliente.setTelefone((String) valor);
                        break;
                    case "rua":
                        cliente.setRua((String) valor);
                        break;
                    case "numero":
                        cliente.setNumero((String) valor);
                        break;
                    case "complemento":
                        cliente.setComplemento((String) valor);
                        break;
                    case "cep":
                        cliente.setCep((String) valor);
                        break;
                    case "senha":
                        String senha_repetida = (String) requestBody.get("senharepeat");
                        if (!valor.equals(senha_repetida)) {
                            return false;
                        }
                        cliente.setSenha((String) valor);
                        break;
                }
            }
        }

        this.repository.save(cliente);
        return true;
    }

    public boolean desativarPerfil(String cpf) {
        Cliente cliente = repository.findByCpf(cpf);

        if (cliente.getDesativado()) {
            return false;
        }

        cliente.setDesativado(true);
        repository.save(cliente);
        return true;
    }

    public ClienteDTO recuperaInformacoesAlteracao(String cpf) {
        Cliente cliente = repository.findByCpf(cpf);

        if (cliente.getDesativado()) {
            return null;
        }

        return new ClienteDTO(
            cliente.getEmail(),
            cliente.getTelefone(),
            cliente.getNome(),
            cliente.getRua(),
            cliente.getNumero(),
            cliente.getComplemento(),
            cliente.getCep()
        );
    }

    public ClientePerfilDTO recuperaInformacoesPerfil(String cpf) {
        Cliente cliente = repository.findByCpf(cpf);

        if (cliente.getDesativado()) {
            return null;
        }

        return new ClientePerfilDTO(
            cliente.getNome(),
            cliente.getEmail()
        );
    }
}