import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicio/api.service';

@Component({
  selector: 'app-listar-vehiculos',
  templateUrl: './listar-vehiculos.page.html',
  styleUrls: ['./listar-vehiculos.page.scss'],
})
export class ListarVehiculosPage implements OnInit {

  constructor(private apiservice:ApiService) { }
  
  vehiculos:any[]=[];

  ngOnInit() {
    
  }


}
