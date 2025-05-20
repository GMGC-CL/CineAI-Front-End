import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filme-popup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filme-popup.component.html',
  styleUrls: ['./filme-popup.component.css']
})
export class FilmePopupComponent {
  @Input() filmeTitulo: string = '';
  @Input() filmeDescricao: string = '';
  visible: boolean = false;

  notaSelecionada = 0;
  comentario = '';

  open(titulo: string, descricao: string): void {
    this.filmeTitulo = titulo;
    this.filmeDescricao = descricao;
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  selecionarNota(nota: number): void {
    this.notaSelecionada = nota;
  }

  enviarComentario(): void {
    if (this.notaSelecionada === 0 || this.comentario.trim() === '') {
      alert('Por favor, selecione uma nota e escreva um comentário.');
      return;
    }

    alert('Comentário enviado com sucesso!');
    this.notaSelecionada = 0;
    this.comentario = '';
  }
}
