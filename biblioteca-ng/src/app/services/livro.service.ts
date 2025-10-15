import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LivroCadastroRequest, LivroEditarRequest, LivroResponse } from '../models/livro.dtos';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  listar() {
    throw new Error('Method not implemented.');
  }
  url = "https://api.franciscosensaulas.com/api/v1/biblioteca/livros"

  constructor(private httpClient: HttpClient) { }

  getAll(titulo: string | null = ""): Observable<LivroResponse[]> {
    let params = new HttpParams();
    if (titulo) {
      params = params.set('titulo', titulo.trim());
    }

    return this.httpClient.get<LivroResponse[]>(this.url, { params });
  }

  create(form: LivroCadastroRequest): Observable<void> {
    let formulario = {
      ...form,
      anoPublicacao: form.anoPublicacao!.getFullYear()
    }
    return this.httpClient.post<void>(this.url, formulario);
  }

  delete(id: number): Observable<void> {
    const urlApagar = `${this.url}/${id}`;
    return this.httpClient.delete<void>(urlApagar);
  }

  getById(id: number): Observable<LivroResponse> {
    const urlConsultarPorId = `${this.url}/${id}`;

    return this.httpClient.get<LivroResponse>(urlConsultarPorId);
  }

  update(id: number, form: LivroEditarRequest): Observable<void> {
    const urlAtualizar = `${this.url}/${id}`;

    return this.httpClient.put<void>(urlAtualizar, form);
  }
}