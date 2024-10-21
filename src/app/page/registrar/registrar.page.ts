import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/servicio/api.service';
import { FirebaseService } from 'src/app/servicio/firebase.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  email:string='';
  password=""
  nombre: string='';
  telefono: string='';
  token:string='';
  archivoImagen:File| null= null;

  constructor(private firebase:FirebaseService, private Router: Router,private alertcontroller:AlertController, private crearUser:ApiService) { }

  ngOnInit() {
  }

  async registro(){
    const usuario=await this.firebase.registrar(this.email,this.password);
    if (this.archivoImagen){
      const request= await this.crearUser.agregarUsuario(
        {
          p_nombre:this.nombre,
          email:this.email,
          p_telefono: this.telefono,
          token: this.token
        },
        this.archivoImagen
      );
    }console.log(usuario);
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
    onFileChange(event: any) {

      if (event.target.files.length > 0) {
    
       this.archivoImagen = event.target.files[0];
    
      }
    
     }
}
