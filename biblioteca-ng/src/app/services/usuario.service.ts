import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioCadastrarRequest, UsuarioEditarRequest, UsuarioResponse } from '../models/usuario.dtos';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  listar() {
    throw new Error('Method not implemented.');
  }
  url = "https://api.franciscosensaulas.com/api/v1/biblioteca/usuarios";

  constructor(private httpClient: HttpClient) { };

  getAll(): Observable<UsuarioResponse[]> {
    return this.httpClient.get<UsuarioResponse[]>(this.url);
  }

  create(form: UsuarioCadastrarRequest): Observable<void> {
    return this.httpClient.post<void>(this.url, form);
  }

  getById(id: number): Observable<UsuarioResponse> {
    const urlComId = `${this.url}/${id}`;

    return this.httpClient.get<UsuarioResponse>(urlComId);
  }

  update(id: number,form: UsuarioEditarRequest): Observable<void> {
    const urlParaEditar = `${this.url}/${id}`;

    return this.httpClient.put<void>(urlParaEditar, form);
  }

  delete(id:number): Observable<void> {
    const urlParaEditar = `${this.url}/${id}`;

    return this.httpClient.delete<void>(urlParaEditar);
  }
}
