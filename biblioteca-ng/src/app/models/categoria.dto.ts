export interface CategoriaResponse{
    id: number;
    nome: string;
}

/*
Request: é a comunição com o back-end

Request (classe): é uma representação do que será enviado para o back-end
Response => é o retorno do back-end (dados consultados de uma tabela)

*/
export interface CategoriaCadastroRequest{
    nome: string;
}

export interface CategoriaEditarRequest{
    nome: string;
}