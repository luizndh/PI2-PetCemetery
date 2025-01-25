//  package com.petcemetery.petcemetery.controller;

// import java.time.LocalDate;
// import java.time.LocalDateTime;
// import java.util.ArrayList;
// import java.util.List;
// import java.util.Optional;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.MediaType;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;

// import com.petcemetery.petcemetery.DTO.AquisicaoJazigoDTO;
// import com.petcemetery.petcemetery.DTO.DetalharJazigoDTO;
// import com.petcemetery.petcemetery.DTO.JazigoDTO;
// import com.petcemetery.petcemetery.DTO.JazigoPerfilDTO;
// import com.petcemetery.petcemetery.model.Contrato;
// import com.petcemetery.petcemetery.model.Jazigo;
// import com.petcemetery.petcemetery.model.Jazigo.StatusEnum;
// import com.petcemetery.petcemetery.model.Pet;
// import com.petcemetery.petcemetery.model.Servico;
// import com.petcemetery.petcemetery.model.Servico.ServicoEnum;
// import com.petcemetery.petcemetery.services.ClienteService;
// import com.petcemetery.petcemetery.services.ContratoService;
// import com.petcemetery.petcemetery.services.JazigoService;
// import com.petcemetery.petcemetery.services.PetService;
// import com.petcemetery.petcemetery.services.ServicoService;

// @RestController
// @RequestMapping("/api")
// public class JazigoController {

//     @Autowired
//     private JazigoService jazigoService;

//     @Autowired
//     private ClienteService clienteService;

//     @Autowired
//     private PetService petService;

//     @Autowired
//     private ContratoService contratoService;

//     @Autowired
//     private ServicoService servicoService;

//     // Igual ao do cliente, porém o admin não vai conseguir selecionar um jazigo
//     @GetMapping("/mapa-jazigos")
//     public String mapaJazigos() {
//         return this.jazigoService.getMapaJazigos();  // Retorne a String de jazigos disponiveis
//     }

//     // Envia para o front uma lista dos jazigos do proprietário, contendo o nome do pet e a data do enterro, ou "Vazio" e null caso não tenha pet enterrado.
//     @GetMapping("/{cpf}/jazigos")
//     public List<JazigoDTO> recuperaJazigosProprietario(@PathVariable String cpf) {
//         return this.jazigoService.recuperaJazigosProprietario(cpf);
//     }

//     // Envia para o front o endereco do jazigo selecionado, o id dele e o preço de compra, para ser exibido na tela antes da compra do ornamento
//     @GetMapping("/{cpf}/jazigo/{id}")
//     public AquisicaoJazigoDTO comprarJazigo(@PathVariable String cpf, @PathVariable Long id, @RequestParam String tipo) {
//         return this.jazigoService.comprarJazigo(cpf, id, tipo);
//     }

//     // Envia para o front os precos dos planos atuais do sistema, para ser exibido na tela de seleção de planos
//     @GetMapping("/{cpf}/jazigo/{id}/planos")
//     public List<Servico> listarPlanos(@PathVariable String cpf, @PathVariable Long id) {
//         return this.servicoService.listarPlanos();
//     }

//     // //adiciona no carrinho o jazigo selecionado pelo cliente
//     // // TODO: alterar OU excluir metodo que caiu em desuso ao excluir carrinho (tem varios nessa classe assim)
//     // @PostMapping("/{cpf}/jazigo/{id}/planos/plano") //tipo == COMPRA ou ALUGUEL
//     // public ResponseEntity<?> finalizarCompra(@PathVariable String cpf, @PathVariable Long id, @RequestParam String planoSelecionado, @RequestParam String tipo) {

//     //     Optional<Jazigo> optionalJazigo = jazigoService.findById(id);
//     //     if (optionalJazigo.isPresent()) {

//     //         // Pegando o plano selecionado
//     //         // PlanoEnum plano = PlanoEnum.valueOf(planoSelecionado.toUpperCase());
//     //         // Jazigo jazigo = optionalJazigo.get();

//     //         return ResponseEntity.ok("OK;");
//     //     } else {
//     //         return ResponseEntity.ok("ERR;jazigo_nao_encontrado");
//     //     }
//     // }

