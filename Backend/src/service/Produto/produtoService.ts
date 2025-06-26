import { Connection } from "../../database/data-source";
import Produto from "../../entity/Produto/produto";
import  {ICreateProduto, IUpdateProduto } from "../../Interface/Produto/IProduto";

class ProdutoService{
    private produtoRepository = Connection.getRepository(Produto)

    public async criarProduto(produtoData: ICreateProduto){
        try{
            const produto = await this.produtoRepository.findOne({
                where: { 
                    nome: produtoData.nome,
                    valor: produtoData.valor
                }
            })

            if(produto){
                return { success: false, message: `Produto já cadastrado!` }
            }

            const novoProduto = await this.produtoRepository.create(produtoData)
            await this.produtoRepository.save(novoProduto)

            return { success: true, message: `Produto cadastrado!`}
        }catch(error){
            console.error(`Erro ao cadastrar produto: ${error}`)
            return { success: false, message: `Erro ao cadastrar produto.`}
        }
    }

    public async verProduto(id: number){
        try{
            const produto = await this.produtoRepository.findOne({
                where: { produtoId: id }
            })
            if(!produto){
                return { success: false, message: `Produto não encontrado.` }
            }
            return { success: true, message: `Produto encontrado!`, data: produto}

        }catch(error){
            console.error(`Erro em ver o produto: ${error}`)
            return { success: false, message: `Erro ao ver produto.`}
        }
    }

    public async atualizarProduto(id: number, produtoUpdateData: IUpdateProduto){
        try{
            const produto = await this.produtoRepository.findOne({
                where: { produtoId: id }
            })
            if(!produto){
                return { success: false, message: `Produto não encontrado.`}
            }
            const produtoAtualizado = { ...produto, ...produtoUpdateData }
            await this.produtoRepository.update(id,produtoAtualizado)

            return { success: true, message: `Produto atualizado!`}
        }catch(error){
            console.error(`Erro ao atualizar produto: ${error}`)
            return { success: false, message: `Erro ao atualizar produto.`}
        }
    }

    public async deletaProduto(id: number){
        try{
            const produto = await this.produtoRepository.findOne({
                where: { produtoId: id }
            })
            if(!produto){
                return { success: false, message: `Produto não encontrado.`}
            }
            await this.produtoRepository.delete(produto);
            return { success: true, message: `Produto deletado com sucesso!`}
        }catch(error){
            console.error(`Erro ao deletar produto: ${error}`)
            return { success: false, message: `Erro ao deletar produto.`}
        }
    }

    public async listaProdutos(){
        try{
            const produtos = await this.produtoRepository.find()
            if(!produtos || produtos.length === 0){
                return { success: false, message: `Nenhum produto encontrado.`}
            }
            return { success: true, message: `Produtos encontrados!`, data: produtos}
        }catch(error){
            console.error(`Erro ao listar produtos: ${error}`)
            return { success: false, message: `Erro ao listar produtos.`}
        }
    }

    public async listaMaisConsumidosGenero(genero:string){
        try{
            const produtos = await this.produtoRepository.query(
                `SELECT A.produtoId, A.nome, A.valor, SUM(B.QUANTIDADE) AS totalconsumido FROM
                PRODUTO A INNER JOIN VENDA B ON A.produtoId = B.produtoId INNER JOIN
                CLIENTE C ON  B.CLIID = C.CLIID WHERE C.GENERO = ? GROUP BY A.produtoId, A.nome,A.valor
                ORDER BY totalconsumido DESC LIMIT 5;`, [genero]
            )

            if(!produtos || produtos.length === 0){
                return { success: false, message: `Nenhum produto encontrado.`}
            }
            return { success: true, message: `Produtos mais consumidos por gênero encontrados`, data: produtos }

        }catch(error){
            console.error(`Erro ao listar produtos mais consumidos por gênero: ${error}`)
            return{ success: false, message: `Erro ao listar produtos mais consumidos por gênero.` }
        }
    }

    public async listarMaisConsumidos(){
        try{
            const produtos = await this.produtoRepository.query(
                `SELECT A.produtoId, A.nome, A.valor, SUM(B.QUANTIDADE) AS totalconsumido FROM 
                PRODUTO A INNER JOIN VENDA B ON A.produtoId = B.produtoId GROUP BY A.produtoId, A.nome, A.valor
                ORDER BY totalconsumido DESC LIMIT 5;`
            )

            if(!produtos || produtos.length === 0){
                return { success: false, message: `Nenhum produto encontrado.`}
            }
            return { success: true, message: `Produtos mais consumidos encontrados`, data: produtos }

        }catch(error){
            console.error(`Erro ao listar produtos mais consumidos: ${error}`)
            return{ success: false, message: `Erro ao listar produtos mais consumidos.` }
        }
    }

    public async listarClientesMaisConsumiramValor(){
        try{
            const clientes = await this.produtoRepository.query(
                `SELECT A.cliId, A.NOME AS nomecliente, C.nome, SUM(B.QUANTIDADE * C.VALOR) AS valortotal FROM CLIENTE A 
                INNER JOIN VENDA B ON A.cliId = B.cliId INNER JOIN PRODUTO C ON B.PRODUTOID = C.PRODUTOID
                GROUP BY A.cliId, A.NOME, C.nome ORDER BY valortotal DESC LIMIT 5;`
            )

            if(!clientes || clientes.length === 0){
                return { success: false, message: `Nenhum produto encontrado.`}
            }
            return { success: true, message: `Clientes que mais consumiram em valor encontrados!`, data: clientes }

        }catch(error){
            console.error(`Erro ao listar clientes que mais consumiram em valor: ${error}`)
            return{ success: false, message: `Erro ao listar clientes que mais consumiram em valor.` }
        }
    }

    public async listarClientesMaisConsumiramQuantidade(){
        try{
            const clientes = await this.produtoRepository.query(
                `SELECT A.cliId, A.NOME AS nomecliente, C.nome , SUM(B.QUANTIDADE) AS totalconsumido 
                FROM CLIENTE A INNER JOIN VENDA B ON A.cliId = B.cliId INNER JOIN PRODUTO C ON B.PRODUTOID = C.PRODUTOID
                GROUP BY A.cliId, A.NOME, C.nome ORDER BY totalconsumido DESC LIMIT 10;`
            )

            if(!clientes || clientes.length === 0){
                return { success: false, message: `Nenhum produto encontrado.`}
            }
            return { success: true, message: `Clientes que mais consumiram em quantidade encontrados!`, data: clientes }

        }catch(error){
            console.error(`Erro ao listar clientes que mais consumiram em quantidade: ${error}`)
            return{ success: false, message: `Erro ao listar clientes que mais consumiram em quantidade.` }
        }
    }

    public async vendeProduto(id: number, quantidade: number){
        try{
            const produto = await this.produtoRepository.findOne({
                where: { produtoId: id }
            })
            if(!produto){
                return { success: false, message: `Produto não encontrado!` }
            }
            if(!produto.ativo){
                return { success: false, message: `Produto fora de estoque.` }
            }
            if(produto.estoque < quantidade){
                return { success:false, message: `Estoque restante: ${produto.estoque}, quantidade desejada não disponivel.`}
            }
            produto.estoque = (produto.estoque - quantidade)

            await this.produtoRepository.save(produto)
            return { success: true, message: `Estoque atualizado.`, data: produto}

        }catch(error){
            console.error(`Erro ao vender produto: ${error}`)
            return{ success: false, message: `Erro ao vender um produto.`}
        }
    }
}
export default ProdutoService