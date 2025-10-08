import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutorCadastroRequest, AutorEditarRequest, AutorResponse } from '../models/autor.dto';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  url = "https://api.franciscosensaulas.com/api/v1/biblioteca/autores"

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<AutorResponse[]> {
    return this.httpClient.get<AutorResponse[]>(this.url);
  }

  create(form: AutorCadastroRequest): Observable<void> {
    return this.httpClient.post<void>(this.url, form);
  }

  delete(id: number): Observable<void> {
    const urlApagar = `${this.url}/${id}`;
    return this.httpClient.delete<void>(urlApagar);
  }

  getById(id: number): Observable<AutorResponse> {
    const urlConsultarPorId = `${this.url}/${id}`;
    return this.httpClient.get<AutorResponse>(urlConsultarPorId);
  }

  update(id: number, form: AutorEditarRequest): Observable<void> {
    const urlAtualizar = `${this.url}/${id}`;
    // PUT envia o corpo com os campos editáveis (ex.: { nome }).
    return this.httpClient.put<void>(urlAtualizar, form);
  }
}
