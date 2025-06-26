import { ICreateCliente, IUpdateCliente } from "../../Interfaces/cliente"
import { ICreateProduto, IUpdateProduto } from "../../Interfaces/produto"
import api from "../api"

export async function criarProduto(formDataProduto: ICreateProduto){
    try{
        const resultado = await api.post('/criar/produto', formDataProduto)
        return resultado.data
    }catch(error){
        console.error(`Erro ao cadastrar produto: ${error}`)
        return { success: false, message: `Erro ao cadastrar produto.` }
    }
}

export async function verProduto(id: string) {
    try{
        const resultado = await api.get(`/ver/produto/${id}`)
        return resultado.data
    }catch(error){
        console.error(`Erro ao ver produto: ${error}`)
        return { success: false, message: `Erro ao ver produto.` }
    }
}

export async function atualizarProduto(id: string, formDataProduto: IUpdateProduto) {
    try{
        const resultado = await api.put(`/atualizar/produto/${id}`, formDataProduto)
        return resultado.data
    }catch(error){
        console.error(`Erro ao atualizar produto: ${error}`)
        return { success: false, message: `Erro ao atualizar produto.` }
    }
}

export async function deletarProduto(id: string){
    try{
        const resultado = await api.delete(`/deletar/produto/${id}`)
        return resultado.data
    }catch(error){
        console.error(`Erro ao deletar produto: ${error}`)
        return { success: false, message: `Erro ao deletar produto.` }
    }
}

export async function listarProdutos() {
    try{
        const resultado = await api.get(`/listar/produtos`)
        return resultado.data
        
    }catch(error){
        console.error(`Erro ao listar produtos: ${error}`)
        return { success: false, message: `Erro ao listar produtos.` }
    }
}

export async function listarMaisConsumidosGenero(genero: string) {
    try{
        const resultado = await api.post(`/listar/mais/consumidos/genero`, {genero})
        return resultado.data
    }catch(error){
        console.error(`Erro ao listar mais consumidos gênero: ${error}`)
        return { success: false, message: `Erro ao listar mais consumidos por gênero.` }
    }
}

export async function listarProdutosMaisConsumidos() {
    try{
        const resultado = await api.get(`/listar/mais/consumidos`)
        return resultado.data
    }catch(error){
        console.error(`Erro ao listar  produtos mais consumidos: ${error}`)
        return { success: false, message: `Erro ao listar  produtos mais consumidos.` }
    }
}

export async function listarClientesMaisConsumiramValor() {
    try{
        const resultado = await api.get(`/listar/clientes/mais/consumidos/valor`)
        return resultado.data
    }catch(error){
        console.error(`Erro ao listar clientes que mais consumiram por valor : ${error}`)
        return { success: false, message: `Erro ao listar clientes que mais consumiram por valor.` }
    }
}

export async function listarClientesMaisConsumiramQuantidade() {
    try{
        const resultado = await api.get(`/listar/clientes/mais/consumidos/quantidade`)
        return resultado.data
    }catch(error){
        console.error(`Erro ao listar clientes que mais consumiram por quantidade : ${error}`)
        return { success: false, message: `Erro ao listar clientes que mais consumiram por quantidade.` }
    }
}