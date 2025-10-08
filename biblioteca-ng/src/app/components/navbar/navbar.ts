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
            routerLink: "autores",
          },
          {
            label: 'Categorias',
            icon: 'pi pi-list',
            routerLink: "categorias"
          },
          {
            label: 'Livros',
            icon: 'pi pi-book'
          },
          {
            label: 'Usuários',
            icon: 'pi pi-user'
          },
        ]
      },
    ]
  }

}
