export interface UsuarioResponse {
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
}

export interface UsuarioCadastrarRequest {
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
}

export interface UsuarioEditarRequest {
    nome: string;
    email: string;
    telefone: string;
    endereco: string;
}