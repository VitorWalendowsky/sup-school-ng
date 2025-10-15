import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlunoCadastroRequest, AlunoEditarRequest, AlunoResponse } from '../models/aluno.dtos';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  url = "https://api.franciscosensaulas.com/api/v1/escola/alunos";

  constructor (private httpClient: HttpClient) {

  }

  getAll(): Observable<AlunoResponse[]> {
    return this.httpClient.get<AlunoResponse[]>(this.url);
  };

  create(form: AlunoCadastroRequest): Observable<void> {
    return this.httpClient.post<void>(this.url, form);
  };

  delete(id: number): Observable<void> {
    const urlParaApagar = `${this.url}/${id}`;

    return this.httpClient.delete<void>(urlParaApagar);
  };

  getById(id: number): Observable<AlunoResponse> {
    const urlComId = `${this.url}/${id}`

    return this.httpClient.get<AlunoResponse>(urlComId);
  }

  update(id: number, form: AlunoEditarRequest): Observable<void> {
    const urlParaEditar = `${this.url}/${id}`

    return this.httpClient.put<void>(urlParaEditar, form);
  }
}
