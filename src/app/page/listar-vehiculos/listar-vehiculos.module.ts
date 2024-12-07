import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarVehiculosPageRoutingModule } from './listar-vehiculos-routing.module';

import { ListarVehiculosPage } from './listar-vehiculos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarVehiculosPageRoutingModule
  ],
  declarations: [ListarVehiculosPage]
})
export class ListarVehiculosPageModule {}
