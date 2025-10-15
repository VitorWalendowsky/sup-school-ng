export interface CursoResponse {
    id: number,
    nome: string,
    sigla: string,
}

export interface CursoCadastroRequest {
    nome: string,
    sigla: string,
}

export interface CursoEditarRequest {
    nome: string,
    sigla: string,
}