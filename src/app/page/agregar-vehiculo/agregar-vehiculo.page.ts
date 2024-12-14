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
  id_usuario:number=0;
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
      
      // Verificar si hay usuarios cargados y obtener el id_usuario
      if (this.usuario && this.usuario.length > 0) {
        const id_usuario = Number(this.usuario[0].id_usuario); // Obtener el ID numérico del primer usuario
  
        if (this.archivoImagen) {
          const request = await this.apiservice.agregarVehiculo(
            {
              p_id_usuario: id_usuario, // Usar el ID numérico del usuario
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
              id_usuario: id_usuario.toString() // Convertir a string para la navegación si es necesario
            }
          };
          
          this.router.navigate(['/principal'], navigationExtras);
        }
      } else {
        // Manejar el caso en que no se cargaron datos de usuario
        await this.popAlert('Error', 'No se pudo cargar la información del usuario');
      }
    } catch (error) {
      console.log(error);
      await this.popAlert('Error', 'No se pudo registrar el vehículo');
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