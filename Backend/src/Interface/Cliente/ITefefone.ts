import Cliente from "../../entity/Cliente/cliente"

export interface ICreatetelefone{
    ddd: string
    numero: string
    cliente: Cliente
}
export interface IUpdatetelefone{
    ddd?: string
    numero?: string
}
export interface IReadtelefone{
    telefoneId: number
    ddd: string
    numero: string
}
export interface IBuscaTelefone{
    id?: number
    ddd?: string
    numero?: string
}