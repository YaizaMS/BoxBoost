import { Component, inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  userExists = 'El usuario ya existe';


  private service = inject(RegisterService);
  

  validarRegistro(){
    //this.camposVacios();
    //this.validarCorreo();
    //this.validarFecha();
    //this.validacionContraseña();
  }

  camposVacios(){
    if (this.registro.nombre === '' || this.registro.nombre == null || this.registro.nombre == undefined) {
      Swal.fire({ title: "Error de registro", icon: "error", text: "El nombre no puede estar vacio", draggable: true });
    } else if (!this.registro.apellidos) {
      Swal.fire({ title: "Error de registro", icon: "error", text: "El apellidos no puede estar vacio", draggable: true });
    } else if (!this.registro.email) {
      Swal.fire({ title: "Error de registro", icon: "error", text: "El email no puede estar vacio", draggable: true });
    } else if (this.registro.edad === null) {
      Swal.fire({ title: "Error de registro", icon: "error", text: "Debes agregar una fecha de nacimiento", draggable: true });
    } else if (this.usuario.user === '') {
      Swal.fire({ title: "Error de registro", icon: "error", text: "El usuario no puede estar vacio", draggable: true });
    } else if (this.usuario.pass === '') {
      Swal.fire({ title: "Error de registro", icon: "error", text: "La contraseña no puede estar vacia", draggable: true });
    } else if (this.confirmacionPass === '') {
      Swal.fire({ title: "Error de registro", icon: "error", text: "La confirmación de contraseña no puede estar vacia", draggable: true });
    } else{
      console.log(this.registro, this.usuario, this.confirmacionPass)
    }
  }

  validarCorreo() : boolean{
    let valido = false;
    let emailExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if(emailExp.test(this.registro.email)){
      valido = true;
    }else{
      Swal.fire({ title: "Error de registro", icon: "error", text: "El email no es valido", draggable: true });
    }

    return valido;
    
  }

  validarFecha(){
    if (this.registro.edad === null) return;

    const hoy = new Date();
    const fecha = new Date(this.registro.edad);
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const mes = hoy.getMonth() - fecha.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
       if (edad < 15) {
      Swal.fire({ title: "Error de registro", icon: "error", text: "Debes ser mayor de 15 años", draggable: true });
       }
    }else{
      return
    }
  }

  validacionUsuario(){
    

  }

  validacionContraseña():boolean{
    if(this.confirmacionPass === this.usuario.pass){
      return true;
    }else{
      Swal.fire({ title: "Error de registro", icon: "error", text: "Las contraseñas no coinciden", draggable: true });
      this.confirmacionPass = '';
      this.usuario.pass = '';
      return false;
    }
  }

  registrar() {
    if (this.registro.edad === null) return;

    this.service.registrar(this.registro).subscribe({
      next: res =>
        Swal.fire({
          title: "Registro exitoso",
          icon: "success",
          text: "El usuario ha sido registrado con éxito",
          draggable: true
        }),
      error: err => {
        Swal.fire({
          title: "Error en el registro",
          icon: "error",
          text: "Hubo un problema al registrar el usuario. Inténtalo de nuevo.",
          draggable: true
        });
        console.error('Error:', err);
      }
    });
  }


}
