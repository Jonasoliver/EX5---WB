import { ILoginFuncionario } from "../../Interfaces/funcionario"
import api from "../api"

export async function loginFuncionario(formDataLogin: ILoginFuncionario){
    try{
        const resultado = await api.post('/login/funcionario', formDataLogin)
        return resultado.data
    }catch(error: any){
        console.error(`Erro ao realizar login: ${error.message}`)
        return { success: false, message: `Erro ao cadastrar produto.` }
    }
}