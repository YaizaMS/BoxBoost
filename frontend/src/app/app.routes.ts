import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from './dashboard/chat/chat.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './dashboard/perfil/perfil.component';
import { RegisterComponent } from './registro/registro.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },{
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'perfil', component: PerfilComponent }
    ]
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
