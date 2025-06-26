import { VirtualColumn } from "typeorm"

export interface ICreateProduto{
    nome: string
    valor: number
    estoque: number
}

export interface IUpdateProduto{
    nome?: string
    valor?: number
    estoque?: number
}

