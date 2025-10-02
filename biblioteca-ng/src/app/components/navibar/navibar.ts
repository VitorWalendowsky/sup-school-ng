import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'navibar',
  imports: [Menubar],
  templateUrl: './navibar.html',
  styleUrl: './navibar.scss',
})
export class Navibar {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label: 'Cadastros',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Autores',
            icon: 'pi pi-users',
          },
          {
            label: 'Categorias',
            icon: 'pi pi-list',
            routerLink: "categorias",
          },
          {
            label: 'Livros',
            icon: 'pi pi-book',
          },
          {
            label: 'Usuários',
            icon: 'pi pi-user',
          },
        ],
      },
        ];
  }
}
