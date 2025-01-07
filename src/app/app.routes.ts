import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    // {path:'login' , redirectTo:'/login', pathMatch:'full'},
    {path:'register', component:RegisterComponent},
    {path:'forgotpassword',component:ForgotPasswordComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'profile',component:ProfileComponent},
];
