export interface IUpdateProduto{
    nome?: string
    valor?: number
    estoque?: number
}

export interface ICreateProduto{
    nome: string
    valor: number
    estoque: number
}

export interface IReadProduto{
    cliId: number
    produtoId: number
    nome?:string
    valor?: number
    estoque?: number
    totalconsumido?: number
    genero?: string
    valortotal?: number
    nomecliente?: string
}