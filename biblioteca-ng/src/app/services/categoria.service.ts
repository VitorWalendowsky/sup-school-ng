import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaCadastroRequest, CategoriaEditarRequest, CategoriaResponse } from '../models/categoria.dto';

@Injectable({
  // Torna o serviço disponível em toda a aplicação sem precisar declarar em providers de módulos.
  providedIn: 'root'
})
export class CategoriaService {
  // Endpoint base da API para recursos de categorias.
  // (Sugestão: mover para environment para variar por ambiente.)
  url = "https://api.franciscosensaulas.com/api/v1/biblioteca/categorias"

  // Injeta o HttpClient para realizar chamadas HTTP (GET/POST/PUT/DELETE).
  constructor(private httpClient: HttpClient) { }

  // Busca todas as categorias.
  getAll(): Observable<CategoriaResponse[]> {
    // Retorna um Observable tipado com o array de categorias.
    return this.httpClient.get<CategoriaResponse[]>(this.url);
  }

  // Cria uma nova categoria com os dados do formulário.
  create(form: CategoriaCadastroRequest): Observable<void> {
    // POST para o endpoint base. Tipagem <void> indica que não esperamos corpo na resposta.
    return this.httpClient.post<void>(this.url, form);
  }

  // Remove uma categoria pelo ID.
  delete(id: number): Observable<void> {
    // Monta a URL do recurso específico: /categorias/{id}
    const urlApagar = `${this.url}/${id}`;
    // DELETE no recurso identificado.
    return this.httpClient.delete<void>(urlApagar);
  }

  // Busca uma categoria específica pelo ID.
  getById(id: number): Observable<CategoriaResponse> {
    const urlConsultarPorId = `${this.url}/${id}`;
    // GET para obter um único objeto tipado como CategoriaResponse.
    return this.httpClient.get<CategoriaResponse>(urlConsultarPorId);
  }

  // Atualiza uma categoria existente.
  update(id: number, form: CategoriaEditarRequest): Observable<void> {
    const urlAtualizar = `${this.url}/${id}`;
    // PUT envia o corpo com os campos editáveis (ex.: { nome }).
    return this.httpClient.put<void>(urlAtualizar, form);
  }
}