//     // Retorna a mensagem e a foto atual para serem exibidas no front quando o usuário quiser alterar as informações do jazigo
//     // Tem que ver a foto ainda
//     @GetMapping("/{cpf}/informacao-jazigo/{id}")
//     public JazigoPerfilDTO exibirMensagemFotoJazigo(@PathVariable String cpf, @PathVariable Long id) {
//         return this.jazigoService.exibeMensagemFotoJazigo(cpf, id);
//     }

//     //edita só a mensagem do jazigo, nao sei a situação da foto ainda
//     @PutMapping("/{cpf}/informacao-jazigo/{id}")
//     public ResponseEntity<?> editarMensagemFotoJazigo(@PathVariable String cpf, @PathVariable Long id, @RequestBody String mensagem) {
//     if (mensagem.length() > 80) {
//         return ResponseEntity.ok("ERR;mensagem_maior_que_80_caracteres");
//     }

//     Optional<Jazigo> optionalJazigo = jazigoService.findById(id);

//     if (optionalJazigo.isPresent()) {
//         Jazigo jazigo = optionalJazigo.get();

//         double valor = servicoService.findByTipoServico(ServicoEnum.PERSONALIZACAO).getValor();

//         if (jazigo.getProprietario().equals(clienteService.findByCpf(cpf))) {
//             jazigo.setMensagem(mensagem);
//             jazigoService.save(jazigo);

//             Contrato personalizacaoServico = new Contrato(valor, clienteService.findByCpf(cpf), jazigo, jazigo.getPlano(), null, LocalDateTime.now(), null, null, new Servico(ServicoEnum.PERSONALIZACAO, valor));
//             contratoService.save(personalizacaoServico);

//             return ResponseEntity.ok("OK;Mensagem_editada");
//         } else {
//             return ResponseEntity.ok("ERR;jazigo_nao_pertence_usuario");
//         }
//     } else {
//         return ResponseEntity.ok("ERR;jazigo_nao_encontrado");
//     }
// }

//     // Recebe a data e hora do enterro e também os dados do pet a ser enterrado.
//     // Cria um novo pet e um novo servico de enterro
//     @PostMapping("/{cpf}/meus_jazigos/{id}/agendar_enterro")
//     public ResponseEntity<?> agendarEnterro(@PathVariable("cpf") String cpf, @PathVariable("id") Long id, @RequestParam("data") String data, @RequestParam("hora") String hora, @RequestParam("nomePet") String nomePet, @RequestParam("especie") String especie, @RequestParam("dataNascimento") String dataNascimento) {

//         Jazigo jazigo = jazigoService.findById(id).get();

//         if(jazigo.getStatus() == StatusEnum.OCUPADO) {
//             return ResponseEntity.ok("ERR;jazigo_ocupado");
//         }

//         double valor = servicoService.findByTipoServico(ServicoEnum.ENTERRO).getValor();

//         jazigo.setStatus(StatusEnum.OCUPADO);

//         Pet pet = new Pet(nomePet, LocalDateTime.parse(data + "T" + hora), LocalDate.parse(dataNascimento), especie, clienteService.findByCpf(cpf));
//         petService.save(pet); //! o pet é setado no banco mesmo q o kra nao pague o enterro e n prossiga c nada, vao ter pets setados sem estar no cemiterio

//         Contrato enterroServico = new Contrato(valor, clienteService.findByCpf(cpf), jazigo, null, pet, LocalDateTime.parse(data + "T" + hora), new Servico(ServicoEnum.ENTERRO, valor));
//         contratoService.save(enterroServico);

//         return ResponseEntity.ok("OK;enterro_no_carrinho");
//     }


//     // Recebe os parâmetros data (yyyy-mm-dd) e hora (hh-mm) da exumacao, no formato correto, e salva no banco
//     // Não estamos utilizando o cpf pra nada :D - utiliza sim, p saber se o jazigo é do kra ou nao
//     @PostMapping("/{cpf}/meus_jazigos/{id}/agendar_exumacao")
//     public ResponseEntity<?> agendarExumacao(@PathVariable("cpf") String cpf, @PathVariable("id") Long id, @RequestParam("data") String data, @RequestParam("hora") String hora) {
//         Jazigo jazigo = jazigoService.findById(id).get();
//         Pet pet = jazigo.getPetEnterrado();

//         double valor = servicoService.findByTipoServico(ServicoEnum.EXUMACAO).getValor();

