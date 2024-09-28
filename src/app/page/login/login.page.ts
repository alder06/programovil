import { StorageService } from './../../servicio/storage.service';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/servicio/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email=""
  password=""
  tokenID:any="";

  constructor(private firebase:FirebaseService, private router:Router, private alertcontroller:AlertController, private storage:StorageService) { }

  ngOnInit() {
  }
  async login(){
    try {
      let usuario=await this.firebase.auth(this.email, this.password);
      this.tokenID=await usuario.user?.getIdToken();
      console.log(usuario);
      console.log("token",await usuario.user?.getIdToken());

      const navigationextras:NavigationExtras={
        queryParams: {email: this.email, password: this.password}
      }
      this.pruebaStorage();
      this.router.navigate(['principal']), navigationextras;
    } catch (error) {
      console.log(error);
      this.popAlert();
     }
    }
      async popAlert(){
        const alert= await this.alertcontroller.create({
          header:'Error',
          message:"Usuario o contraseña incorrecto",
          buttons:['OK']
        })
        await alert.present(); 
      }
     async pruebaStorage(){
        const jsonToken:any={
          token:this.tokenID
        }
        this.storage.agregarStorage(jsonToken)
     }
}
