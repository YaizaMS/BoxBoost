import { Component, inject } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [MatTooltipModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private authService = inject(AuthService);
  private router = inject(Router);
  
  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
