export interface EmprestimoResponse {
    livroId: number | null;
    usuarioId: number | null;
    dataEmprestimo: Date | null;
    dataDevolucao: Date | null;
    status: string;
    livro: string;
    usuario: string;
}

export interface EmprestimoCadastrarRequest {
    livroId: number | null;
    usuarioId: number | null;
    dataEmprestimo: Date | null;
    dataDevolucao: Date | null;
    status: string;
}