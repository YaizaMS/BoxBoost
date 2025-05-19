import { Component, inject } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { InputComponent } from '../../components/input/input';
import { RegisterService } from './registro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [RouterModule, InputComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegisterComponent {

  registro = {
    nombre: '',
    apellidos: '',
    edad: null as Date | null,
    email: ''
  };

  usuario = {
    user: '',
    pass: ''
  };

  confirmacionPass = '';
  txtUserExists = false;

  private service = inject(RegisterService);
  private router = inject(Router);


  camposVacios(): boolean {
    if (this.registro.nombre.trim() === '') {
      Swal.fire({ title: "Error de registro", icon: "error", text: "El nombre no puede estar vacio" });
      return false;
    } else if (!this.registro.apellidos.trim()) {
      Swal.fire({ title: "Error de registro", icon: "error", text: "El apellidos no puede estar vacio" });
      return false;
    } else if (!this.registro.email.trim()) {
      Swal.fire({ title: "Error de registro", icon: "error", text: "El email no puede estar vacio" });
      return false;
    } else if (this.registro.edad === null) {
      Swal.fire({ title: "Error de registro", icon: "error", text: "Debes agregar una fecha de nacimiento" });
      return false;
    } else if (this.usuario.user.trim() === '') {
      Swal.fire({ title: "Error de registro", icon: "error", text: "El usuario no puede estar vacio" });
      return false;
    } else if (this.usuario.pass.trim() === '') {
      Swal.fire({ title: "Error de registro", icon: "error", text: "La contraseña no puede estar vacia" });
      return false;
    } else if (this.confirmacionPass.trim() === '') {
      Swal.fire({ title: "Error de registro", icon: "error", text: "La confirmación de contraseña no puede estar vacia" });
      return false;
    } else {
      return true;
    }
  }

  validarCorreo(): boolean {
    let valido = false;
    let emailExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (emailExp.test(this.registro.email)) {
      valido = true;
    } else {
      Swal.fire({ title: "Error de registro", icon: "error", text: "El email no es valido", });
    }

    return valido;

  }

  validarFecha(): boolean {
    if (this.registro.edad === null) return false;

    const hoy = new Date();
    const fechaNacimiento = new Date(this.registro.edad);

    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }

    if (edad < 15) {
      Swal.fire({
        title: "Error de registro",
        icon: "error",
        text: "Debes ser mayor de 15 años",
      });
      return false;
    }

    return true;
  }

  //Esta vacio
  validacionUsuario() {

    /*this.service.validarUsuario(this.usuario.user).subscribe( {
      next: res => {
        
    },
      error: err => {
      }
    });*/


  }

  validacionContrasenya(): boolean {

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    if (regex.test(this.usuario.pass)) {
      if (this.confirmacionPass === this.usuario.pass) {
        return true;
      } else {
        Swal.fire({ title: "Error de registro", icon: "error", text: "Las contraseñas no coinciden", });
        this.confirmacionPass = '';
        this.usuario.pass = '';
        return false;
      }
    } else {
      Swal.fire({ title: "Error de registro", icon: "error", text: "La contraseña debe contener minimo 8 caracteres y al menos una letra mayúscula, una letra minúscula, un número y un carácter especial", });
      this.usuario.pass = '';
      this.confirmacionPass = '';
      return false;
    }
  }

  validarRegistro() {
    const camposValidos = this.camposVacios();
    const correoValido = this.validarCorreo();
    const fechaValida = this.validarFecha();
    const passValida = this.validacionContrasenya();

    if (camposValidos && correoValido && fechaValida && passValida) {
      this.registrar();
    }

  }
  registrar() {
    if (this.registro.edad === null) return;

    this.service.registrar(this.registro, this.usuario).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.id);
        this.router.navigate(['/seleccion']);
      },
      error: (err) => {
        const mensajeError = err?.error?.error;

        if (mensajeError === 'El usuario ya existe') {
          Swal.fire({
            title: "Nombre de usuario en uso",
            icon: "warning",
            text: "Ese nombre de usuario ya está registrado. Por favor elige otro.",
          });
        } else {
          Swal.fire({
            title: "Error en el registro",
            icon: "error",
            text: "Hubo un problema al registrar el usuario. Inténtalo de nuevo.",
          });
        }

        console.error('Error:', err);
      }
    });
  }
}
