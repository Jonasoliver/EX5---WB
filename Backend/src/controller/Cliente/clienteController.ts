import { Request, Response } from "express";
import ClienteService from "../../service/Cliente/clienteService";
import { ICreateCliente, IUpdateCliente } from "../../Interface/Cliente/ICliente";

class ClienteController{
    private clienteService : ClienteService

    constructor(){
        this.clienteService = new ClienteService()
    }

    public async criarCliente(req: Request, res: Response){
        try{
            const clienteData: ICreateCliente = req.body
            const resultado = await this.clienteService.criarCliente(clienteData)
            if(!resultado.success){
                return res.status(400).json({ message: resultado.message })
            }
            return res.status(201).json(resultado)
        }catch(error){
            console.error(`Erro ao cadastrar cliente: ${error}`)
            return res.status(500).json({ message: `Erro interno do servidor.` })
        }
    }

    public async atualizarCliente(req: Request, res: Response){
        try{
            const id = req.params.id
            const clienteUpdateData: IUpdateCliente = req.body
            const resultado = await this.clienteService.atualizaCliente(parseInt(id), clienteUpdateData)
            if(!resultado.success){
                return res.status(404).json({ message: resultado.message })
            }
            return res.status(200).json(resultado)
        }catch(error){
            console.error(`Erro ao atualizar cliente: ${error}`)
            return res.status(500).json({ message: `Erro interno do servidor.` })
        }
    }

    public async verCliente(req: Request, res: Response){
        try{
            const id = req.params.id
            const resultado = await this.clienteService.verCliente(parseInt(id))
            
            if(!resultado.success){
                return res.status(404).json({ message: resultado.message })
            }
            return res.status(200).json(resultado)
        }catch(error){
            console.error(`Erro ao ver cliente: ${error}`)
            return res.status(500).json({ message: `Erro interno do servidor.` })
        }
    }

    public async deletarCliente(req: Request, res: Response){
        try{
            const id = req.params.id
            const resultado = await this.clienteService.deletarCliente(parseInt(id))
            if(!resultado.success){
                return res.status(404).json({ message: resultado.message })
            }
            return res.status(200).json(resultado)
        }catch(error){
            console.error(`Erro ao deletar cliente: ${error}`)
            return res.status(500).json({ message: `Erro interno do servidor.` })
        }
    }

    public async listarClientes(req: Request, res: Response){
        try{
            const resultado = await this.clienteService.listarClientes()
            if(!resultado.success){
                return res.status(404).json({ message: resultado.message })
            }
            return res.status(200).json(resultado)
        }catch(error){
            console.error(`Erro ao listar clientes: ${error}`)
            return res.status(500).json({ message: `Erro interno do servidor.` })
        }
    }

    public async listarClientesGenero(req: Request, res: Response){
        try{
            const genero = req.body.genero
            const resultado = await this.clienteService.listarClientesGenero(genero)
            if(!resultado.success){
                return res.status(404).json({ message: resultado.message })
            }
            return res.status(200).json(resultado)
        }catch(error){
            console.error(`Erro ao listar clientes por gênero: ${error}`)
            return res.status(500).json({ message: `Erro interno do servidor.` })
        }
    }
}
export default ClienteController
