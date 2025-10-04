import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriaCadastroRequest, CategoriaResponse } from '../models/categoria.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  url = "https://api.franciscosensaulas.com/api/v1/biblioteca/categorias";

  constructor(private httpClient: HttpClient) {
  }

  getAll() : Observable<CategoriaResponse[]> {
    return this.httpClient.get<CategoriaResponse[]>(this.url);
  }
  create(form: CategoriaCadastroRequest): Observable<void>{
    return this.httpClient.post<void>(this.url, form);
  }
  delete(id: number): Observable<void>{
    const urlApagar = `${this.url}/${id}`;
    return this.httpClient.delete<void>(urlApagar);
  }
}
