import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService, } from '../../services/api.service';
import { Router } from '@angular/router';
import { CadastroService,Filme,Genero } from '../../services/cadastro.services';
import { forkJoin } from 'rxjs';
import { EstadoService } from '../../services/estado.service';


@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, CommonModule, RouterModule],
  standalone: true,
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  
  generos: Genero[];
  filmesSelecionados: Filme[];


  constructor(private router: Router,private  MovieService: ApiService, private cadastroService: CadastroService,private estadoService: EstadoService) {
    this.generos = this.cadastroService.generos;
    this.filmesSelecionados = this.cadastroService.filmesSelecionados;
    this.estadoService.dadosPagina = null;
  }



  generoSelecionado: Genero | null = null;
  filmesPorGenero: Filme[] = [];


  
  onGeneroChange(genero: Genero): void {
    genero.selecionado = !genero.selecionado;

    if (genero.selecionado) {
      this.generoSelecionado = genero;

      this.MovieService.get_filme_genre(genero.id, '10').subscribe({
        next: (response: Filme[]) => {
          this.filmesPorGenero = response;
          this.filmesSelecionados = [...genero.filmesSelecionados];
        },
        error: (err) => {
          console.error('Erro ao buscar filmes:', err);
          this.filmesPorGenero = [];
        }
      });
    } else {
      genero.filmesSelecionados = [];

      if (this.generoSelecionado?.id === genero.id) {
        this.fecharModal();
      }
    }
  }


  toggleFilmeSelecionado(filme: Filme): void {
    const index = this.filmesSelecionados.findIndex(f => f.id_filme_tmdb === filme.id_filme_tmdb);
    
    if (index > -1) {
      this.filmesSelecionados.splice(index, 1);
    } else if (this.filmesSelecionados.length < 3) {
      this.filmesSelecionados.push(filme);
    }
  }

  isFilmeSelecionado(filme: Filme): boolean {
    return this.filmesSelecionados.some(f => f.id_filme_tmdb === filme.id_filme_tmdb);
  }

  confirmarFilmes(): void {
    if (this.generoSelecionado) {
      this.generoSelecionado.filmesSelecionados = [...this.filmesSelecionados];
      this.fecharModal();
    }
  }

  fecharModal(): void {
    this.generoSelecionado = null;
    this.filmesSelecionados = [];
  }



onSubmit(form: NgForm): void {
  if (form.valid) {
    const dadosCadastro = {
      nome: form.value.nome,
      email: form.value.email,
      senha: form.value.senha,
      idUser: "",
      generosPreferidos: this.generos.filter(g => g.selecionado),
      filmesPreferidos: this.getTodosFilmesSelecionados()
    };

    this.MovieService.registrar(dadosCadastro.nome, dadosCadastro.email, dadosCadastro.senha).subscribe({
      next: () => {
        this.MovieService.login(dadosCadastro.email, dadosCadastro.senha).subscribe({
          next: (loginResponse) => {
            dadosCadastro.idUser = loginResponse.id;
            // Criar array de observables para filmes
            const filmesRequests = dadosCadastro.filmesPreferidos.map(filme =>
              this.MovieService.put_preference(dadosCadastro.idUser, filme.id_filme_tmdb)
            );

            // Criar array de observables para gêneros
            const generosRequests = dadosCadastro.generosPreferidos.map(genero =>
              this.MovieService.put_genre_preference(dadosCadastro.idUser, genero.id)
            );

            // Juntar todas as requisições (filmes + gêneros)
            const todasRequisicoes = [...filmesRequests, ...generosRequests];

            forkJoin(todasRequisicoes).subscribe({
              next: (respostas) => {
                this.cadastroService.dadosCadastro = dadosCadastro
                console.log('Todos os gêneros e filmes foram registrados com sucesso:', respostas);
                this.router.navigate(['/home']);
              },
              error: (erro) => {
                console.error('Erro ao registrar gêneros ou filmes:', erro);
                alert('Erro ao registrar suas preferências. Tente novamente.');
              }
            });
          },
          error: (err) => {
            console.error('Erro no login:', err);
            alert('Erro ao fazer login após registro.');
          }
        });
      },
      error: (err) => {
        console.error('Erro no registro:', err);
        alert('Erro ao registrar usuário.');
      }
    });
  }
}


  private getTodosFilmesSelecionados(): Filme[] {
    return this.generos
      .filter(g => g.selecionado)
      .flatMap(g => g.filmesSelecionados);
  }
}