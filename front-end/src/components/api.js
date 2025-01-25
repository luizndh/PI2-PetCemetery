import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const apiCall = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const loginPost = async (email, senha) => {
    console.log("entrou no loginPost");
    try {
        const response = await apiCall.post('/api/login', { email, senha });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const cadastroPost = async (email, senha, senharepeat, nome, cpf, telefone, rua, numero, complemento, cep) => {
    console.log("entrou no cadastroPost");
    try {
        const response = await apiCall.post('/api/cadastro', { email, senha, senharepeat, nome, cpf, telefone, rua, numero, complemento, cep });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getGravesOccupationStatus = async (cpf) => {
    console.log("entrou no getGravesOccupationStatus");
    try {
        const response = await apiCall.get(`/api/${cpf}/jazigos_disponiveis`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getExibirPerfil = async (cpf) => {
    console.log("entrou no getExibirPerfil");
    try {
        const response = await apiCall.get(`/api/cliente/${cpf}/exibir-perfil`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getAlterarPerfil = async (cpf) => {
    console.log("entrou no getAlterarPerfil");
    try {
        const response = await apiCall.get(`/api/cliente/${cpf}/get-alterar-perfil`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const desativarPerfilPost = async (cpf) => {
    console.log("entrou no DesativarPerfilPost");
    try {
        const response = await apiCall.post(`/api/cliente/${cpf}/desativar-perfil`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const editarPerfilPost = async (nome, email, telefone, rua, numero, complemento, cep, senha, senharepeat, cpf) => {
    console.log("entrou no ExibirPerfilPost");
    try {
        const response = await apiCall.post(`/api/cliente/${cpf}/editar-perfil`, { nome, email, telefone, rua, numero, complemento, cep, senha, senharepeat, cpf });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getMeusJazigos = async (cpf_proprietario) => {
    console.log("entrou no getMeusJazigos");
    try {
        const response = await apiCall.get(`/api/${cpf_proprietario}/meus_jazigos`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getCompraJazigo = async (cpf, id_jazigo, tipo) => {
    console.log("entrou no getCompraJazigo");
    try {
        const response = await apiCall.get(`/api/${cpf}/adquirir_jazigo/${id_jazigo}?tipo=${tipo}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getCompraJazigoPlanos = async (cpf, id_jazigo) => {
    console.log("entrou no getCompraJazigoPlanos");
    try {
        const response = await apiCall.get(`/api/${cpf}/adquirir_jazigo/${id_jazigo}/listar_planos`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const compraJazigoPlanosPost = async (cpf, id_jazigo, plano_selecionado) => {
    console.log("entrou no CompraJazigoPlanoPost");
    try {
        const response = await apiCall.post(`/api/${cpf}/adquirir_jazigo/${id_jazigo}/listar_planos/${plano_selecionado}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getInformacoesCarrinho = async (cpf) => {
    console.log("entrou no getInformacoesCarrinho");
    try {
        const response = await apiCall.get(`/api/${cpf}/informacoes_carrinho`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const removerItemCarrinho = async (cpf, idJazigo) => {
    console.log("entrou no removerItemCarrinho");
    try {
        const response = await apiCall.post(`/api/${cpf}/informacoes_carrinho/remover_servico?idJazigo=${idJazigo}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const realizarPagamentoPost = async (cpf, id_jazigo) => {
    console.log("entrou no postRealizarPagamento");
    try {
        const response = await apiCall.post(`/api/${cpf}/adquirir_jazigo/${id_jazigo}/informacoes_carrinho/finalizar`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const agendarReuniao = async (cpf, data, horario, assunto) => {
    console.log("entrou no agendarReuniao");
    try {
        const reuniao = { data, horario, assunto }; // construa o objeto Reuniao
        const response = await apiCall.post(`/api/reuniao/cliente/${cpf}/agendar`, reuniao);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const agendarEnterro = async (cpf, id, data, horario, nomePet, especie, dataNascimento) => {
    console.log("entrou no agendarEnterro");
    console.log(cpf, id, data, horario, nomePet, especie, dataNascimento);
    try {
        const response = await apiCall.post(`/api/${cpf}/meus_jazigos/${id}/agendar_enterro?data=${data}&hora=${horario}&nomePet=${nomePet}&especie=${especie}&dataNascimento=${dataNascimento}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const visualizarReuniao = async () => {
    try {
        const response = await apiCall.get('/api/reuniao/admin/visualizar');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const finalizarCompraCarrinho = async (cpf, conteudoCarrinho) => {
    console.log("entrou no finalizarCompra");
    try {
        const response = await apiCall.post(`/api/${cpf}/informacoes_carrinho/finalizar`, conteudoCarrinho);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const agendarExumacao = async (cpf, id, dataExumacao, horaExumacao) => {
    try {
        console.log("id do jazigo: " + id);
        const response = await apiCall.post(`/api/${cpf}/meus_jazigos/${id}/agendar_exumacao?data=${dataExumacao}&hora=${horaExumacao}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao agendar exumação:', error);
        return null;
    }
};

export const getDetalhesJazigo = async (cpf_proprietario, idJazigo) => {
    console.log("entrou no getDetalhesJazigo");
    try {
        const response = await apiCall.get(`/api/${cpf_proprietario}/meus_jazigos/${idJazigo}/detalhar_jazigo`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const exibirServicos = async () => {
    try {
        const response = await apiCall.get(`/api/admin/servicos`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

//Altera valor de um servico
//Passar um JSON no body com nome do servico e valor novo
export const alterarValorServico = async (servico, valor) => {
    try {
        console.log("entrou no alterarValorServico");
        console.log("Servico: " + servico + " Valor: " + valor);
        const response = await apiCall.post(`/api/admin/servicos/alterar?servico=${servico}&valor=${valor}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

//Adiciona item ao carrinho
export const addItemCarrinho = async (cpf, id, plano_selecionado, tipo) => {
    await apiCall.post(`/api/${cpf}/adquirir_jazigo/${id}/listar_planos/plano?planoSelecionado=${plano_selecionado}&tipo=${tipo}`).then((response) => {
        console.log(response);
        return response.data;
    }).catch((error) => {
        console.log(error);
    });
};

export const personalizarJazigo = async (cpf, id, mensagem) => {
    try {
        const response = await apiCall.post(`/api/${cpf}/informacoes_jazigo/${id}/editar_jazigo`, mensagem);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const relatorioInadimplente = async () => {
    try {
        const response = await apiCall.get('/api/admin/relatorio');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const visualizarDespesas = async (cpf) => {
    try {
        const response = await apiCall.get(`/api/cliente/${cpf}/visualizar_despesas`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar despesas:', error);
        return null;
    }
};

export const getEnterros = async () => {
    try {
        const response = await apiCall.get('/api/admin/visualizar_enterros');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getExumacoes = async () => {
    try {
        const response = await apiCall.get('/api/admin/visualizar_exumacoes');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getJazigos = async () => {
    try {
        const response = await apiCall.get('/api/admin/get_jazigos');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getInfoPersonalizacao = async (cpf, id) => {
    try {
        const response = await apiCall.get(`/api/${cpf}/informacoes_jazigo/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getHorarios = async () => {
    console.log("entrou no getHorarios");
    try {
        const response = await apiCall.get(`/api/admin/horarios`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const alterarHorarios = async (data) => {
    console.log("entrou no alterarHorarios");
    try {
        const response = await apiCall.post(`/api/admin/alterar_horario_funcionamento`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const adicionarLembrete = async (cpf, data) => {
    console.log("entrou no adicionarLembrete");
    try {
        const response = await apiCall.post(`/api/cliente/${cpf}/adicionar-lembrete?data=${data}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const visualizarHistorico = async (id) => {
    console.log("entrou no visualizarHistorico");
    try {
        const response = await apiCall.get(`/api/admin/${id}/visualizar-historico`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const gerarPDFenterros = async () => {
    try {
        await apiCall.get('/api/admin/gerar_pdf_enterros', { responseType: 'blob' })
        .then(response => {
            // Fazendo o download automático do arquivo PDF ao clicar no botão "Gerar PDF"
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'relatorio_enterros.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          });
    } catch (error) {
        console.log(error);
    }
}

export const gerarPDFexumacoes = async () => {
    try {
        await apiCall.get('/api/admin/gerar_pdf_exumacoes', { responseType: 'blob' })
        .then(response => {
            // Fazendo o download automático do arquivo PDF ao clicar no botão "Gerar PDF"
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'relatorio_exumacoes.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            });
    } catch (error) {
        console.log(error);
    }
}

export const gerarPDFjazigos = async () => {
    try {
        await apiCall.get('/api/admin/gerar_pdf_jazigos', { responseType: 'blob' })
        .then(response => {
            // Fazendo o download automático do arquivo PDF ao clicar no botão "Gerar PDF"
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'relatorio_jazigos.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            });
    } catch (error) {
        console.log(error);
    }
}

export const alterarPlano = async (cpf, id, plano) => {
    try {
        const response = await apiCall.post(`/api/${cpf}/meus_jazigos/${id}/trocar_plano?tipo=${plano}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const alterarDataAtual = async (data) => {
    try {
        const response = await apiCall.post(`/api/admin/time_travel?data=${data}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}