import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'navbar',
  imports: [Menubar],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})

export class Navbar {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Início',
        icon: 'pi pi-home',
        routerLink: "/"
      },
      {
        label: 'Cadastros',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Autores',
            icon: 'pi pi-users',
            routerLink: 'autores'
          },
          {
            label: 'Categorias',
            icon: 'pi pi-list',
            routerLink: 'categorias'
          },
          {
            label: 'Livros',
            icon: 'pi pi-book',
            routerLink: 'livros'
          },
          {
            label: 'Usuários',
            icon: 'pi pi-user',
            routerLink: 'usuarios'
          },
          {
            label: 'Empréstimo',
            icon: 'pi pi-barcode',
            routerLink: 'emprestimos'
          },
        ]
      },
      {
        label: 'Escola',
        icon: 'pi pi-pencil',
        items: [
          {
            label: 'Alunos',
            icon: 'pi pi-graduation-cap',
            routerLink: 'alunos'
          },
          {
            label: 'Cursos',
            icon: 'pi pi-address-book',
            routerLink: 'cursos'
          }
        ]
      }
    ]
  }
}
