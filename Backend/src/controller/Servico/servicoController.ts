import { Request, Response } from "express";
import ServicoService from "../../service/Servico/servicoService";
import { ICreateServico, IUpdateServico } from "../../Interface/Servico/IServico";

class ServicoController{
    private servicoService : ServicoService

    constructor(){
        this.servicoService = new ServicoService()
    }

    public async criarServico(req:Request, res: Response){
        try{
            const servicoData: ICreateServico = req.body
            const resultado = await this.servicoService.criarServico(servicoData)
            if(!resultado.success){
                return res.status(400).json({ message: resultado.message })
            }
            return res.status(201).json(resultado)
        }catch(error){
            console.error(`Erro ao criar um serviço: ${error}`)
            return res.status(500).json({ message: `Erro interno do servidor.`})
        }
    }

    public async verServico(req:Request, res: Response){
        try{
            const id = req.params.id
            const resultado = await this.servicoService.verServico(parseInt(id))
            if(!resultado.success){
                return res.status(400).json({ message: resultado.message })
            }
            return res.status(200).json(resultado)
        }catch(error){
            console.error(`Erro ao ver um serviço: ${error}`)
            return res.status(500).json({ message: `Erro interno do servidor.`})
        }
    }

    public async atualizarServico(req:Request, res: Response){
        try{
            const id = req.params.id
            const servicoData: IUpdateServico = req.body
            const resultado = await this.servicoService.atualizaServico(parseInt(id), servicoData)
            if(!resultado.success){
                return res.status(400).json({ message: resultado.message })
            }
            return res.status(200).json(resultado)
        }catch(error){
            console.error(`Erro ao atualizar um serviço: ${error}`)
            return res.status(500).json({ message: `Erro interno do servidor.`})
        }
    }

    public async deletarServico(req:Request, res: Response){
        try{
            const id = req.params.id
            const resultado = await this.servicoService.deletarServico(parseInt(id))
            if(!resultado.success){
                return res.status(400).json({ message: resultado.message })
            }
            return res.status(200).json(resultado)
        }catch(error){
            console.error(`Erro ao desativar um serviço: ${error}`)
            return res.status(500).json({ message: `Erro interno do servidor.`})
        }
    }

    public async listarServicos(req:Request, res: Response){
        try{
            const resultado = await this.servicoService.listarServico()
            if(!resultado.success){
                return res.status(400).json({ message: resultado.message })
            }
            return res.status(200).json(resultado)
        }catch(error){
            console.error(`Erro ao listar serviços: ${error}`)
            return res.status(500).json({ message: `Erro interno do servidor.`})
        }
    }

    public async listarMaisConsumidosGenero(req:Request, res: Response){
        try{
            const genero: string = req.body.genero
            const resultado = await this.servicoService.listarMaisConsumidosGenero(genero)
            if(!resultado.success){
                return res.status(400).json({ message: resultado.message })
            }
            return res.status(200).json(resultado)
        }catch(error){
            console.error(`Erro ao listar serviços mais consumidos por gênero: ${error}`)
            return res.status(500).json({ message: `Erro interno do servidor.`})
        }
    }

    public async listarMaisConsumidos(req:Request, res: Response){
        try{
            const resultado = await this.servicoService.listarMaisConsumidos()
            if(!resultado.success){
                return res.status(400).json({ message: resultado.message })
            }
            return res.status(200).json(resultado)
        }catch(error){
            console.error(`Erro ao listar serviços mais consumidos: ${error}`)
            return res.status(500).json({ message: `Erro interno do servidor.`})
        }
    }

    public async listarClientesMaisConsumiramValor(req:Request, res: Response){
        try{
            const resultado = await this.servicoService.listarClientesMaisConsumiramValor()
            if(!resultado.success){
                return res.status(400).json({ message: resultado.message })
            }
            return res.status(200).json(resultado)
        }catch(error){
            console.error(`Erro ao listar clientes que mais consumiram em valor: ${error}`)
            return res.status(500).json({ message: `Erro interno do servidor.`})
        }
    }

    public async listarClientesMaisCondumiramQuantidade(req:Request, res: Response){
        try{
            const resultado = await this.servicoService.listarClientesMaisConsumiramQuantidade()
            if(!resultado.success){
                return res.status(400).json({ message: resultado.message })
            }
            return res.status(200).json(resultado)
        }catch(error){
            console.error(`Erro ao listar clientes que mais consumiram em quantidade: ${error}`)
            return res.status(500).json({ message: `Erro interno do servidor.`})
        }
    }
}
export default ServicoController