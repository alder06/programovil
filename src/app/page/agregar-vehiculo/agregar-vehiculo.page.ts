import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/servicio/api.service';
import { StorageService } from 'src/app/servicio/storage.service';
import { AlertController } from '@ionic/angular'; 
import { UserModel } from 'src/app/models/usuario';

@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.page.html',
  styleUrls: ['./agregar-vehiculo.page.scss'],
})
export class AgregarVehiculoPage implements OnInit {

  email: string = "";
  usuario: UserModel[] = [];
  id_usuario: string = ""; 
  patente: string = "";
  marca: string = "";
  modelo: string = "";
  anio: number = 0;
  color: string = "";
  tipo_combustible: string = "";
  archivoImagen: File | null = null;

  token: string = '';

  constructor(
    private apiservice: ApiService,
    private storage: StorageService,
    private activate: ActivatedRoute,
    private router: Router,
    private alertController: AlertController 
  ) { 
    this.activate.queryParams.subscribe(params => {
      this.email = params['email'];
      this.id_usuario = params['id_usuario']; 
      console.log('Email recibido:', this.email);
      console.log('id_usuario recibido:', this.id_usuario);

      if (!this.id_usuario) {
        console.error('id_usuario no se recibió correctamente en agregar-vehiculo.');
        this.popAlert('Error', 'id_usuario no se recibió correctamente.');
      }
    });
  }

  ngOnInit() {
    this.cargarUsuario();
  }

  async cargarUsuario(){
    let dataStorage = await this.storage.obtenerStorage();    
    const req = await this.apiservice.obtenerUsuario(
      {
        p_correo: this.email,
        token: dataStorage[0].token
      }
    );
    this.usuario = req.data;
    console.log('Usuario cargado en agregar-vehiculo:', this.usuario);
  }

  async registrarVehiculo() {
    try {
      let dataStorage = await this.storage.obtenerStorage();
      if (this.archivoImagen) {
        if (isNaN(Number(this.id_usuario))) {
          console.error('id_usuario no es un número válido:', this.id_usuario);
          await this.alertController.create({
            header: 'Error',
            message: 'id_usuario no es un número válido.',
            buttons: ['OK']
          }).then((alert: HTMLIonAlertElement) => alert.present());
          return;
        }

        const request = await this.apiservice.agregarVehiculo(
          {
            p_id_usuario: Number(this.id_usuario), 
            p_patente: this.patente,
            p_marca: this.marca,
            p_modelo: this.modelo,
            p_anio: this.anio,
            p_color: this.color,
            p_tipo_combustible: this.tipo_combustible,
            token: dataStorage[0].token,
          },
          this.archivoImagen
        );
        console.log('Vehículo registrado exitosamente:', request);

        const navigationExtras: NavigationExtras = {
          queryParams: {
            email: this.email,
            id_usuario: this.id_usuario
          }
        };
        this.router.navigate(['/principal'], navigationExtras);
      }
    } catch (error) {
      console.log(error);
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivoImagen = event.target.files[0];
    }
  }

  async popAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    }).then((alert: HTMLIonAlertElement) => alert.present());
  }
}
