import { Connection } from "../../database/data-source";
import Produto from "../../entity/Produto/produto";
import Servico from "../../entity/Servico/servico";
import { ICreateServico, IUpdateServico } from "../../Interface/Servico/IServico";

class ServicoService{
    private servicoRepository = Connection.getRepository(Servico)

    public async criarServico(servicoData: ICreateServico){
        try{
            const servico = await this.servicoRepository.findOne({
                where: { nome: servicoData.nome }
            })
            if(servico){
                return { success: false, message: `Serviço já registrado!`}
            }
            const novoServico = await this.servicoRepository.create(servicoData)
            await this.servicoRepository.save(novoServico)
            return { success: true, message: `Serviço cadastrado!`}
        }catch(error){
            console.error(`Erro ao criar serviço: ${error}`)
            return { success: false, message: `Erro ao criar serviço.`}
        }
    }

    public async verServico(id: number){
        try{
            const servico = await this.servicoRepository.findOne({
                where: { servicoId: id}
            })
            if(!servico){
                return { success: false, message: `Serviço não encontrado`}
            }
            return{ success: true, message: `Serviço encontrado!`, data: servico }
        }catch(error){
            console.error(`Erro ao ver serviço: ${error}`)
            return { success: false, message: `Erro ao ver serviço.`}
        }
    }

    public async atualizaServico(id: number, servicoUpdateData: IUpdateServico){
        try{
            const servico = await this.servicoRepository.findOne({
                where: { servicoId: id}
            })
            if(!servico){
                return { success: false, message: `Serviço não encontrado`}
            }
            const servicoUpdate = { ...servico, ...servicoUpdateData }
            await this.servicoRepository.update(id, servicoUpdate)
            return { success: true, message: `Serviço atualizado com sucesso.` }
        }catch(error){
            console.error(`Erro ao atualizar serviço: ${error}`)
            return { success: false, message: `Erro ao atualizar serviço.`}
        }
    }

    public async deletarServico(id: number){
        try{
            const servico = await this.servicoRepository.findOne({
                where: { servicoId: id}
            })
            if(!servico){
                return { success: false, message: `Serviço não encontrado`}
            }
            await this.servicoRepository.delete(servico)
            return { success: true, message: `Serviço deletado!`}
        }catch(error){
            console.error(`Erro ao deletar serviço: ${error}`)
            return { success: false, message: `Erro ao deletar serviço.`}
        }
    }

    public async listarServico(){
        try{
            const servicos = await this.servicoRepository.find()

            if(!servicos || servicos.length === 0){
                return { success: false, message: `Nenhum serviço encontrado.`}
            }
            return { success: true, message: `Serviços encontrados!`, data: servicos}
        }catch(error){
            console.error(`Erro ao listar serviços: ${error}`)
            return { success: false, message: `Erro ao listar serviços.`}
        }
    }

    public async listarMaisConsumidosGenero(genero: string){
        try{
            const servicos = await this.servicoRepository.query(
                `SELECT A.servicoId, A.nome, A.valor, SUM(B.QUANTIDADE) AS totalconsumido FROM
                SERVICO A INNER JOIN VENDA B ON A.servicoId = B.servicoId INNER JOIN
                CLIENTE C ON  B.CLIID = C.CLIID WHERE C.GENERO = ? GROUP BY A.servicoId, A.NOME,A.VALOR
                ORDER BY totalconsumido DESC LIMIT 5;`, [genero]
            )

            if(!servicos || servicos.length === 0){
                return { success: false, message: `Nenhum produto encontrado.`}
            }
            console.log(servicos)
            return { success: true, message: `Servicos mais consumidos por gênero encontrados`, data: servicos }

        }catch(error){
            console.error(`Erro ao listar servicos mais consumidos por gênero: ${error}`)
            return{ success: false, message: `Erro ao listar servicos mais consumidos por gênero.` }
        }
    }

    public async listarMaisConsumidos(){
        try{
            const servicos = await this.servicoRepository.query(
                `SELECT A.servicoId, A.nome, A.valor, SUM(B.QUANTIDADE) AS totalconsumido FROM 
                SERVICO A INNER JOIN VENDA B ON A.servicoId = B.servicoId GROUP BY A.servicoId, A.nome, A.valor
                ORDER BY totalconsumido DESC LIMIT 5;`
            )

            if(!servicos || servicos.length === 0){
                return { success: false, message: `Nenhum produto encontrado.`}
            }
            console.log(servicos)
            return { success: true, message: `Servicos mais consumidos encontrados`, data: servicos }

        }catch(error){
            console.error(`Erro ao listar servicos mais consumidos: ${error}`)
            return{ success: false, message: `Erro ao listar servicos mais consumidos.` }
        }
    }

    public async listarClientesMaisConsumiramValor(){
        try{
            const clientes = await this.servicoRepository.query(
                `SELECT A.cliId, A.NOME AS nomecliente, C.nome, SUM(B.QUANTIDADE * C.VALOR) AS valortotal FROM CLIENTE A 
                INNER JOIN VENDA B ON A.cliId = B.cliId INNER JOIN SERVICO C ON B.SERVICOID = C.SERVICOID
                GROUP BY A.cliId, A.NOME, C.NOME ORDER BY valortotal DESC LIMIT 5;`
            )

            if(!clientes || clientes.length === 0){
                return { success: false, message: `Nenhum cliente encontrado.`}
            }
            return { success: true, message: `Clientes que mais consumiram em valor encontrados!`, data: clientes }

        }catch(error){
            console.error(`Erro ao listar clientes que mais consumiram em valor: ${error}`)
            return{ success: false, message: `Erro ao listar clientes que mais consumiram em valor .` }
        }
    }

    public async listarClientesMaisConsumiramQuantidade(){
        try{
            const clientes = await this.servicoRepository.query(
                `SELECT A.cliId, A.NOME AS nomecliente, C.nome, SUM(B.QUANTIDADE) AS totalconsumido 
                FROM CLIENTE A INNER JOIN VENDA B ON A.cliId = B.cliId 
                INNER JOIN SERVICO C ON B.SERVICOID = C.SERVICOID 
                GROUP BY A.cliId, A.NOME, C.NOME ORDER BY totalconsumido DESC LIMIT 10;`
            )

            if(!clientes || clientes.length === 0){
                return { success: false, message: `Nenhum cliente encontrado.`}
            }
            return { success: true, message: `Clientes que mais consumiram em quantidade encontrados!`, data: clientes }

        }catch(error){
            console.error(`Erro ao listar clientes que mais consumiram em quantidade.: ${error}`)
            return{ success: false, message: `Erro ao listar clientes que mais consumiram em quantidade.` }
        }
    }
    
    public async consomeServico(id: number, quantidade: number){
        try{
            const servico: Servico = await this.servicoRepository.findOne({
                where: { servicoId: id }
            })
            if(!servico.ativo){
                return { success: false, message: `Serviço não disponivel.` }
            }
            servico.vendasServico = (servico.vendasServico + quantidade)
            await this.servicoRepository.save(servico)
            return { success: true, message: `Serviço consumido.`, data: servico}
        }catch(error){
            console.error(`Erro ao consumir serviço: ${error}`)
            return { success: false, message: `Erro ao consumir serviço.`}
        }
    }
}

export default ServicoService