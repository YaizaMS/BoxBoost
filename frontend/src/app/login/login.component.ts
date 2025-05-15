import { Component, inject } from '@angular/core';
import { InputComponent } from "../../components/input/input";
import { Router, RouterModule } from '@angular/router';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usuario = {
    user: '',
    pass: ''
  };

  private router = inject(Router);
  private auth = inject(AuthService);

  camposVacios(): boolean {
    if (this.usuario.user.trim() === '' || this.usuario.pass.trim() === '') {
      Swal.fire({ title: "Error de inicio de sesión", icon: "error", text: "El usuario o la contraseña no puede estar vacío", draggable: true });
      return false;
    }
    return true;
  }

  login() {
    if (this.camposVacios()) {
      this.auth.login(this.usuario).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/dashboard/home']);
        },
        error: (err) => {
          Swal.fire({
            title: "Error de inicio de sesión",
            icon: "error",
            text: "Hubo un problema al iniciar sesión. Inténtalo de nuevo.",
            draggable: true
          });
          console.error('Error:', err);
        }
      })
    }
  }
}
