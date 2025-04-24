import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Genero {
  id: string;
  nome: string;
  selecionado: boolean;
  filmesSelecionados: Filme[];
}

interface Filme {
  id: number;
  titulo: string;
  genero: string;
  avaliacao: number;
}

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule, CommonModule, RouterModule],
  standalone: true,
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  generos: Genero[] = [
    { id: 'terror', nome: 'Terror', selecionado: false, filmesSelecionados: [] },
    { id: 'romance', nome: 'Romance', selecionado: false, filmesSelecionados: [] },
    { id: 'fantasia', nome: 'Fantasia', selecionado: false, filmesSelecionados: [] },
    { id: 'ficcao', nome: 'Ficção científica', selecionado: false, filmesSelecionados: [] },
    { id: 'comedia', nome: 'Comédia', selecionado: false, filmesSelecionados: [] },
    { id: 'drama', nome: 'Drama', selecionado: false, filmesSelecionados: [] },
    { id: 'acao', nome: 'Ação', selecionado: false, filmesSelecionados: [] }
  ];

  generoSelecionado: Genero | null = null;
  filmesPorGenero: Filme[] = [];
  filmesSelecionados: Filme[] = [];

  private filmesMock: { [key: string]: Filme[] } = {
    terror: [
      { id: 1, titulo: 'O Exorcista', genero: 'terror', avaliacao: 4.2 },
      { id: 2, titulo: 'O Iluminado', genero: 'terror', avaliacao: 4.5 },
      { id: 3, titulo: 'Invocação do Mal', genero: 'terror', avaliacao: 4.1 },
      { id: 4, titulo: 'Corra!', genero: 'terror', avaliacao: 4.3 },
      { id: 5, titulo: 'Hereditário', genero: 'terror', avaliacao: 4.0 },
      { id: 6, titulo: 'O Babadook', genero: 'terror', avaliacao: 3.9 },
      { id: 7, titulo: 'Sexta-Feira 13', genero: 'terror', avaliacao: 3.8 },
      { id: 8, titulo: 'A Bruxa', genero: 'terror', avaliacao: 4.1 }
    ],
    romance: [
      { id: 9, titulo: 'Diário de uma Paixão', genero: 'romance', avaliacao: 4.3 },
      { id: 10, titulo: 'Titanic', genero: 'romance', avaliacao: 4.5 },
      { id: 11, titulo: 'A Culpa é das Estrelas', genero: 'romance', avaliacao: 4.0 },
      { id: 12, titulo: 'Simplesmente Acontece', genero: 'romance', avaliacao: 3.9 }
    ],
    fantasia: [
      { id: 13, titulo: 'O Senhor dos Anéis', genero: 'fantasia', avaliacao: 4.8 },
      { id: 14, titulo: 'Harry Potter', genero: 'fantasia', avaliacao: 4.6 },
      { id: 15, titulo: 'O Hobbit', genero: 'fantasia', avaliacao: 4.2 }
    ],
    ficcao: [
      { id: 16, titulo: 'Interestelar', genero: 'ficcao', avaliacao: 4.7 },
      { id: 17, titulo: 'Matrix', genero: 'ficcao', avaliacao: 4.5 },
      { id: 18, titulo: 'Blade Runner 2049', genero: 'ficcao', avaliacao: 4.3 }
    ],
    comedia: [
      { id: 19, titulo: 'Se Beber, Não Case!', genero: 'comedia', avaliacao: 4.1 },
      { id: 20, titulo: 'As Branquelas', genero: 'comedia', avaliacao: 4.0 },
      { id: 21, titulo: 'Debi & Lóide', genero: 'comedia', avaliacao: 4.2 }
    ],
    drama: [
      { id: 22, titulo: 'Um Sonho de Liberdade', genero: 'drama', avaliacao: 4.9 },
      { id: 23, titulo: 'O Poderoso Chefão', genero: 'drama', avaliacao: 4.8 },
      { id: 24, titulo: 'Cidadão Kane', genero: 'drama', avaliacao: 4.7 }
    ],
    acao: [
      { id: 25, titulo: 'John Wick', genero: 'acao', avaliacao: 4.3 },
      { id: 26, titulo: 'Duro de Matar', genero: 'acao', avaliacao: 4.2 },
      { id: 27, titulo: 'Mad Max: Estrada da Fúria', genero: 'acao', avaliacao: 4.4 }
    ]
  };

  onGeneroChange(genero: Genero): void {
    genero.selecionado = !genero.selecionado;
    if (genero.selecionado) {
      this.generoSelecionado = genero;
      this.filmesPorGenero = this.filmesMock[genero.id] || [];
      this.filmesSelecionados = [...genero.filmesSelecionados];
    } else {
      genero.filmesSelecionados = [];
    }
  }

  toggleFilmeSelecionado(filme: Filme): void {
    const index = this.filmesSelecionados.findIndex(f => f.id === filme.id);
    
    if (index > -1) {
      this.filmesSelecionados.splice(index, 1);
    } else if (this.filmesSelecionados.length < 3) {
      this.filmesSelecionados.push(filme);
    }
  }

  isFilmeSelecionado(filme: Filme): boolean {
    return this.filmesSelecionados.some(f => f.id === filme.id);
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
        generosPreferidos: this.generos.filter(g => g.selecionado),
        filmesPreferidos: this.getTodosFilmesSelecionados()
      };
      console.log('Dados do cadastro:', dadosCadastro);
      // Aqui você pode adicionar a lógica para enviar os dados
    }
  }

  private getTodosFilmesSelecionados(): Filme[] {
    return this.generos
      .filter(g => g.selecionado)
      .flatMap(g => g.filmesSelecionados);
  }
}