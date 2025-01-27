package com.petcemetery.petcemetery.services;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import com.petcemetery.petcemetery.DTO.ContratoDTO;
import com.petcemetery.petcemetery.DTO.VisualizarDespesasDTO;
import com.petcemetery.petcemetery.model.Contrato;
import com.petcemetery.petcemetery.model.Servico.ServicoEnum;
import com.petcemetery.petcemetery.repositorio.ContratoRepository;

@Service
public class ContratoService {

    @Autowired
    private ContratoRepository repository;

    public List<ContratoDTO> findEnterros() {
        List<Contrato> contratos = repository.findByServicoTipoServico(ServicoEnum.valueOf("ENTERRO"));
        List<ContratoDTO> enterros = new ArrayList<>();

        for (Contrato contrato : contratos) {
            ContratoDTO contratoDTO = new ContratoDTO(
                contrato.getValor(),
                contrato.getServico().getTipoServico(),
                contrato.getJazigo().getEndereco(),
                contrato.getJazigo().getIdJazigo(),
                contrato.getPet().getId(),
                contrato.getPet().getDataEnterro().toString(),
                contrato.getCliente().getCpf()
            );

            enterros.add(contratoDTO);
        }

        return enterros;
    }

    public byte[] gerarPDFEnterros(List<ContratoDTO> enterros) {
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            Document document = new Document();
            PdfWriter writer = PdfWriter.getInstance(document, outputStream);
            document.open();

            // Adicionando o título ao PDF
            Paragraph paragraph = new Paragraph("Relatório de Enterros", FontFactory.getFont(FontFactory.HELVETICA, 30, Font.BOLD));
            paragraph.setAlignment(Element.ALIGN_CENTER);
            document.add(paragraph);

            // Adicionar espaços em branco
            Chunk chunk = new Chunk("\n");
            document.add(chunk);

            document.add(new Paragraph("        VALOR                    JAZIGO                    CPF                                     DATA ", FontFactory.getFont(FontFactory.HELVETICA, 12, Font.BOLD)));
            // Adicionando o conteúdo de cada objeto ao PDF
            for (ContratoDTO enterro : enterros) {
                document.add(new Paragraph("----------------------------------------------------------------------------------------------------------------------------------"));
                document.add(new Paragraph("         " + String.valueOf(enterro.getValor()) + "                         " + enterro.getEnderecoJazigo() + "                    " + enterro.getCpfCliente() + "                       " + enterro.getDataServico()));
            }
            document.add(new Paragraph("----------------------------------------------------------------------------------------------------------------------------------"));
            document.close();
            writer.close();

            byte[] pdfBytes = outputStream.toByteArray();

            return pdfBytes;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao gerar PDF");
        }
    }

    public List<ContratoDTO> findExumacoes() {
        List<Contrato> contratos = repository.findByServicoTipoServico(ServicoEnum.valueOf("EXUMACAO"));
        List<ContratoDTO> exumacoes = new ArrayList<>();

        for (Contrato contrato : contratos) {
            ContratoDTO contratoDTO = new ContratoDTO(
                contrato.getValor(),
                contrato.getServico().getTipoServico(),
                contrato.getJazigo().getEndereco(),
                contrato.getJazigo().getIdJazigo(),
                contrato.getPet().getId(),
                contrato.getPet().getDataEnterro().toString(),
                contrato.getCliente().getCpf()
            );

            exumacoes.add(contratoDTO);
        }

        return exumacoes;
    }

    public byte[] gerarPDFExumacoes(List<ContratoDTO> exumacoes) {
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            Document document = new Document();
            PdfWriter writer = PdfWriter.getInstance(document, outputStream);
            document.open();

            // Adicionando o título ao PDF
            Paragraph paragraph = new Paragraph("Relatório de Exumações", FontFactory.getFont(FontFactory.HELVETICA, 30, Font.BOLD));
            paragraph.setAlignment(Element.ALIGN_CENTER);
            document.add(paragraph);

            // Adicionar espaços em branco
            Chunk chunk = new Chunk("\n");
            document.add(chunk);

            document.add(new Paragraph("        VALOR                    JAZIGO                    CPF                                     DATA ", FontFactory.getFont(FontFactory.HELVETICA, 12, Font.BOLD)));
            // Adicionando o conteúdo de cada objeto ao PDF
            for (ContratoDTO exumacao : exumacoes) {
                document.add(new Paragraph("----------------------------------------------------------------------------------------------------------------------------------"));
                document.add(new Paragraph("         " + String.valueOf(exumacao.getValor()) + "                         " + exumacao.getEnderecoJazigo() + "                    " + exumacao.getCpfCliente() + "                       " + exumacao.getDataServico()));
            }
            document.add(new Paragraph("----------------------------------------------------------------------------------------------------------------------------------"));
            document.close();
            writer.close();

            byte[] pdfBytes = outputStream.toByteArray();

            return pdfBytes;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao gerar PDF");
        }
    }

    public List<VisualizarDespesasDTO> visualizarDespesas(String cpf) {
        List<Contrato> contratos = repository.findAllByClienteCpf(cpf);

        List<VisualizarDespesasDTO> despesasDTO = new ArrayList<>();

        for (Contrato c : contratos){
            VisualizarDespesasDTO despesaDTO = new VisualizarDespesasDTO(c);
            despesasDTO.add(despesaDTO);
        }

        return despesasDTO;
    }

    public void save(Contrato contrato) {
        this.repository.save(contrato);
    }

}
