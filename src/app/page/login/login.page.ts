import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/servicio/firebase.service';
import { StorageService } from 'src/app/servicio/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email = "";
  password = "";
  tokenID: any = "";

  constructor(
    private firebase: FirebaseService, 
    private router: Router, 
    private alertcontroller: AlertController, 
    private storage: StorageService
  ) {}

  ngOnInit() {}

  async login() {
    try {
      let usuario = await this.firebase.auth(this.email, this.password);
      this.tokenID = await usuario.user?.getIdToken();
      const id_usuario = usuario.user?.uid; // Obtén el UID del usuario desde el objeto de autenticación

      console.log(usuario);
      console.log("Token:", this.tokenID);
      console.log("ID Usuario:", id_usuario);

      await this.pruebaStorage();

      const navigationExtras: NavigationExtras = {
        queryParams: {
          email: this.email,
          id_usuario: id_usuario // Pasa el `id_usuario` al siguiente componente
        }
      };
      this.router.navigate(['/principal'], navigationExtras);

    } catch (error) {
      console.log(error);
      this.popAlert();
    }
  }

  async popAlert() {
    const alert = await this.alertcontroller.create({
      header: 'Error',
      message: "Usuario o contraseña incorrecto",
      buttons: ['OK']
    });
    await alert.present();
  }
  
  async pruebaStorage() {
    const jsonToken: any = [
      {
        token: this.tokenID
      }
    ];
    this.storage.agregarStorage(jsonToken);
    console.log(await this.storage.obtenerStorage());
  }
}
