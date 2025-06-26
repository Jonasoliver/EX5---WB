import { ICreateCliente, IUpdateCliente } from "../../Interfaces/cliente"
import api from "../api"

export async function criarCliente(formData: ICreateCliente){
    try{
        const resultado = await api.post('/criar/cliente', formData)
        console.log(formData)
        return resultado.data
    }catch(error){
        console.error(`Erro ao cadastrar cliente: ${error}`)
        return { success: false, message: `Erro ao cadastrar cliente.` }
    }
}

export async function verCliente(id: string) {
    try{
        const resultado = await api.get(`/ver/cliente/${id}`)
        return resultado.data
    }catch(error){
        console.error(`Erro ao ver cliente: ${error}`)
        return { success: false, message: `Erro ao ver cliente.` }
    }
}

export async function atualizarCliente(id: string, formDataCliente: IUpdateCliente) {
    try{
        const resultado = await api.put(`/atualizar/cliente/${id}`, formDataCliente)
        return resultado.data
    }catch(error){
        console.error(`Erro ao atualizar cliente: ${error}`)
        return { success: false, message: `Erro ao atualizar cliente.` }
    }
}

export async function deletarCliente(id: string){
    try{
        const resultado = await api.delete(`/deletar/cliente/${id}`)
        return resultado.data
    }catch(error){
        console.error(`Erro ao deletar cliente: ${error}`)
        return { success: false, message: `Erro ao deletar cliente.` }
    }
}

export async function listarClientes() {
    try{
        const resultado = await api.get(`/listar/clientes`)
        return resultado.data
    }catch(error){
        console.error(`Erro ao listar cliente: ${error}`)
        return { success: false, message: `Erro ao listar cliente.` }
    }
}

export async function listarClientesGenero(genero: string) {
    try{
        const resultado = await api.post(`/listar/clientes/genero`, {genero})
        return resultado.data
    }catch(error){
        console.error(`Erro ao listar cliente gênero: ${error}`)
        return { success: false, message: `Erro ao listar cliente.` }
    }
}