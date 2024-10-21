import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';



@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent  implements OnInit {

  imageUrl: string | undefined;
  
  constructor() { 
    Camera.requestPermissions();
  }

  ngOnInit() {}


  //Funcion nativa android
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
