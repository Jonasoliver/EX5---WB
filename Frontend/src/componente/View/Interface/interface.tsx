// clienteView.ts
export  interface ICliente {
    nome: string;
    cpf: string;
    rg: string;
    tel: string;
    genero: string;
  }

// produtoView.ts
export  interface IProduto {
    nome: string;
    id: string;
    valor: string;
  }

// servicoView.ts
export  interface IServico {
    nome: string;
    id: string;
    valor: string;
  }
  