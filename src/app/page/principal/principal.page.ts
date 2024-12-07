import { ApiService } from 'src/app/servicio/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserModel } from 'src/app/models/usuario';
import { FirebaseService } from 'src/app/servicio/firebase.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  
  email: string="";
  usuario:UserModel[]=[];
  vehiculos:any[]=[]; 

  constructor(private firebase:FirebaseService, private router:Router, private activate:ActivatedRoute,private actionSheetController: ActionSheetController, private apiservice:ApiService) { 
    this.activate.queryParams.subscribe(params => {
      this.email = params['email']; 
      console.log('email2',this.email)
    })
  }
 
  ngOnInit() { 
    this.btnObtenerVehiculos();
  }

  goToCuenta() {
    this.router.navigate(['/cuenta']);
  }
  
  async logout(){
    await this.firebase.logout();
    this.router.navigateByUrl('login')
  }

  async btnRegistrarVehiculo(){
    const navigationExtras:NavigationExtras = {
      queryParams: {email: this.email}
    };
    this.router.navigate(['/agregar-vehiculo'], navigationExtras);
  }


  async btnObtenerVehiculos(){
    this.vehiculos = await this.apiservice.obtenerVehiculo();
  }


}
