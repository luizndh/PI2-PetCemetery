 package com.petcemetery.petcemetery.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.petcemetery.petcemetery.DTO.AquisicaoJazigoDTO;
import com.petcemetery.petcemetery.DTO.CarrinhoDTO;
import com.petcemetery.petcemetery.DTO.JazigoDTO;
import com.petcemetery.petcemetery.DTO.JazigoPerfilDTO;
import com.petcemetery.petcemetery.model.Jazigo;
import com.petcemetery.petcemetery.model.Servico;
import com.petcemetery.petcemetery.model.Servico.ServicoEnum;
import com.petcemetery.petcemetery.services.JazigoService;
import com.petcemetery.petcemetery.services.ServicoService;

@RestController
@RequestMapping("/api")
public class JazigoController {

    @Autowired
    private JazigoService jazigoService;

    @Autowired
    private ServicoService servicoService;

    // Igual ao do cliente, porém o admin não vai conseguir selecionar um jazigo
    @GetMapping("/mapa-jazigos")
    public String mapaJazigos() {
        return this.jazigoService.getMapaJazigos();  // Retorne a String de jazigos disponiveis
    }

    // Envia para o front uma lista dos jazigos do proprietário, contendo o nome do pet e a data do enterro, ou "Vazio" e null caso não tenha pet enterrado.
    @GetMapping("/{cpf}/jazigos")
    public List<JazigoDTO> recuperaJazigosProprietario(@PathVariable String cpf) {
        return this.jazigoService.recuperaJazigosProprietario(cpf);
    }

    // Envia para o front o endereco do jazigo selecionado, o id dele e o preço de compra, para ser exibido na tela antes da compra do ornamento
    @GetMapping("/{cpf}/jazigo/{id}")
    public AquisicaoJazigoDTO comprarJazigo(@PathVariable String cpf, @PathVariable Long id, @RequestParam String tipo) {
        return this.jazigoService.comprarJazigo(cpf, id, tipo);
    }

    // Envia para o front os precos dos planos atuais do sistema, para ser exibido na tela de seleção de planos
    @GetMapping("/{cpf}/jazigo/{id}/planos")
    public List<Servico> listarPlanos(@PathVariable String cpf, @PathVariable Long id) {
        return this.servicoService.listarPlanos();
    }

    // //adiciona no carrinho o jazigo selecionado pelo cliente
    // // TODO: alterar OU excluir metodo que caiu em desuso ao excluir carrinho (tem varios nessa classe assim)
    @PostMapping("/{cpf}/finalizar-compra") //tipo == COMPRA ou ALUGUEL
    public boolean finalizarCompra(@PathVariable String cpf, @RequestBody List<CarrinhoDTO> carrinho) {
        return this.jazigoService.finalizarCompra(cpf, carrinho);
    }

    // Retorna a mensagem e a foto atual para serem exibidas no front quando o usuário quiser alterar as informações do jazigo
    // Tem que ver a foto ainda
    @GetMapping("/{cpf}/informacao-jazigo/{id}")
    public JazigoPerfilDTO exibirMensagemFotoJazigo(@PathVariable String cpf, @PathVariable Long id) {
        return this.jazigoService.exibeMensagemFotoJazigo(cpf, id);
    }

    //edita só a mensagem do jazigo, nao sei a situação da foto ainda
    @PutMapping("/{cpf}/informacao-jazigo/{id}")
    public boolean editarMensagemFotoJazigo(@PathVariable String cpf, @PathVariable Long id, @RequestBody String mensagem) {
        if (mensagem.length() > 80) {
            throw new IllegalArgumentException("Limite de 80 caracteres excedido");
        }

        return this.jazigoService.editarMensagemFotoJazigo(cpf, id, mensagem);
    }

    // Recebe a data e hora do enterro e também os dados do pet a ser enterrado.
    // Cria um novo pet e um novo servico de enterro
    @PostMapping("/{cpf}/informacao-jazigo/{id}/enterro")
    public boolean agendarEnterro(@PathVariable String cpf, @PathVariable Long id, @RequestParam String data, @RequestParam String hora,
        @RequestParam String nomePet, @RequestParam String especie, @RequestParam String dataNascimento) {

        return this.jazigoService.agendarEnterro(cpf, id, data, hora, nomePet, especie, dataNascimento);
    }


    // Recebe os parâmetros data (yyyy-mm-dd) e hora (hh-mm) da exumacao, no formato correto, e salva no banco
    // Não estamos utilizando o cpf pra nada :D - utiliza sim, p saber se o jazigo é do kra ou nao
    @PostMapping("/{cpf}/informacao-jazigo/{id}/exumacao")
    public boolean agendarExumacao(@PathVariable String cpf, @PathVariable Long id, @RequestParam String data, @RequestParam String hora) {
        return this.jazigoService.agendarExumacao(cpf, id, data, hora);
    }

    // Retorna o valor atual do preço de um servico
    @GetMapping("/{cpf}/informacao-jazigo/{id}/servico/{nomeServico}")
    public Double precoEnterro(@PathVariable String nomeServico) {
        return servicoService.findByTipoServico(ServicoEnum.valueOf(nomeServico.toUpperCase())).getValor();
    }

    //retorna os detalhes do jazigo especificado para ser exibido na tela de visualizar detalhes de jazifo
    @GetMapping("/{cpf}/informacao-jazigo/{id}/detalhe")
    public Jazigo detalharJazigo(@PathVariable Long id){
        return this.jazigoService.detalharJazigo(id);
    }

    @PostMapping("/{cpf}/informacao-jazigo/{id}/manutencao")
    public boolean agendarManutencao(@PathVariable String cpf, @PathVariable Long id, @RequestParam String data) {
        return this.jazigoService.agendarManutencao(cpf, id, data);
    }

    //metodo post com o servico PERSONALIZACAO, que troca o plano do jazigo
    @PutMapping("/{cpf}/informacao-jazigo/{id}/plano")
    public boolean trocarPlano (@PathVariable String cpf, @PathVariable Long id, @RequestParam String tipo){
        return this.jazigoService.trocarPlano(cpf, id, tipo);
    }
}
