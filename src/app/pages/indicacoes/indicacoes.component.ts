import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-indicacoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './indicacoes.component.html',
  styleUrls: ['./indicacoes.component.css'],
})
export class IndicacoesComponent {
  perfilMatches = new Array(8);
  generoFav = new Array(8);
  recomendacaoRelaci = new Array(8);
}
