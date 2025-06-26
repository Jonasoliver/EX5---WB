import Cliente from "../../entity/Cliente/cliente"
import Funcionario from "../../entity/Funcionario/funcionario"
import Produto from "../../entity/Produto/produto"
import Servico from "../../entity/Servico/servico"

export interface ICreateVenda{
    quantidade: number
    cliId: number
    id: number
    tipo: 'produto' | 'servico'
    funcionarioId: number
}