import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

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
  @Input() filmeId: string = '';
  @Input() filmeCapa: string = '';
  @Input() filmeNota: number = 0;
  @Input() avaliacoes: any[] = [];
  
  dados = '';

  visible: boolean = false;

  notaSelecionada = 0;
  comentario = '';

  constructor(private apiService: ApiService) {}

  open(filmeId: string, dados: any): void {
    this.filmeId = filmeId;
    this.dados = dados.user;
    this.visible = true;
    console.log(this.filmeId);
    console.log(this.dados);


    // Buscar detalhes do filme
    this.apiService.get_film_by_id(filmeId).subscribe({
      next: (filmes: any[]) => {
        if (filmes && filmes.length > 0) {
          const filme = filmes[0];
          this.filmeTitulo = filme.titulo;
          this.filmeDescricao = filme.sinopse;
          this.filmeNota = filme.media_votos;
          this.filmeCapa = 'https://image.tmdb.org/t/p/w500' + filme.caminho_poster;
        }
      },
      error: err => {
        console.error('Erro ao buscar detalhes do filme:', err);
      }
    });

    // Buscar detalhes do filme
    this.apiService.get_rates(filmeId).subscribe({next: avaliacoes => {
      if (Array.isArray(avaliacoes)) {
      // Encontra a avaliação mais recente do usuário em uma única operação
        const avaliacaoUsuario = avaliacoes.filter(av => av.id_usuario === this.dados)
          .sort((a, b) => new Date(b.data_avaliacao).getTime() - new Date(a.data_avaliacao).getTime())[0];
          console.log(avaliacoes);

          if (avaliacaoUsuario) {
            this.avaliacoes = [avaliacaoUsuario]; // coloca como array com 1 item
            this.notaSelecionada = avaliacaoUsuario.nota;
            this.comentario = avaliacaoUsuario.comentario;
            console.log("Usuário " + this.dados + " " + typeof this.dados);
            console.log(this.avaliacoes);
          } else {
            // Nenhuma avaliação do usuário atual
            this.avaliacoes = [{
              nota: 0,
              comentario: '',
              id_usuario: this.dados,
              id_filme_tmdb: filmeId,
              data_avaliacao: '',
              id_avaliacao: null
            }];
            this.notaSelecionada = 0;
            this.comentario = '';
          }

        } else {
          this.avaliacoes = [{
            nota: 0,
            comentario: '',
            id_usuario: this.dados,
            id_filme_tmdb: filmeId,
            data_avaliacao: '',
            id_avaliacao: null
          }];
          this.notaSelecionada = 0;
          this.comentario = '';
        }
      },
      error: err => {
        console.warn('Erro ao buscar avaliações:', err);
        this.avaliacoes = [{
          nota: 0,
          comentario: '',
          id_usuario: this.dados,
          id_filme_tmdb: filmeId,
          data_avaliacao: '',
          id_avaliacao: null
        }];
        this.notaSelecionada = 0;
        this.comentario = '';
      }
    });
  }

  close(): void {
    this.visible = false;
  }

  selecionarNota(nota: number): void {
    this.notaSelecionada = nota;
  }

  salvarAvaliacao(): void {
    if (!this.avaliacoes[0]?.nota) {
      alert('Por favor, selecione uma nota antes de salvar.');
      return;
    }
    console.log(this.avaliacoes)
    const avaliacao = this.avaliacoes[0];
    
    this.apiService.post_rate_user(
      this.filmeId,
      this.dados,
      avaliacao.nota,
      avaliacao.comentario
    ).subscribe({
      next: (response) => {
        console.log('Sucesso:', response);
        alert('Avaliação salva com sucesso!');
        this.close();
      },
      error: (err) => {
        console.error('Erro:', err);
        alert('Erro ao salvar. Tente novamente.');
      }
    });
  }
}
