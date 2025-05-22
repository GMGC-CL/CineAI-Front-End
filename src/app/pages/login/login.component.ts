import { Component,  } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CadastroService} from '../../services/cadastro.services';
import { EstadoService } from '../../services/estado.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule],
  standalone: true
})

export class LoginComponent {
  email: string = '';
  password: string = '';


  constructor(private router: Router, private loginService: ApiService,private cadastroService: CadastroService,private estadoService: EstadoService) {
    this.estadoService.dadosPagina = null;
  }

  onSubmit() {
    if (this.email && this.password) {
      this.loginService.login(this.email, this.password).subscribe({
        next: (response) => {
          // Supondo que a API retorne sucesso
        const dadosCadastro = {
        idUser:response.id,
      };
          this.cadastroService.dadosCadastro = dadosCadastro
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }
}

