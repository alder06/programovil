import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarVehiculosPage } from './listar-vehiculos.page';

const routes: Routes = [
  {
    path: '',
    component: ListarVehiculosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarVehiculosPageRoutingModule {}
