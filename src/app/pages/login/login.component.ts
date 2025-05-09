import { Component,  } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';



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

  validEmail  = 'teste@teste.com';
  validPassword = '123';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.email && this.password) {
      // Verificando se as credenciais são válidas
      if (this.email === this.validEmail && this.password === this.validPassword) {
        alert('Login realizado com sucesso!');
        // Redireciona para a página /home
        this.router.navigate(['/home']);
      } else {
        alert('Credenciais inválidas. Tente novamente.');
      }
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }
}
