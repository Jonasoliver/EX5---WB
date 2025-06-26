export interface IReadServico{
    cliId?: number
    servicoId: number
    nome: string
    valor: number
    vendasServico: number
    totalconsumido?: number
    nomecliente?: string
    valortotal?: number
}

export interface ICreateServico{
    nome: string
    valor: number
}

export interface IUpdateServico{
    nome?: string
    valor?: number
}