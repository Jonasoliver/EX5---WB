export interface ICreateVenda{
    quantidade: number
    cliId: number
    id: number
    tipo?: 'produto' | 'servico'
    funcionarioId: number
}