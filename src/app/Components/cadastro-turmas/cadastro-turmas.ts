import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Turma {
  id: string;
  nome: string;
  sigla: string;
}

@Component({
  selector: 'app-cadastro-turmas',
  standalone: true, // se estiver usando Angular standalone components
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro-turmas.html',
  styleUrls: ['./cadastro-turmas.scss'] // Corrigido de styleUrl para styleUrls
})
export class CadastroTurmas {
  turmas: Turma[] = [];

  nome: string = '';
  sigla: string = '';

  constructor(private router: Router) {
    this.turmas = this.carregarTurmasLocalStorage();
  }

  salvar(): void {
    if (this.nome.trim() && this.sigla.trim()) {
      const turma: Turma = {
        id: crypto.randomUUID(),
        nome: this.nome,
        sigla: this.sigla
      };

      this.turmas.push(turma);
      this.salvarLocalStorage();
      this.router.navigate(['/turmas']);
    } else {
      console.error('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  salvarLocalStorage(): void {
    localStorage.setItem('turmas', JSON.stringify(this.turmas));
  }

  carregarTurmasLocalStorage(): Turma[] {
    const dados = localStorage.getItem('turmas');
    return dados ? JSON.parse(dados) : [];
  }
}
