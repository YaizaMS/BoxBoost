import { Component } from '@angular/core';
import { InputComponent } from "../../components/input/input";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{

  
  constructor(private router: Router) {}

  
}
