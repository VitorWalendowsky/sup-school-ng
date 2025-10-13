export interface LivroCadastroRequest{
    titulo: string;
    autorId: number | null;
    categoriaId: number | null;
    anoPublicacao: Date | null;
    isbn: string;
    quantidade: number | null;
    descricao: string;
    resumo: string;
}

export interface LivroResponse{
    titulo: string;
    autorId: number | null;
    categoriaId: number | null;
    anoPublicacao: Date | null;
    isbn: string;
    quantidade: number | null;
    descricao: string;
    resumo: string;
    autor: LivroAutorResponse;
    categoria: LivroCategoriaResponse;
}

export interface LivroAutorResponse {
    id: number;
    nome: string;
}


export interface LivroCategoriaResponse {
    id: number;
    nome: string;
}
