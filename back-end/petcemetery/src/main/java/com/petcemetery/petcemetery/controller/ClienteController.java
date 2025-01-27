package com.petcemetery.petcemetery.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.petcemetery.petcemetery.DTO.ClienteDTO;
import com.petcemetery.petcemetery.DTO.ClientePerfilDTO;
import com.petcemetery.petcemetery.DTO.VisualizarDespesasDTO;
import com.petcemetery.petcemetery.model.Cliente;
import com.petcemetery.petcemetery.model.Lembrete;
import com.petcemetery.petcemetery.repositorio.LembreteRepository;
import com.petcemetery.petcemetery.services.ClienteService;
import com.petcemetery.petcemetery.services.ContratoService;

@RestController
@RequestMapping("/api/cliente/{cpf}")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private LembreteRepository lembreteRepository;

    @Autowired
    private ContratoService contratoService;

    // Recebe as informações que o cliente deseja mudar, em JSON, e altera no banco de dados
    @PutMapping("")
    public boolean editarPerfil(@RequestBody Map<String, Object> requestBody,
            @PathVariable String cpf) {

        return this.clienteService.editaPerfil(cpf, requestBody);
    }

    // Desativa o perfil do Cliente quando solicitado
    @PostMapping("/desativar")
    public boolean desativarPerfil(@PathVariable String cpf) {
        return this.clienteService.desativarPerfil(cpf);
    }

    // Retorna os dados do cliente, menos a senha e CPF, na tela AlterarPerfil.js, para serem exibidos no editar perfil. Isso evita o cliente ter que escrever tudo de novo.
    @GetMapping("/alterar")
    public ClienteDTO getAlterarPerfil(@PathVariable String cpf) {
        return this.clienteService.recuperaInformacoesAlteracao(cpf);
    }

    // Exibe o nome e o email do perfil do Cliente na página ExibirPerfil.js
    @GetMapping("")
    public ClientePerfilDTO exibirPerfil(@PathVariable String cpf) {
        return this.clienteService.recuperaInformacoesPerfil(cpf);
    }

    // Recebe uma data no formato YYYY-mm-dd do front quando o cliente adiciona um novo lembrete de visita e adiciona no banco de dados com seu cpf e data.
    @PostMapping("/lembrete")
    public boolean adicionarLembrete(@PathVariable String cpf, @RequestParam LocalDate data) {
        if (LocalDate.now().isAfter(data)) {
            throw new IllegalArgumentException("A data informada não pode ser no passado");
        }

        Cliente cliente = clienteService.findByCpf(cpf);
        Lembrete lembrete = new Lembrete(data, cliente);

        lembreteRepository.save(lembrete);

        return true;
    }

    // Retorna para o front um objeto despesasDTO contendo o tipo de serviço, valor, data do ultimo pagamento e data do vencimento.
    @GetMapping("/despesas")
    public List<VisualizarDespesasDTO> visualizarDespesas(@PathVariable String cpf){
        return contratoService.visualizarDespesas(cpf);
    }
}
