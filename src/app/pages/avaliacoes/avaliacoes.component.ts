import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-avaliacoes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './avaliacoes.component.html',
  styleUrls: ['./avaliacoes.component.css']
})
export class AvaliacoesComponent {
  notaSelecionada = 0;
  comentario = '';

  selecionarNota(nota: number): void {
    this.notaSelecionada = nota;
  }

  enviarComentario(): void {
    if (this.notaSelecionada === 0 || this.comentario.trim() === '') {
      alert('Por favor, selecione uma nota e escreva um comentário.');
      return;
    }
  }
}
