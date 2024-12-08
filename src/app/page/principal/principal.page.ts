import { ApiService } from 'src/app/servicio/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserModel } from 'src/app/models/usuario';
import { FirebaseService } from 'src/app/servicio/firebase.service';
import { ActionSheetController, AlertController } from '@ionic/angular'; 
import { StorageService } from 'src/app/servicio/storage.service'; 

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  email: string = '';
  id_usuario: string = ''; 
  usuario: UserModel[] = []; 
  vehiculo: any[] = []; 

  constructor(
    private firebase: FirebaseService,
    private router: Router,
    private activate: ActivatedRoute,
    private actionSheetController: ActionSheetController,
    private apiservice: ApiService,
    private storage: StorageService, 
    private alertController: AlertController
  ) {
    this.activate.queryParams.subscribe(params => {
      this.email = params['email'];
      this.id_usuario = params['id_usuario']; 
      console.log('Email:', this.email);
      console.log('ID Usuario:', this.id_usuario);
    });
  }

  ngOnInit() { 
    this.cargarUsuario();
  }

  goToCuenta() {
    this.router.navigate(['/cuenta']);
  }

  async logout(){
    await this.firebase.logout();
    this.router.navigateByUrl('login');
  }

  async cargarUsuario() {
    try {
      const dataStorage = await this.storage.obtenerStorage();
      const req = await this.apiservice.obtenerUsuario({
        p_correo: this.email,
        token: dataStorage[0].token,
      });

      if (req && req.data.length > 0) {
        this.usuario = req.data;
        console.log('Usuario cargado:', this.usuario);
      } else {
        console.error('No se encontraron datos del usuario.');
        this.popAlert('Error', 'No se pudo cargar la información del usuario.');
      }
    } catch (error) {
      console.error('Error al cargar usuario:', error);
      this.popAlert('Error', 'Hubo un problema al cargar los datos del usuario.');
    }
  }

  async btnRegistrarVehiculo() {
    const navigationExtras: NavigationExtras = { queryParams: { email: this.email, id_usuario: this.id_usuario } };
    this.router.navigate(['/agregar-vehiculo'], navigationExtras);
  }

  async ObtenerVehiculos() {
    try {
      const dataStorage = await this.storage.obtenerStorage();
      if (!this.usuario || this.usuario.length === 0) {
        console.error('Usuario no definido o vacío.');
        this.popAlert('Error', 'Usuario no definido o vacío.');
        return;
      }

      const req = await this.apiservice.obtenerVehiculo({
        p_id: this.usuario[0].id_usuario,
        token: dataStorage[0].token,
      });

      if (req && req.data.length > 0) {
        this.vehiculo = req.data;
        console.log('Vehículos cargados:', this.vehiculo);

        const navigationExtras: NavigationExtras = { queryParams: { email: this.email, id_usuario: this.id_usuario } };
        this.router.navigate(['/ver-vehiculos'], navigationExtras);
      } else {
        console.error('No hay vehículos registrados.');
        this.popAlert('Error', 'No hay vehículos registrados.');
      }
    } catch (error) {
      console.error('Error al obtener vehículos:', error);
      this.popAlert('Error', 'Error al obtener vehículos.');
    }
  }

  async popAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
