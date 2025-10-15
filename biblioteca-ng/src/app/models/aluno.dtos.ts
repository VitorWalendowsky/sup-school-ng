export interface AlunoResponse {
    id: number;
    nome: string;
    sobrenome: string;
    dataNascimento: string;
    cpf: string;
}

export interface AlunoCadastroRequest {
    nome: string;
    sobrenome: string;
    dataNascimento: string;
    cpf: string;
}

export interface AlunoEditarRequest {
    nome: string;
    sobrenome: string;
    dataNascimento: string;
    cpf: string;
}