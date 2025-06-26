import { ICreateVenda } from "../../Interfaces/venda"
import api from "../api"

export async function registraVenda(formDataVenda: ICreateVenda ){
    try{
        const resultado = await api.post('/registra/venda', formDataVenda)
        if(!resultado.data.success){
            throw new Error(resultado.data.message)
        }
        return resultado.data
    }catch(error){
        console.error(`Erro ao cadastrar serviço: ${error}`)
        return { success: false, message: `Erro ao cadastrar serviço.` }
    }
}