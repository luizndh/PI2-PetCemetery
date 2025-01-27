package com.petcemetery.petcemetery.controller;

import java.time.DateTimeException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.petcemetery.petcemetery.DTO.ClienteInadimplenteDTO;
import com.petcemetery.petcemetery.DTO.ContratoDTO;
import com.petcemetery.petcemetery.DTO.HistoricoJazigoDTO;
import com.petcemetery.petcemetery.DTO.HorarioFuncionamentoDTO;
import com.petcemetery.petcemetery.DTO.JazigoDTO;
import com.petcemetery.petcemetery.model.Servico;
import com.petcemetery.petcemetery.outros.VerificadorData;
import com.petcemetery.petcemetery.services.AdminService;
import com.petcemetery.petcemetery.services.ClienteService;
import com.petcemetery.petcemetery.services.ContratoService;
import com.petcemetery.petcemetery.services.HorarioFuncionamentoService;
import com.petcemetery.petcemetery.services.JazigoService;
import com.petcemetery.petcemetery.services.ServicoService;

@EnableAsync
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private ServicoService servicoService;

    @Autowired
    private HorarioFuncionamentoService horarioFuncionamentoService;

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private ContratoService contratoService;

    @Autowired
    private JazigoService jazigoService;

    // Retorna, em formato JSON, informações sobre todos os pets que já passaram no jazigo passado pelo seu id.
    @GetMapping("/{id}/historico")
    public List<HistoricoJazigoDTO> visualizarHistorico(@PathVariable Long id) {
        return this.adminService.visualizarHistorico(id);
    }

    // Retorna o valor de todos os servicos em formato JSON
    @GetMapping("/servicos")
    public List<Servico> exibirServicos() {
        return servicoService.exibirServicos(); // redireciona para a página de serviços
    }

    // Atualiza o valor do plano no banco com base no seu nome
    @PutMapping("/servico/{nomeServico}")
    public boolean alterarServicos(@PathVariable String nomeServico, @RequestParam double valor) {
        return this.servicoService.alterarServicos(nomeServico, valor);
    }

    // Altera o horário de funcionamento do cemitério de acordo com o horário passado no RequestBody. O front deve passar um body no formato:
    // {
    //  "segunda": {"abertura": "HH:MM", "fechamento": "HH:MM", "fechado": "false" }, "terca": {"abertura": "HH:MM", "fechamento": "HH:MM", "fechado": "false" },
    // "quarta": {"abertura": "HH:MM", "fechamento": "HH:MM", "fechado": "false" }, "quinta": {"abertura": "HH:MM", "fechamento": "HH:MM", "fechado": "false" },
    // "sexta": {"abertura": "HH:MM", "fechamento": "HH:MM", "fechado": "true" }, "sabado": {"abertura": "HH:MM", "fechamento": "HH:MM", "fechado": "false" },
    // "domingo": {"abertura": "HH:MM", "fechamento": "HH:MM", "fechado": "true" }, "feriado": {"abertura": "HH:MM", "fechamento": "HH:MM", "fechado": "true" }
    @PutMapping("/horarios")
    public void alterarHorarioFuncionamento(@RequestBody Map<String, Map<String, Object>> body) {
        List<HorarioFuncionamentoDTO> horarios = new ArrayList<>();

        for (Entry<String, Map<String, Object>> entry : body.entrySet()) {
            String diaSemana = entry.getKey();
            Map<String, Object> horario = entry.getValue();
            LocalTime abertura = LocalTime.parse((String) horario.get("abertura"));
            LocalTime fechamento = LocalTime.parse((String) horario.get("fechamento"));
            boolean fechado = (boolean) horario.get("fechado");

            HorarioFuncionamentoDTO horarioDTO = new HorarioFuncionamentoDTO(diaSemana, abertura, fechamento, fechado);
            horarios.add(horarioDTO);
        }

        adminService.alterarHorarioFuncionamento(horarios);
    }

    // Retorna todos os horários de funcionamento para serem exibidos quando o admin entrar na tela de Alterar Horário de Funcionamento
    @GetMapping("/horarios")
    public List<HorarioFuncionamentoDTO> getHorarios() {
        return horarioFuncionamentoService.getHorarios();
    }

    // Visualizar clientes inadimplentes
    @GetMapping("/inadimplentes")
    public List<ClienteInadimplenteDTO> findInadimplentes() {
        return this.clienteService.findInadimplentes();
    }

    // Relatório de enterros
    @GetMapping("/enterros")
    public List<ContratoDTO> findEnterros() {
        return this.contratoService.findEnterros();
    }

    // Gerar PDF de enterros
    @GetMapping("/enterros/pdf")
    public ResponseEntity<byte[]> gerarPDFEnterros() {
        // Pega o retorno do método acima
        List<ContratoDTO> enterros = this.contratoService.findEnterros();

        if (enterros == null) {
            throw new NoSuchElementException("Não existem enterros na nossa base de dados");
        }

        byte[] pdfBytes = this.contratoService.gerarPDFEnterros(enterros);

        if (pdfBytes != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("filename", "relatorio_enterros.pdf");
            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    // Relatório de exumações
    @GetMapping("/exumacoes")
    public List<ContratoDTO> findExumacoes() {
        return this.contratoService.findExumacoes();
    }

    // Gerar PDF de exumações
    @GetMapping("/exumacoes/pdf")
    public ResponseEntity<byte[]> gerarPDFExumacoes() {
        // Pega o retorno do método acima
        List<ContratoDTO> exumacoes = this.contratoService.findExumacoes();

        if (exumacoes == null) {
            throw new NoSuchElementException("Não existem exumações na nossa base de dados");
        }

        byte[] pdfBytes = this.contratoService.gerarPDFExumacoes(exumacoes);

        if (pdfBytes != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("filename", "relatorio_exumacoes.pdf");
            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    // Relatório de jazigos
    @GetMapping("/jazigos")
    public List<JazigoDTO> getJazigos(){
        return this.jazigoService.getJazigos();
    }

    // Gerar PDF de jazigos
    @GetMapping("/jazigos/pdf")
    public ResponseEntity<byte[]> gerarPDFJazigos() {
        // Pega o retorno do método acima
        List<JazigoDTO> jazigos = this.jazigoService.getJazigos();

        if (jazigos == null) {
            throw new NoSuchElementException("Não existem jazigos na nossa base de dados");
        }

        byte[] pdfBytes = this.jazigoService.gerarPDFJazigos(jazigos);

        if (pdfBytes != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("filename", "relatorio_jazigos.pdf");
            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    // Recebe um request parameter "data" no formato "yyyy-MM-dd" e seta a data atual do sistema para a data recebida. Retorna "ERR;data_invalida"
    // caso o formato da data seja inválido, e "OK" se tudo ocorrer bem.
    @PostMapping("/time-travel")
    public boolean timeTravel(@RequestParam String data) {
        LocalDate dataAvancada;

        try {
            dataAvancada = LocalDate.parse(data);
        }
        catch (DateTimeException e){
            throw new IllegalArgumentException("Formato de data inválido");
        }

        VerificadorData.setCurrentDate(dataAvancada);

        return true;
    }
}