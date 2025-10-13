export interface UsuarioCadastroRequest {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
}

export interface UsuarioResponse {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
}
