import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatTooltipModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  title = 'Boxboost';

  constructor(private http: HttpClient) {}
  private auth = inject(AuthService);
  private router = inject(Router);


  ngOnInit() {
    this.http.get('http://localhost:3000/', {responseType: 'text'})
      .subscribe({
        next: (data) => console.log('Respuesta backend:', data),
        error: (err) => console.error('Error:', err)
      });
    this.auth.isLoggedIn() ? this.router.navigate(['/home']) : this.router.navigate(['/login']);
  }
}
