export interface PessoaUsuaria {
    nome: string;
    nascimento: string;
    cpf: string;
    telefone: string;
    email: string;
    senha: string;
    cep: string;
    genero: string;
}

export interface Produto{
    id: number,
    categoria: string,
    nome: string,
    preco: number
}

export interface Cliente{
    id: number;
    nome: string;
    nascimento: string;
    cpf: string;
    cep: string;
    telefone: string;
    email: string;
    genero: string;
}

export interface Clientelogin{
    id: number;
    email: string;
    senha: string;
}

export interface PedidoDetail{
    nome: string,
    categoria: string,
    preco: number
}

export interface Pedido{
    id: number,
    status: string,
    cliente: number,
    produto: number[],
    detail: PedidoDetail[],
    precoPedido: number
}