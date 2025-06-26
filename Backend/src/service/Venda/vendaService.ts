import { Repository } from "typeorm";
import Venda from "../../entity/Venda/venda";
import { Connection } from "../../database/data-source";
import { ICreateVenda } from "../../Interface/Venda/IVenda";
import ProdutoService from "../Produto/produtoService";
import ServicoService from "../Servico/servicoService";
import Cliente from "../../entity/Cliente/cliente";
import Funcionario from "../../entity/Funcionario/funcionario";
import Produto from "../../entity/Produto/produto";
import Servico from "../../entity/Servico/servico";

class VendaService {
    private vendaRepository: Repository<Venda>
    private produtoService: ProdutoService
    private servicoService: ServicoService
    private clienteRepository: Repository<Cliente>
    private funcionarioRepository: Repository<Funcionario>

    constructor() {
        this.vendaRepository = Connection.getRepository(Venda)
        this.clienteRepository = Connection.getRepository(Cliente)
        this.funcionarioRepository = Connection.getRepository(Funcionario)
        this.produtoService = new ProdutoService()
        this.servicoService = new ServicoService()
    }

    public async cadastraVenda(vendaData: ICreateVenda) {
        try {
            const { quantidade, cliId, funcionarioId, id, tipo } = vendaData

            if (id === null || tipo === null) {
                return { success: false, message: `Produto ou serviço não informado.` }
            }

            const cliente = await this.clienteRepository.findOne({
                where: { cliId: cliId }
            })

            if (!cliente) {
                return { success: false, message: `Cliente não encontrado.` }
            }

            const funcionario = await this.funcionarioRepository.findOne({
                where: { funcionarioId: funcionarioId }
            })

            if (!funcionario) {
                return { success: false, message: `Funcionario não encontrado.` }
            }

            let produto: Produto | null
            let servico: Servico | null

            switch (tipo) {
                case "produto":
                    const produtoResultado = await this.produtoService.vendeProduto(id, quantidade)
                    if(!produtoResultado.success){
                        return { success: false, message: produtoResultado.success }
                    }        
                    produto = produtoResultado.data
                    servico = null
                    break
                case "servico":
                    const servicoResultado = await this.servicoService.consomeServico(id, quantidade)
                    servico = servicoResultado.data
                    produto = null
                    break
                default:
                    return { success: false, message: `Tipo não registrado.` }
            }

            const novaVenda = await this.vendaRepository.create(
                {
                    quantidade:quantidade,
                    cliente: cliente,
                    funcionario: funcionario,
                    produto: produto,
                    servico: servico
                }
            )

            await this.vendaRepository.save(novaVenda)

            return { success: true, message: `Venda registrada!`}
        } catch (error) {
            console.error(`Erro ao registrar venda: ${error}`)
            return { success: false, message: `Erro ao registrar venda ` }
        }
    }
}
export default VendaService