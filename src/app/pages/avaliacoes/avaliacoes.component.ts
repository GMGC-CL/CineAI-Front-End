import { Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { EstadoService } from '../../services/estado.service';
import { CadastroService, Filme, Genero } from '../../services/cadastro.services';
import { ApiService } from '../../services/api.service';
import { FilmePopupComponent } from '../../core/filme-popup/filme-popup.component';

interface DadosPagina {
  filmesIndicados: Filme[];
  filmesGeneros: Filme[];
  filmesTops: Filme[];
}

@Component({
  selector: 'app-avaliacoes',
  standalone: true,
  imports: [CommonModule, FilmePopupComponent],
  templateUrl: './avaliacoes.component.html',
  styleUrls: ['./avaliacoes.component.css'],
})
export class AvaliacoesComponent {
  generos: Genero[] = [];
  filmesSelecionados: Filme[] = [];
  idUser: string | undefined;

  meusDados: DadosPagina | null = null;
  filmesIndicados: Filme[] = [];
  filmesGeneros: Filme[] = [];
  filmesTops: Filme[] = [];
  filmesAvaliados: Filme[] = [];

  @ViewChild('popup', { static: false }) popupComponent!: FilmePopupComponent;

  constructor(
    private cadastroService: CadastroService,
    private movieService: ApiService,
    private router: Router,
    private estadoService: EstadoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.generos = this.cadastroService.generos;
    this.filmesSelecionados = this.cadastroService.filmesSelecionados;

    if (isPlatformBrowser(this.platformId)) {
      const dados = this.cadastroService.dadosCadastro;
      if (dados?.idUser) {
        this.idUser = dados.idUser;
      } else {
        console.warn('⚠️ dadosCadastro ou idUser está vazio.');
      }
    }
  }

  ngOnInit(): void {
    if (this.estadoService.dadosPagina) {
      const dados = this.estadoService.dadosPagina as DadosPagina;
      this.meusDados = dados;
      this.filmesIndicados = dados.filmesIndicados || [];
      this.filmesTops = dados.filmesTops || [];
      this.filmesGeneros = dados.filmesGeneros || [];
    }

    if (this.idUser) {
      this.CarregarFilmesAvaliados();
    }
  }

  salvarEstado(): void {
    this.estadoService.dadosPagina = this.meusDados;
  }

  atualizarMeusDados(): void {
    this.meusDados = {
      filmesIndicados: this.filmesIndicados,
      filmesTops: this.filmesTops,
      filmesGeneros: this.filmesGeneros,
    };
    this.salvarEstado();
  }

CarregarFilmesAvaliados(): void {
  if (!this.idUser) return;

  this.movieService.get_avaliacoes_usuario(Number(this.idUser)).subscribe((avaliacoes: any) => {
    const lista = avaliacoes.avaliacoes || [];

    if (!lista.length) {
      this.filmesAvaliados = [];
      return;
    }

    const filmesIds: string[] = lista.map(
      (a: { id_filme_tmdb: number }) => a.id_filme_tmdb.toString()
    );

    const requests: Observable<Filme>[] = filmesIds.map((id: string) =>
      this.movieService.get_film_by_id(id)
    );

    console.log('IDs para buscar:', filmesIds);

    forkJoin(requests).subscribe({
      next: (filmes: Filme[]) => {
        // Garantir que seja um array plano de objetos Filme
        this.filmesAvaliados = filmes.flat().filter(Boolean);
        console.log('Filmes avaliados finais:', this.filmesAvaliados);
      },
      error: (err) => {
        console.error('Erro ao buscar filmes por ID:', err);
      }
    });
  });
}

  abrirPopup(filme: any): void {
    console.log('Abrindo popup do filme:', filme);
    if (!filme?.id_filme_tmdb) {
      console.error('Filme inválido ou sem ID', filme);
      return;
    }
    this.popupComponent.open(filme.id_filme_tmdb.toString(), this.cadastroService.dadosCadastro);
  }

  logout(): void {
    this.cadastroService.limparDadosUsuario();
    this.router.navigate(['/login']);
  }
}
