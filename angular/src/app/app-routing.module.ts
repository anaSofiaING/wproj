import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PublicacionListaComponent } from './publicacion-lista/publicacion-lista.component';
import { PublicacionDetallesComponent } from './publicacion-detalles/publicacion-detalles.component';
import { AddPublicacionComponent } from './add-publicacion/add-publicacion.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';

const routes: Routes = [
  //{ path: 'home', component: HomeComponent },
  { path: 'home', component: PublicacionListaComponent },
  { path: 'publicacion/:id', component: PublicacionDetallesComponent},
  { path: 'agregar', component: AddPublicacionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'contacto', component: BoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
