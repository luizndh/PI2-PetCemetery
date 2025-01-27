package com.petcemetery.petcemetery.services;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
import com.petcemetery.petcemetery.DTO.CarrinhoDTO;
import com.petcemetery.petcemetery.DTO.DetalharJazigoDTO;
import com.petcemetery.petcemetery.DTO.JazigoDTO;
import com.petcemetery.petcemetery.DTO.JazigoPerfilDTO;
import com.petcemetery.petcemetery.model.Cliente;
import com.petcemetery.petcemetery.model.Contrato;
import com.petcemetery.petcemetery.model.Jazigo;
import com.petcemetery.petcemetery.model.Pagamento;
import com.petcemetery.petcemetery.model.Jazigo.StatusEnum;
import com.petcemetery.petcemetery.model.Pet;
import com.petcemetery.petcemetery.model.Servico;
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

    @Autowired
    private ContratoService contratoService;

    @Autowired
    private PetService petService;

    @Autowired
    private PagamentoService pagamentoService;

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
            table.addCell(new PdfPCell(new Phrase("endereco", font)));
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
        System.out.println(listaJazigos);
        System.out.println(listaJazigos.size());

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

    public boolean editarMensagemFotoJazigo(String cpf, Long id, String mensagem) {
    Optional<Jazigo> optionalJazigo = repository.findById(id);

    if (optionalJazigo.isPresent()) {
        Jazigo jazigo = optionalJazigo.get();

        double valor = servicoService.findByTipoServico(ServicoEnum.PERSONALIZACAO).getValor();

        if (jazigo.getProprietario().equals(clienteService.findByCpf(cpf))) {
            jazigo.setMensagem(mensagem);
            repository.save(jazigo);

            Contrato personalizacaoServico = new Contrato(valor, clienteService.findByCpf(cpf), jazigo, null, LocalDateTime.now(), null, null, new Servico(ServicoEnum.PERSONALIZACAO, valor));
            contratoService.save(personalizacaoServico);

            return true;
        } else {
            throw new IllegalArgumentException("Jazigo não pertence ao cliente");
        }
    } else {
        throw new NoSuchElementException("Jazigo não encontrado");
    }
    }

    public boolean agendarEnterro(String cpf, Long id, String data, String hora, String nomePet, String especie,
            String dataNascimento) {

        Optional<Jazigo> jazigoOpt = repository.findById(id);
        if(!jazigoOpt.isPresent()) throw new NoSuchElementException("Esse jazigo não existe");

        Jazigo jazigo = jazigoOpt.get();

        if(jazigo.getStatus() == StatusEnum.OCUPADO) {
            throw new IllegalArgumentException("Jazigo selecionado já ocupado");
        }

        double valor = servicoService.findByTipoServico(ServicoEnum.ENTERRO).getValor();

        jazigo.setStatus(StatusEnum.OCUPADO);

        Pet pet = new Pet(nomePet, LocalDateTime.parse(data + "T" + hora), LocalDate.parse(dataNascimento), especie, clienteService.findByCpf(cpf));
        petService.save(pet); //! o pet é setado no banco mesmo q o kra nao pague o enterro e n prossiga c nada, vao ter pets setados sem estar no cemiterio

        Contrato enterroServico = new Contrato(valor, clienteService.findByCpf(cpf), jazigo, pet, LocalDateTime.parse(data + "T" + hora), new Servico(ServicoEnum.ENTERRO, valor));
        contratoService.save(enterroServico);

        return true;
    }

    public boolean agendarExumacao(String cpf, Long id, String data, String hora) {
        Optional<Jazigo> jazigoOpt = repository.findById(id);
        if(!jazigoOpt.isPresent()) throw new NoSuchElementException("Esse jazigo não existe");
        Jazigo jazigo = jazigoOpt.get();

        Pet pet = jazigo.getPetEnterrado();

        double valor = servicoService.findByTipoServico(ServicoEnum.EXUMACAO).getValor();

        pet.setDataExumacao(LocalDateTime.parse(data + "T" + hora));
        petService.save(pet);

        Contrato exumacao = new Contrato(valor, clienteService.findByCpf(cpf), jazigo, pet, LocalDateTime.parse(data + "T" + hora), new Servico(ServicoEnum.EXUMACAO, valor));
        contratoService.save(exumacao);

        return true;
    }

    public Jazigo detalharJazigo(Long id) {
        return repository.findByIdJazigo(id);
    }

    public boolean agendarManutencao(String cpf, Long id, String data) {
        Jazigo jazigo = repository.findByIdJazigo(id);
        double valor = servicoService.findByTipoServico(ServicoEnum.MANUTENCAO).getValor();

        Contrato manutencaoServico = new Contrato(valor, clienteService.findByCpf(cpf), jazigo, jazigo.getPetEnterrado(), LocalDateTime.parse(data + "T00:00:00"), new Servico(ServicoEnum.MANUTENCAO, valor));
        contratoService.save(manutencaoServico);

        return true;
    }

    public boolean trocarPlano(String cpf, Long id, String tipo) {
        Optional<Jazigo> optionalJazigo = repository.findById(id);

        if(!optionalJazigo.isPresent()){
            throw new NoSuchElementException("Jazigo não encontrado");
        } else {
            Jazigo jazigo = optionalJazigo.get();

            Servico plano = this.servicoService.findByTipoServico(ServicoEnum.valueOf(tipo));

            Contrato contratos = new Contrato(0, clienteService.findByCpf(cpf), jazigo, null, LocalDateTime.now(), plano); // O valor do servico é 0 pois será somado com o valor do plano selecionado no construtor do Serviço
            contratoService.save(contratos);
            return true;
        }
    }

    public boolean finalizarCompra(String cpf, List<CarrinhoDTO> carrinho) {

        for(int i = 0; i < carrinho.size(); i++) {
            Jazigo jazigo = repository.findByIdJazigo(Long.valueOf(carrinho.get(i).getJazigoId()));
            if(jazigo == null) throw new NoSuchElementException("Jazigo não encontrado");
            Cliente cliente = this.clienteService.findByCpf(cpf);
            ServicoEnum servico = ServicoEnum.valueOf(carrinho.get(i).getTipo().toUpperCase());
            Pet pet = null;
            if(jazigo.getPetEnterrado() != null) pet = jazigo.getPetEnterrado();

            Contrato contrato = new Contrato(carrinho.get(i).getValor(), clienteService.findByCpf(cpf), jazigo, pet, LocalDateTime.now(), this.servicoService.findByTipoServico(servico));
            contratoService.save(contrato);

            if(contrato.getServico().getTipoServico().equals(ServicoEnum.COMPRA) || contrato.getServico().getTipoServico().equals(ServicoEnum.ALUGUEL)) {
                jazigo.setProprietario(cliente);
                jazigo.setPlano(ServicoEnum.valueOf(carrinho.get(i).getSelectedOrnament().toUpperCase()));
                jazigo.setStatus(StatusEnum.OCUPADO);
                repository.save(jazigo);
            }

            LocalDate dataVencimento = null;

            if(contrato.getServico().getTipoServico().equals(ServicoEnum.ALUGUEL)) {
                dataVencimento = LocalDate.now().plusMonths(1);
            }

            Pagamento pagamento = new Pagamento(cliente, carrinho.get(i).getValor(), LocalDate.now(), dataVencimento, true, contrato, null);
            pagamentoService.save(pagamento);
        }

        return true;
    }
}
