import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit {

  nombreUsuario = localStorage.getItem('user');

  private auth = inject(AuthService);

  ngOnInit(): void {
    //this.auth.getLoggedUser();
    console.log(this.nombreUsuario);
  }
}
