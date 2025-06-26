import Cliente from "../entity/Cliente/cliente"

export interface ICreateRg{
    valor: string
    dataEmissao: Date
    cliente: Cliente
}

export interface IUpdateRg{
    valor?: string
    dataEmissao?: Date
}

export interface IBuscaRgs{
    valor?: string
    id?: number
}

export interface IReadRg{
    rgId: number
    valor: string
    dataEmissao: Date
}