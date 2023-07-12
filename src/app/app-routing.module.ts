import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProfilComponent } from './profil/profil.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SignupComponent,
    title: 'Sign up'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Accueil',
    canActivate: [AuthGuard]
  },
  {
    path:'profil',
    component: ProfilComponent,
    title:'Profil',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule, DragDropModule]
})
export class AppRoutingModule { }
