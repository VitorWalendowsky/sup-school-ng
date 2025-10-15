import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CursoCadastroRequest, CursoEditarRequest, CursoResponse } from '../models/curso.dtos';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  url = "https://api.franciscosensaulas.com/api/v1/escola/cursos";

  constructor(
    private httpClient: HttpClient,
  ) {

  }

  getAll(): Observable<CursoResponse[]> {
    return this.httpClient.get<CursoResponse[]>(this.url);
  };

  create(form: CursoCadastroRequest): Observable<void> {
    return this.httpClient.post<void>(this.url, form);
  }

  delete(id: number): Observable<void> {
    const urlParaApagar = `${this.url}/${id}`;

    return this.httpClient.delete<void>(urlParaApagar);
  }

  getById(id: number): Observable<CursoResponse> {
    const urlComId = `${this.url}/${id}`;

    return this.httpClient.get<CursoResponse>(urlComId);
  }

  update(id: number, form: CursoEditarRequest): Observable<void> { 
    const urlParaEditar = `${this.url}/${id}`;

    return this.httpClient.put<void>(urlParaEditar, form);
  }
}
