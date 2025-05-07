import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './registro/registro.component';
import { HomeComponent } from './dashboard/home/home.component';

export const routes: Routes = [
   
    {
        path: "",
        redirectTo: '/login',
        pathMatch: "full"
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: "",
        redirectTo: '/register',
        pathMatch: "full"
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    }
];
export const routing = RouterModule.forRoot(routes);