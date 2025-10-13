import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LivroCadastroRequest, LivroResponse } from '../models/livro.dto';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  url = "https://api.franciscosensaulas.com/api/v1/biblioteca/livros"

  constructor(private httpClient: HttpClient) { }

  getAll(titulo: string | null): Observable<LivroResponse[]> {
    let params = new HttpParams();
    if (titulo) {
      params = params.set('titulo', titulo.trim());
    }

    return this.httpClient.get<LivroResponse[]>(this.url, {params});
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
}
