import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioCadastroRequest } from '../models/usuario.dto';
import { UsuarioResponse } from '../models/usuario.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = '/api/usuarios'; // Sua URL de API

  constructor(private http: HttpClient) {}

  // Método para criar um usuário
  create(usuario: UsuarioCadastroRequest): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(this.apiUrl, usuario);
  }
}
