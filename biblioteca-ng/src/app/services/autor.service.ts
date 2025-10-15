import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutorCadastroRequest, AutorEditarRequest, AutorResponse } from '../models/autor.dtos';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  url = "https://api.franciscosensaulas.com/api/v1/biblioteca/autores";

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<AutorResponse[]> {
    return this.httpClient.get<AutorResponse[]>(this.url);
  };

  create(form: AutorCadastroRequest): Observable<void> {
    return this.httpClient.post<void>(this.url, form);
  }

  delete(id: number) {
    const urlApagar = `${this.url}/${id}`;

    return this.httpClient.delete<void>(urlApagar);
  }

  getById(id: number): Observable<AutorResponse> {
    const urlComId = `${this.url}/${id}`;

    return this.httpClient.get<AutorResponse>(urlComId);
  }

  update(id: number, form: AutorEditarRequest): Observable<void> {
    const urlEditar = `${this.url}/${id}`;

    return this.httpClient.put<void>(urlEditar, form);
  }
}
