import { Request, Response } from "express"
import ProdutoService from "../../service/Produto/produtoService"
import { ICreateProduto, IUpdateProduto } from "../../Interface/Produto/IProduto"

class ProdutoController{
    private produtoService: ProdutoService
    constructor(){
        this.produtoService = new ProdutoService() 
    }

    public async createProduto(req: Request, res: Response){
        try{
            const produtoData: ICreateProduto = req.body
            const resultado = await this.produtoService.criarProduto(produtoData)
            if(!resultado.success){
                return res.status(404).json({ message: resultado.message })
            }
            return res.status(201).json(resultado)
        }catch(error){
            console.error(`Erro ao cadastrar produto: ${error}`)
            return res.status(500).json({ message: `Erro interno do servidor` })
        }
    }

    public async verProduto(req: Request, res: Response){
        try{
            const id = req.params.id
            const resultado = await this.produtoService.verProduto(parseInt(id))
            if(!resultado.success){
                return res.status(404).json({ message: resultado.message })
            }
            return res.status(200).json(resultado)
        }catch(error){
            console.error(`Erro ao visualizar produto: ${error}`)
            return res.status(500).json({ message: `Erro interno do servidor` })
        }
    }

    public async atualizarProduto(req: Request, res: Response){
        try{
            const id = req.params.id
            const produtoUpdateData: IUpdateProduto = req.body
            const resultado = await this.produtoService.atualizarProduto(parseInt(id), produtoUpdateData)
            if(!resultado.success){
                return res.status(404).json({ message: resultado.message })
            }
            return res.status(200).json(resultado)
        }catch(error){
            console.error(`Erro ao atualizar produto: ${error}`)
            return res.status(500).json({ message: `Erro interno do servidor` })
        }
    }

    public async deletaProduto(req: Request, res: Response){
        try{
            const id = req.params.id
            const resultado = await this.produtoService.deletaProduto(parseInt(id))
            if(!resultado.success){
                return res.status(404).json({ message: resultado.message })
            }
            return res.status(200).json(resultado)
        }catch(error){
            console.error(`Erro ao deletar produto: ${error}`)
            return res.status(500).json({ message: `Erro interno do servidor` })
        }
    }

    public async listarProdutos(req: Request, res: Response){
        try{
            const resultado = await this.produtoService.listaProdutos()
            if(!resultado.success){
                return res.status(404).json({ message: resultado.message })
            }
            return res.status(200).json(resultado)
        }catch(error){
            console.error(`Erro ao listar produtos: ${error}`)
            return res.status(500).json({ message: `Erro interno do servidor` })
        }
    }

    public async listarMaisConsumidosGenero(req: Request, res: Response){
        try{
            const genero :string = req.body.genero
            const resultado = await this.produtoService.listaMaisConsumidosGenero(genero)
            if(!resultado.success){
                return res.status(404).json({ message: resultado.message })
            }
            return res.status(200).json(resultado)
        }catch(error){
            console.error(`Erro ao listar produtos por gênero: ${error}`)
            return res.status(500).json({ message: `Erro interno do servidor` })
        }
    }

    public async listarMaisConsumidos(req: Request, res: Response){
        try{

            const resultado = await this.produtoService.listarMaisConsumidos()
            if(!resultado.success){
                return res.status(404).json({ message: resultado.message })
            }
            return res.status(200).json(resultado)
        }catch(error){
            console.error(`Erro ao listar produtos mais consumidos: ${error}`)
            return res.status(500).json({ message: `Erro interno do servidor` })
        }
    }

    public async listarClientesMaisConsumiramValor(req: Request, res: Response){
        try{

            const resultado = await this.produtoService.listarClientesMaisConsumiramValor()
            if(!resultado.success){
                return res.status(404).json({ message: resultado.message })
            }
            return res.status(200).json(resultado)
        }catch(error){
            console.error(`Erro ao listar clientes que mais consumiram em valor: ${error}`)
            return res.status(500).json({ message: `Erro interno do servidor` })
        }
    }

    public async listarClientesMaisConsumiramQuantidade(req: Request, res: Response){
        try{

            const resultado = await this.produtoService.listarClientesMaisConsumiramQuantidade()
            if(!resultado.success){
                return res.status(404).json({ message: resultado.message })
            }
            return res.status(200).json(resultado)
        }catch(error){
            console.error(`Erro ao listar clientes que mais consumiram em quantidade: ${error}`)
            return res.status(500).json({ message: `Erro interno do servidor` })
        }
    }
    
}
export default ProdutoController