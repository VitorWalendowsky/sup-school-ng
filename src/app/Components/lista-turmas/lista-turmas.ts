import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface Turma {
  id: string;
  nome: string;
  sigla: string;
}

@Component({
  selector: 'app-lista-turmas',
  standalone: true, // se estiver usando standalone components
  imports: [FormsModule, RouterLink],
  templateUrl: './lista-turmas.html',
  styleUrls: ['./lista-turmas.scss'] // Corrigido: styleUrl → styleUrls
})
export class ListaTurmasComponent {

  turmas: Turma[];

  constructor(private router: Router) {
    this.turmas = this.carregarTurmasLocalStorage();
  }

  carregarTurmasLocalStorage(): Turma[] {
    const dados = localStorage.getItem('turmas');
    return dados ? JSON.parse(dados) : [];
  }

  apagar(turma: Turma): void {
    this.turmas = this.turmas.filter(t => t.id !== turma.id);
    this.salvarLocalStorage();
  }

  editar(turma: Turma): void {
    this.router.navigate(['/turmas/editar', turma.id]);
  }

  salvarLocalStorage(): void {
    localStorage.setItem('turmas', JSON.stringify(this.turmas));
  }
}
