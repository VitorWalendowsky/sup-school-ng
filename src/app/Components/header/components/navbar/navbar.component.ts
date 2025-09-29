import { Component, Input, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Calculadora } from '../../../calculadora/calculadora';

export interface NavbarMenu {
  link: string;
  titulo: string;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  // input = entrada
  // output = saída

  @Input() menus: NavbarMenu[] = [];
}
