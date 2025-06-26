export interface ICreateCliente {
    nome: string;
    nomeSocial?: string;
    genero: string;
    cpf: {
        valor: string;
        dataEmissao: string;
    };
    rgs: {
        valor: string;
        dataEmissao: string;
    }[];
    telefones: {
        ddd: string;
        numero: string;
    }[];
}

export interface IUpdateCliente {
    nome?: string;
    nomeSocial?: string;
    genero?: string;
    cpf?: {
        cpfId?: number
        valor?: string;
        dataEmissao?: string;
    };
    rgs?: {
        rgId?: number
        valor?: string;
        dataEmissao?: string;
    }[];
    telefones?: {
        telefoneId?: number
        ddd?: string;
        numero?: string;
    }[];
}


export interface IReadCliente {
    cliId:number
    nome: string;
    nomeSocial?: string;
    genero: string;
}

export interface IVerCliente{
    cliId: number
    nome: string;
    nomeSocial?: string;
    genero: string;
    cpf: {
        cpfId: number
        valor: string;
        dataEmissao: string;
    };
    rgs: {
        rgId: number
        valor: string;
        dataEmissao: string;
    }[];
    telefones: {
        telefoneId: number
        ddd: string;
        numero: string;
    }[];
}