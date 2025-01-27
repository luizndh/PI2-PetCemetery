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
        return error.response.data.mensagem;
    }
};

export const cadastroPost = async (email, senha, senharepeat, nome, cpf, telefone, rua, numero, complemento, cep) => {
    console.log("entrou no cadastroPost");
    try {
        const response = await apiCall.post('/api/cadastro', { email, senha, senharepeat, nome, cpf, telefone, rua, numero, complemento, cep });
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data.mensagem;
    }
};

export const getGravesOccupationStatus = async () => {
    console.log("entrou no getGravesOccupationStatus");
    try {
        const response = await apiCall.get(`/api/mapa-jazigos`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data.mensagem;
    }
};

export const getExibirPerfil = async (cpf) => {
    console.log("entrou no getExibirPerfil");
    try {
        const response = await apiCall.get(`/api/cliente/${cpf}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data.mensagem;
    }
};

export const getAlterarPerfil = async (cpf) => {
    console.log("entrou no getAlterarPerfil");
    try {
        const response = await apiCall.get(`/api/cliente/${cpf}/alterar`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data.mensagem;
    }
};

export const desativarPerfilPost = async (cpf) => {
    console.log("entrou no DesativarPerfilPost");
    try {
        const response = await apiCall.post(`/api/cliente/${cpf}/desativar`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data.mensagem;
    }
};

export const editarPerfilPost = async (nome, email, telefone, rua, numero, complemento, cep, senha, senharepeat, cpf) => {
    console.log("entrou no ExibirPerfilPost");
    try {
        const response = await apiCall.put(`/api/cliente/${cpf}`, { nome, email, telefone, rua, numero, complemento, cep, senha, senharepeat, cpf });
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data.mensagem;
    }
};

export const getMeusJazigos = async (cpf_proprietario) => {
    console.log("entrou no getMeusJazigos");
    try {
        const response = await apiCall.get(`/api/${cpf_proprietario}/jazigos`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data.mensagem;
    }
};

export const getCompraJazigo = async (cpf, id_jazigo, tipo) => {
    console.log("entrou no getCompraJazigo");
    try {
        const response = await apiCall.get(`/api/${cpf}/jazigo/${id_jazigo}?tipo=${tipo}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data.mensagem;
    }
};

export const getCompraJazigoPlanos = async (cpf, id_jazigo) => {
    console.log("entrou no getCompraJazigoPlanos");
    try {
        const response = await apiCall.get(`/api/${cpf}/jazigo/${id_jazigo}/planos`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data.mensagem;
    }
};

//TODO: METODO EXCLUIDO NO BACK
export const compraJazigoPlanosPost = async (cpf, id_jazigo, plano_selecionado) => {
    console.log("entrou no CompraJazigoPlanoPost");
    try {
        const response = await apiCall.post(`/api/${cpf}/jazigo/${id_jazigo}/planos/${plano_selecionado}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data.mensagem;
    }
};

export const agendarReuniao = async (cpf, assunto, data) => {
    console.log("entrou no agendarReuniao");
    try {
        const reuniao = { assunto, data }; // construa o objeto Reuniao
        const response = await apiCall.post(`/api/reuniao/cliente/${cpf}/agendar`, reuniao);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data.mensagem;
    }
};

export const agendarEnterro = async (cpf, id, data, horario, nomePet, especie, dataNascimento) => {
    console.log("entrou no agendarEnterro");
    console.log(cpf, id, data, horario, nomePet, especie, dataNascimento);
    try {
        const response = await apiCall.post(`/api/${cpf}/informacao-jazigo/${id}/enterro?data=${data}&hora=${horario}&nomePet=${nomePet}&especie=${especie}&dataNascimento=${dataNascimento}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data.mensagem;
    }
};

export const visualizarReuniao = async () => {
    try {
        const response = await apiCall.get('/api/reuniao/admin/visualizar');
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data.mensagem;
    }
};

//TODO: CARRINHO NAO EXISTE MAIS NO BACK
export const finalizarCompraCarrinho = async (cpf, conteudoCarrinho) => {
    console.log("entrou no finalizarCompra");
    try {
        const response = await apiCall.post(`/api/${cpf}/finalizar-compra`, conteudoCarrinho);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data.mensagem;
    }
};

export const agendarExumacao = async (cpf, id, dataExumacao, horaExumacao) => {
    try {
        console.log("id do jazigo: " + id);
        const response = await apiCall.post(`/api/${cpf}/informacao-jazigo/${id}/exumacao?data=${dataExumacao}&hora=${horaExumacao}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao agendar exumação:', error);
        return null;
    }
};

export const getDetalhesJazigo = async (cpf_proprietario, idJazigo) => {
    console.log("entrou no getDetalhesJazigo");
    try {
        const response = await apiCall.get(`/api/${cpf_proprietario}/informacao-jazigo/${idJazigo}/detalhe`);
        return response.data;
    } catch (error) {
        return error.response.data.mensagem;
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
        const response = await apiCall.put(`/api/admin/servico/${servico}?valor=${valor}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

//TODO: NAO EXISTE MAIS CARRINHO
//Adiciona item ao carrinho
export const addItemCarrinho = async (cpf, id, plano_selecionado, tipo) => {
    await apiCall.post(`/api/${cpf}/adquirir_jazigo/${id}/listar_planos/plano?planoSelecionado=${plano_selecionado}&tipo=${tipo}`).then((response) => {
        console.log(response);
        return response.data;
    }).catch((error) => {
        console.log(error);
        return error.response.data.mensagem;
    });
};

export const personalizarJazigo = async (cpf, id, mensagem) => {
    try {
        const response = await apiCall.put(`/api/${cpf}/informacao-jazigo/${id}`, mensagem);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data.mensagem;
    }
};

export const relatorioInadimplente = async () => {
    try {
        const response = await apiCall.get('/api/admin/inadimplentes');
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data.mensagem;
    }
};
export const visualizarDespesas = async (cpf) => {
    try {
        const response = await apiCall.get(`/api/cliente/${cpf}/despesas`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar despesas:', error);
        return null;
    }
};

export const getEnterros = async () => {
    try {
        const response = await apiCall.get('/api/admin/enterros');
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data.mensagem;
    }
};

export const getExumacoes = async () => {
    try {
        const response = await apiCall.get('/api/admin/exumacoes');
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data.mensagem;
    }
};

export const getJazigos = async () => {
    try {
        const response = await apiCall.get('/api/admin/jazigos');
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data.mensagem;
    }
};

export const getInfoPersonalizacao = async (cpf, id) => {
    try {
        const response = await apiCall.get(`/api/${cpf}/informacao-jazigo/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data.mensagem;
    }
};

export const getHorarios = async () => {
    console.log("entrou no getHorarios");
    try {
        const response = await apiCall.get(`/api/admin/horarios`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data.mensagem;
    }
};

export const alterarHorarios = async (data) => {
    console.log("entrou no alterarHorarios");
    try {
        const response = await apiCall.put(`/api/admin/horarios`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data.mensagem;
    }
};

export const adicionarLembrete = async (cpf, data) => {
    console.log("entrou no adicionarLembrete");
    try {
        const response = await apiCall.post(`/api/cliente/${cpf}/lembrete?data=${data}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data.mensagem;
    }
};

export const visualizarHistorico = async (id) => {
    console.log("entrou no visualizarHistorico");
    try {
        const response = await apiCall.get(`/api/admin/${id}/historico`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data.mensagem;
    }
};

export const gerarPDFenterros = async () => {
    try {
        await apiCall.get('/api/admin/enterros/pdf', { responseType: 'blob' })
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
        return error.response.data.mensagem;
    }
}

export const gerarPDFexumacoes = async () => {
    try {
        await apiCall.get('/api/admin/exumacoes/pdf', { responseType: 'blob' })
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
        return error.response.data.mensagem;
    }
}

export const gerarPDFjazigos = async () => {
    try {
        await apiCall.get('/api/admin/jazigos/pdf', { responseType: 'blob' })
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
        return error.response.data.mensagem;
    }
}

export const alterarPlano = async (cpf, id, plano) => {
    try {
        const response = await apiCall.put(`/api/${cpf}/informacao-jazigo/${id}/plano?tipo=${plano}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data.mensagem;
    }
}

export const alterarDataAtual = async (data) => {
    try {
        const response = await apiCall.post(`/api/admin/time-travel?data=${data}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data.mensagem;
    }
}

export const getValorServico = async (cpf, id, servico) => {
    try {
        const response = await apiCall.get(`/api/${cpf}/informacao-jazigo/${id}/servico/${servico}`);
        return response.data;

    } catch (error) {
        console.log(error);
        return error.response.data.mensagem;
    }
}