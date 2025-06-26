
import { ICreateServico, IUpdateServico } from "../../Interfaces/servico"
import api from "../api"

export async function criarServico(formDataServico: ICreateServico){
    try{
        const resultado = await api.post('/criar/servico', formDataServico)
        return resultado.data
    }catch(error){
        console.error(`Erro ao cadastrar serviço: ${error}`)
        return { success: false, message: `Erro ao cadastrar serviço.` }
    }
}

export async function verServico(id: string) {
    try{
        const resultado = await api.get(`/ver/servico/${id}`)
        return resultado.data
    }catch(error){
        console.error(`Erro ao ver serviço: ${error}`)
        return { success: false, message: `Erro ao ver serviço.` }
    }
}

export async function atualizarServico(id: string, formDataServico: IUpdateServico) {
    try{
        const resultado = await api.put(`/atualizar/servico/${id}`, formDataServico)
        return resultado.data
    }catch(error){
        console.error(`Erro ao atualizar serviço: ${error}`)
        return { success: false, message: `Erro ao atualizar serviço.` }
    }
}

export async function deletarServico(id: string){
    try{
        const resultado = await api.delete(`/deletar/servico/${id}`)
        return resultado.data
    }catch(error){
        console.error(`Erro ao deletar serviço: ${error}`)
        return { success: false, message: `Erro ao deletar serviço.` }
    }
}

export async function listarServicos() {
    try{
        const resultado = await api.get(`/listar/servicos`)
        console.log(resultado)
        return resultado.data
    }catch(error){
        console.error(`Erro ao listar serviços: ${error}`)
        return { success: false, message: `Erro ao listar serviços.` }
    }
}

export async function listarMaisConsumidosGeneroServ(genero: string) {
    try{
        const resultado = await api.post(`/listar/mais/consumidos/genero/servicos`, {genero})
        return resultado.data
    }catch(error){
        console.error(`Erro ao listar mais consumidos gênero: ${error}`)
        return { success: false, message: `Erro ao listar mais consumidos por gênero.` }
    }
}

export async function listarServicosMaisConsumidos
() {
    try{
        const resultado = await api.get(`/listar/mais/consumidos/servicos`)
        return resultado.data
    }catch(error){
        console.error(`Erro ao listar serviços mais consumidos: ${error}`)
        return { success: false, message: `Erro ao listar serviços mais consumidos.` }
    }
}

export async function listarClientesMaisConsumiramValorServ() {
    try{
        const resultado = await api.get(`/listar/clientes/mais/consumiram/valor/servicos`)
        return resultado.data
    }catch(error){
        console.error(`Erro ao listar clientes que mais consumiram por valor : ${error}`)
        return { success: false, message: `Erro ao listar clientes que mais consumiram por valor.` }
    }
}

export async function listarClientesMaisConsumiramQuantidadeServ() {
    try{
        const resultado = await api.get(`/listar/clientes/mais/consumiram/quantidade/servicos`)
        return resultado.data
    }catch(error){
        console.error(`Erro ao listar clientes que mais consumiram por quantidade : ${error}`)
        return { success: false, message: `Erro ao listar clientes que mais consumiram por quantidade.` }
    }
}