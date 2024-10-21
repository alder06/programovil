import { ApiService } from 'src/app/servicio/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/models/usuario';
import { FirebaseService } from 'src/app/servicio/firebase.service';
import { StorageService } from 'src/app/servicio/storage.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  
  usuario:UserModel[]=[];
  email: string=""
  pass: String=""
  valor: number=0
  imageUrl: string | undefined;

  constructor(private firebase:FirebaseService, private Router:Router, private activate: ActivatedRoute, private storage:StorageService, private apiservice:ApiService) { 
    this.activate.queryParams .subscribe(params=> {
      this.email=params['email'];
      this.pass=params['password'];
      this.valor=params['valor'];/* no es necesario agregarlo aca, solo se agrega cuando quieres ver que los datos se envian*/
      console.log(this.email, this.pass);
        })

  }

  ngOnInit() { 
    this.cargarUsuario();
  }

  goToCuenta() {
    this.Router.navigate(['/cuenta']);
  }
  
  async logout(){
    await this.firebase.logout();
    this.Router.navigateByUrl('login')
  }
  //funcion asincronica que consume la api get que trae los datos del usuario 
  async cargarUsuario(){
    let dataStorage = await this.storage.obtenerStorage();    
    const req = await this.apiservice.obtenerUsuario(
      {
        p_correo: this.email,
        token:dataStorage[0].token
      }
    );
    this.usuario = req.data;
    console.log("DATA INICIO USUARIO ", this.usuario);
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri, // URL de la imagen
      source: CameraSource.Camera // Fuente: Cámara
    });

    this.imageUrl = image.webPath; // Guardamos la URL de la imagen capturada
  }
}
