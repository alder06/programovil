import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AngularFireAuthGuard, redirectUnauthorizedTo}from '@angular/fire/compat/auth-guard';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { CameraComponent } from './component/camera/camera.component';

const redireccionarlogin = () => redirectUnauthorizedTo('/login');

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'principal',
    canActivate:[AngularFireAuthGuard],data:{authGuardPipe:redireccionarlogin},//VALIDA SI ME HE LOGEADO
    loadChildren:() => import('./page/principal/principal.module').then(m => m.PrincipalPageModule)
  },

  {
    path: 'registrar',
    loadChildren: () => import('./page/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },

  {
    path: 'recuperar',
    loadChildren: () => import('./page/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  
  {
    path: 'apitest',
    loadChildren: () => import('./page/apitest/apitest.module').then( m => m.ApitestPageModule)
  },

  // Ruta ajustada para la página de cuenta
  {
    path: 'cuenta',
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redireccionarlogin },
    loadChildren: () => import('./page/cuenta/cuenta.module').then(m => m.CuentaPageModule)
  },

  {
    path: 'camera',
    component: CameraComponent
  },

  { path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
