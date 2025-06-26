import Cliente from "../../entity/Cliente/cliente"

export interface ICreateCpf{
    valor:string
    dataEmissao: Date
    cliente: Cliente
}

export interface IUpdateCpf{
    valor?: string
    dataEmissao?: Date
}

export interface IBuscaCpf{
    valor?: string
    id?: number
}

export interface IReadCpf{
    valor:string
    dataEmissao: Date
    cliente: Cliente
}