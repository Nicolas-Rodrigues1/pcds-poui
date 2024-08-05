import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './autenticacao/login/login.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./autenticacao/autenticacao.module').then(m => m.AutenticacaoModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: '/pagina-nao-encontrada',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
