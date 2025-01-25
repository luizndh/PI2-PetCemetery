package com.petcemetery.petcemetery.services;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.petcemetery.petcemetery.DTO.AquisicaoJazigoDTO;
import com.petcemetery.petcemetery.DTO.JazigoDTO;
import com.petcemetery.petcemetery.DTO.JazigoPerfilDTO;
import com.petcemetery.petcemetery.model.Jazigo;
import com.petcemetery.petcemetery.model.Servico.ServicoEnum;
import com.petcemetery.petcemetery.repositorio.JazigoRepository;

@Service
public class JazigoService {

    @Autowired
    private JazigoRepository repository;

    @Autowired
    private ServicoService servicoService;

    @Autowired
    private ClienteService clienteService;

    public Jazigo findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public List<JazigoDTO> getJazigos() {
        List<Jazigo> jazigos = repository.findAllOrderByIdAsc();
        List<JazigoDTO> jazigosDTO = new ArrayList<>();

        for (Jazigo jazigo : jazigos) {
            JazigoDTO jazigoDto;

            if(jazigo.getPetEnterrado() != null) { // Caso tenha pet enterrado
                jazigoDto = new JazigoDTO(
                jazigo.getPetEnterrado().getNomePet(),
                jazigo.getPetEnterrado().getDataEnterro().toLocalDate(),
                jazigo.getEndereco(),
                jazigo.getIdJazigo(),
                jazigo.getPetEnterrado().getDataNascimento(),
                jazigo.getPetEnterrado().getEspecie(),
                jazigo.getMensagem(),
                jazigo.getPlano().toString(),
                jazigo.getProprietario().getCpf()
                );
            } else if(jazigo.getProprietario() != null) { // Caso não tenha pet enterrado mas tenha proprietario
                jazigoDto = new JazigoDTO(
                null,
                null,
                jazigo.getEndereco(),
                jazigo.getIdJazigo(),
                null,
                null,
                jazigo.getMensagem(),
                jazigo.getPlano().toString(),
                jazigo.getProprietario().getCpf()
                );
            } else { // Caso não tenha pet enterrado nem proprietario
                jazigoDto = new JazigoDTO(
                null,
                null,
                jazigo.getEndereco(),
                jazigo.getIdJazigo(),
                null,
                null,
                jazigo.getMensagem(),
                null,
                null
                );
            }

            jazigosDTO.add(jazigoDto);
        }

        return jazigosDTO;
    }

    public byte[] gerarPDFJazigos(List<JazigoDTO> jazigos) {
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            Document document = new Document();
            PdfWriter writer = PdfWriter.getInstance(document, outputStream);
            document.open();

            Paragraph title = new Paragraph("Relatório de Jazigos", FontFactory.getFont(FontFactory.HELVETICA, 30, Font.BOLD));
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            Chunk space = new Chunk("\n");
            document.add(space);

            PdfPTable table = new PdfPTable(8);
            table.setWidthPercentage(100f);
            table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
            Font font = FontFactory.getFont(FontFactory.HELVETICA, 10, Font.NORMAL);

            table.addCell(new PdfPCell(new Phrase("PET", font)));
            table.addCell(new PdfPCell(new Phrase("DATA ENTERRO", font)));
            table.addCell(new PdfPCell(new Phrase("ENDEREÇO", font)));
            table.addCell(new PdfPCell(new Phrase("ID JAZIGO", font)));
            table.addCell(new PdfPCell(new Phrase("DATA NASC.", font)));
            table.addCell(new PdfPCell(new Phrase("ESPÉCIE", font)));
            table.addCell(new PdfPCell(new Phrase("PLANO", font)));
            table.addCell(new PdfPCell(new Phrase("CPF CLIENTE", font)));

            for (JazigoDTO jazigo : jazigos) {
                table.addCell(jazigo.getNomePet());
                if(jazigo.getDataEnterro() == null) {
                    table.addCell("");
                } else {
                    table.addCell(jazigo.getDataEnterro().toString());
                }
                table.addCell(jazigo.getEndereco());
                table.addCell(jazigo.getIdJazigo().toString());
                if(jazigo.getDataNascimento() == null) {
                    table.addCell("");
                } else {
                    table.addCell(jazigo.getDataNascimento().toString());
                }
                table.addCell(jazigo.getEspecie());
                table.addCell(jazigo.getPlano());
                table.addCell(new PdfPCell(new Phrase(jazigo.getCpfCliente(), font)));
            }

            document.add(table);

            document.close();
            writer.close();

            byte[] pdfBytes = outputStream.toByteArray();

            return pdfBytes;
        } catch (Exception e) {
            return null;
        }
    }

    public String getMapaJazigos() {
        String str = "";

        // Busque todos os jazigos do banco de dados e adicione sua disponibilidade à lista.
        for (Jazigo i : repository.findAllOrderByIdAsc()) {
            str = str + String.valueOf(i.getStatus() == Jazigo.StatusEnum.DISPONIVEL) + (i == repository.findAllOrderByIdAsc().get(repository.findAllOrderByIdAsc().size() - 1) ? "" : ";");
        }

        return str;
    }

    public List<JazigoDTO> recuperaJazigosProprietario(String cpf_proprietario) {
        List<Jazigo> listaJazigos = repository.findByProprietarioCpf(cpf_proprietario);

        List<JazigoDTO> listaJazigosDTO = new ArrayList<>();

        for (Jazigo jazigo : listaJazigos) {
            JazigoDTO jazigoDTO;
            if(jazigo.getPetEnterrado() == null) {
                jazigoDTO = new JazigoDTO("", null, jazigo.getEndereco(), jazigo.getIdJazigo(), null, "", jazigo.getMensagem(), jazigo.getPlano().toString(), cpf_proprietario);
            } else {
                jazigoDTO = new JazigoDTO(jazigo.getPetEnterrado().getNomePet(), jazigo.getPetEnterrado().getDataEnterro().toLocalDate(), jazigo.getEndereco(), jazigo.getIdJazigo(), jazigo.getPetEnterrado().getDataNascimento(), jazigo.getPetEnterrado().getEspecie(), jazigo.getMensagem(), jazigo.getPlano().toString(), cpf_proprietario);
            }
            listaJazigosDTO.add(jazigoDTO);
        }

        return listaJazigosDTO;
    }

    public AquisicaoJazigoDTO comprarJazigo(String cpf, Long id, String tipo) {
        Jazigo jazigo = repository.findByIdJazigo(id);
        double valor;

        if(tipo.equals("compra")){
            valor = servicoService.findByTipoServico(ServicoEnum.COMPRA).getValor();
        } else {
            valor = servicoService.findByTipoServico(ServicoEnum.ALUGUEL).getValor();
        }

        return new AquisicaoJazigoDTO(jazigo.getEndereco(), valor);
    }

    public JazigoPerfilDTO exibeMensagemFotoJazigo(String cpf, Long id) {
        Optional<Jazigo> optionalJazigo = repository.findById(id);

        if (optionalJazigo.isPresent()) {
            Jazigo jazigo = optionalJazigo.get();
            if(jazigo.getProprietario().equals(clienteService.findByCpf(cpf))){
                return new JazigoPerfilDTO(jazigo.getMensagem(), jazigo.getFoto(), jazigo.getPlano().toString());
            }
        }

        return null;
    }

}