//         pet.setDataExumacao(LocalDateTime.parse(data + "T" + hora));
//         petService.save(pet);

//         Contrato exumacao = new Contrato(valor, clienteService.findByCpf(cpf), jazigo, jazigo.getPlano(), pet, LocalDateTime.parse(data + "T" + hora), new Servico(ServicoEnum.EXUMACAO, valor));
//         contratoService.save(exumacao);

//         return ResponseEntity.ok("OK;exumacao_no_carrinho");
//     }

//     // Retorna o valor atual do preço de enterro para ser exibido na tela de pagamento
//     @GetMapping("/{cpf}/meus_jazigos/{id}/agendar_enterro/preco")
//     public ResponseEntity<?> precoEnterro() {
//         double valor = servicoService.findByTipoServico(ServicoEnum.ENTERRO).getValor();
//         return ResponseEntity.ok("OK;" + valor);
//     }

//     // Retorna o valor atual do preço de exumacao para ser exibido na tela de pagamento
//     @GetMapping("/{cpf}/meus_jazigos/{id}/agendar_exumacao/preco")
//     public ResponseEntity<?> precoExumacao() {
//         double valor = servicoService.findByTipoServico(ServicoEnum.EXUMACAO).getValor();
//         return ResponseEntity.ok("OK;" + valor);
//     }

//     //retorna os detalhes do jazigo especificado para ser exibido na tela de visualizar detalhes de jazifo
//     @GetMapping("/{cpf}/meus_jazigos/{id}/detalhar_jazigo")
//     public ResponseEntity<?> detalharJazigo(@PathVariable("id") Long id){
//         Jazigo jazigo = jazigoService.findByIdJazigo(id);

//         if(jazigo.getPetEnterrado() == null) {
//             return ResponseEntity.ok("OK;vazio");
//         }

//         DetalharJazigoDTO detalharJazigoDTO = new DetalharJazigoDTO(jazigo.getPetEnterrado(), jazigo);

//         return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(detalharJazigoDTO);
//     }

//     @GetMapping("/{cpf}/meus_jazigos/{id}/agendar_manutencao/preco")
//     public ResponseEntity<?> precoManutencao() {
//         double valor = servicoService.findByTipoServico(ServicoEnum.MANUTENCAO).getValor();
//         return ResponseEntity.ok("OK;" + valor);
//     }

//     @PostMapping("/{cpf}/meus_jazigos/{id}/agendar_manutencao")
//     public ResponseEntity<?> agendarManutencao(@PathVariable("cpf") String cpf, @PathVariable("id") Long id, @RequestParam("data") String data) {
//         Jazigo jazigo = jazigoService.findById(id).get();
//         double valor = servicoService.findByTipoServico(ServicoEnum.MANUTENCAO).getValor();

//         Contrato manutencaoServico = new Contrato(valor, clienteService.findByCpf(cpf), jazigo, null, null, LocalDateTime.parse(data + "T00:00:00"), new Servico(ServicoEnum.MANUTENCAO, valor));
//         contratoService.save(manutencaoServico);

//         return ResponseEntity.ok("OK;manutencao_agendada");
//     }

//     //metodo post que cria e salva um carrinho com o servico PERSONALIZACAO, que troca o plano do jazigo
//     @PostMapping("/{cpf}/meus_jazigos/{id}/trocar_plano")
//     public ResponseEntity<?> trocarPlano (@PathVariable("cpf") String cpf, @PathVariable("id") Long id, @RequestParam("tipo") String tipo){

//         Optional<Jazigo> optionalJazigo = jazigoService.findById(id);

//         if(!optionalJazigo.isPresent()){
//             return ResponseEntity.ok("OK;Jazigo_nao_encontrado");
//         } else {
//             Jazigo jazigo = optionalJazigo.get();

//             Contrato contratos = new Contrato(0, clienteService.findByCpf(cpf), jazigo, PlanoEnum.valueOf(tipo), null, LocalDateTime.now(), new Servico(ServicoEnum.PERSONALIZACAO, 0)); // O valor do servico é 0 pois será somado com o valor do plano selecionado no construtor do Serviço
//             contratoService.save(contratos);

//             return ResponseEntity.ok("OK;troca_de_plano_no_carrinho");
//         }

//     }
// }
