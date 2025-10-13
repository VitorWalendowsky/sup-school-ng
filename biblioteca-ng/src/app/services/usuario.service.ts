import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutorResponse } from '../models/autor.dto';
import { UsuarioResponse, UsuarioCadastroRequest } from '../models/usuario.dto';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService{
  url = "https://api.franciscosensaulas.com/api/v1/biblioteca/usuarios"

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<UsuarioResponse[]> {
    return this.httpClient.get<UsuarioResponse[]>(this.url);
  }

  create(form: UsuarioCadastroRequest): Observable<void> {
    return this.httpClient.post<void>(this.url, form);
  }

  delete(id: number): Observable<void> {
    const urlApagar = `${this.url}/${id}`;
    return this.httpClient.delete<void>(urlApagar);
  }

  getById(id: number): Observable<UsuarioResponse> {
    const urlConsultarPorId = `${this.url}/${id}`;
    return this.httpClient.get<UsuarioResponse>(urlConsultarPorId);
  }
}
