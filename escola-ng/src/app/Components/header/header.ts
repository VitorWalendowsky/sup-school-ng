import { Component } from '@angular/core';
import { NavbarComponent, NavbarMenu } from "./components/navbar/navbar.component";

@Component({
  selector: 'app-header',
  imports: [NavbarComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  menus: NavbarMenu[];

  constructor(){
    this.menus = [
      {link: "calculadora", titulo: "Calculadora"},
      {link: "lista-pessoas", titulo: "Lista-Pessoas"},
      {link: "calculadora-retangulo", titulo: "Calculadora-Retangulo"},
      {link: "alunos", titulo: "Alunos"},
      {link: "cadastro-treino", titulo: "Cadastro-Treino"},
      {link: "lista-turmas", titulo: "Lista-Turmas"},
    ]
  }
}
