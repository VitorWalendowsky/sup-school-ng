import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmprestimoCadastrarRequest, EmprestimoResponse } from '../models/emprestimo.dtos';

@Injectable({
  providedIn: 'root'
})
export class EmprestimosService {
  obterPorId(id: number) {
    throw new Error('Method not implemented.');
  }
  cadastrar(req: EmprestimoCadastrarRequest) {
    throw new Error('Method not implemented.');
  }
  apagar(id: any) {
    throw new Error('Method not implemented.');
  }
  delete(id: number) {
    throw new Error('Method not implemented.');
  }
  url = "https://api.franciscosensaulas.com/api/v1/biblioteca/emprestimos";

  constructor(private httpClient: HttpClient) { };

  getAll(): Observable<EmprestimoResponse[]> {
    return this.httpClient.get<EmprestimoResponse[]>(this.url);
  }

  create(form: EmprestimoCadastrarRequest): Observable<void> {
    return this.httpClient.post<void>(this.url, form);
  }
}
