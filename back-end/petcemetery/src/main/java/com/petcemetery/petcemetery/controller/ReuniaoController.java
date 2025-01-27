package com.petcemetery.petcemetery.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.petcemetery.petcemetery.DTO.ReuniaoDTO;
import com.petcemetery.petcemetery.model.Reuniao;
import com.petcemetery.petcemetery.services.ReuniaoService;

@RestController
@RequestMapping("/api/reuniao")
public class ReuniaoController {

    @Autowired
    private ReuniaoService reuniaoService;

    // Retorna a lista de todas as reunioes do banco de dados, para serem visualizadas pelo admin, de forma crescente pela data
    @GetMapping("/admin/visualizar")
    public List<ReuniaoDTO> visualizarReunioes() {
        return this.reuniaoService.visualizarReunioes();
    }

    // Salva uma reuniao no banco de dados, com base no cpf do cliente e nos parâmetros que ele escolheu na página (data, horário e assunto)
    // A data deve ser no formato yyyy-MM-dd, e o horário no formato hh:mm, e o assunto deve ser uma String. Deve ser enviado no formato JSON.
    @PostMapping("/cliente/{cpf}/agendar")
    public boolean agendarReuniao(@PathVariable String cpf, @RequestBody ReuniaoDTO reuniao) {
        return this.reuniaoService.agendarReuniao(cpf, reuniao);
    }
}
