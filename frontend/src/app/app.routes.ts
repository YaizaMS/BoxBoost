import { RouterModule, Routes } from '@angular/router';

import { ChatComponent } from './dashboard/chat/chat.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './dashboard/perfil/perfil.component';
import { RegisterComponent } from './registro/registro.component';
import { CuestionarioComponent } from './Cuestionario/cuestionario/cuestionario.component';
import { SeleccionComponent } from './Cuestionario/seleccion/seleccion.component';
import { EjerciciosComponent } from './dashboard/ejercicios/ejercicios.component';
import { InformacionComponent } from './dashboard/informacion/informacion.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registro',
    component: RegisterComponent
  },
  { path: 'cuestionario', 
    component: CuestionarioComponent 
  },
  {
    path: 'seleccion', component: SeleccionComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'ejercicios', component: EjerciciosComponent },
      { path: 'informacion', component: InformacionComponent }
    ]
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
