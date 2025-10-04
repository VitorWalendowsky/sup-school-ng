import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaCadastroRequest, CategoriaEditarRequest, CategoriaResponse } from '../models/categoria.dto';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  url = "https://api.franciscosensaulas.com/api/v1/biblioteca/categorias"

  constructor(private httpClient: HttpClient){}

  getAll(): Observable<CategoriaResponse[]>{
    return this.httpClient.get<CategoriaResponse[]>(this.url);
  }

  create(form: CategoriaCadastroRequest): Observable<void>{
    return this.httpClient.post<void>(this.url, form);
  }

  delete(id: number): Observable<void>{
    const urlApagar = `${this.url}/${id}`;
    return this.httpClient.delete<void>(urlApagar);
  }

  getById(id: number) : Observable<CategoriaResponse>{
    const urlConsultarPorId = `${this.url}/${id}`;
    return this.httpClient.get<CategoriaResponse>(urlConsultarPorId);
  }

  update(id: number, form: CategoriaEditarRequest): Observable<void>{
    const urlAtualizar = `${this.url}/${id}`;
    return this.httpClient.put<void>(urlAtualizar, form);
  }
}
