import { Request, Response } from "express";
import FuncionarioService from "../../service/Funcionario/funcionarioService";
import { ILoginFuncionario } from "../../Interface/Funcionario/IFuncionario";

class FuncionarioController{
    private funcionarioService : FuncionarioService
    constructor(){
        this.funcionarioService = new FuncionarioService()
    }

    public async logginFuncionario(req:Request, res: Response){
        try{
            const loginData: ILoginFuncionario = req.body
            const resultado = await this.funcionarioService.loginFuncionario(loginData)
            if(!resultado){
                return res.status(400).json({ message: resultado.message })
            }
            return res.status(200).json(resultado)
        }catch(error){
            console.error(`Erro ao realizar login funcionario: ${error}`)
            return res.status(500).json({ message: `Erro interno do servidor.` })
        }
    }
}
export default FuncionarioController