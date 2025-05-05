import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './registro/registro.component';

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
    }
];
export const routing = RouterModule.forRoot(routes);