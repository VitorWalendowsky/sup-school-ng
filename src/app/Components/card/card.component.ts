import { Component } from '@angular/core';

@Component({
  selector: 'card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
//ng g c card
imagem: string;
nome: string;
numero: number;
tipoNome: string;
tipoCor: string;

}
