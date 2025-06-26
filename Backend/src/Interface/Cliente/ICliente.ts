export interface ICreateCliente {
    nome: string;
    nomeSocial?: string;
    genero: string;
    cpf: {
        valor: string;
        dataEmissao: Date;
    };
    rgs: {
        valor: string;
        dataEmissao: Date;
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
        dataEmissao?: Date;
    };
    rgs?: {
        rgId?: number
        valor?: string;
        dataEmissao?: Date;
    }[];
    telefones?: {
        telefoneId?: number
        ddd?: string;
        numero?: string;
    }[];
}

export interface IReadCliente {
    nome: string;
    nomeSocial?: string;
    genero: string;
    cpf: {
        valor: string;
    }
}

