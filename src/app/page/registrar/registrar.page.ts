import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/servicio/firebase.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  constructor(private firebase:FirebaseService, private Router: Router,private alertcontroller:AlertController) { }

  email=""
  password=""
  ngOnInit() {
  }

  async registro(){
    const usuario=await this.firebase.registrar(this.email,this.password)
    console.log(usuario);
    this.Router.navigateByUrl("login")
  }
  async resAlert(){
    const alert= await this.alertcontroller.create({
      header:'Registrado',
      message:"Usuario registrado",
      buttons:['OK']
    })
    await alert.present(); 

    }
}
