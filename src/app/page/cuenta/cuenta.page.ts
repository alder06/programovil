import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {
  usuario: any = {
    imagen_usuario: 'path_to_profile_image.png',
    nombre: 'Nombre del Usuario',
    email: 'usuario@example.com',
    telefono: '123456789'
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  editarPerfil() {
    // Lógica para editar el perfil del usuario
    console.log('Editar perfil');
  }

  regresar() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        email: this.usuario.email,
        id_usuario: 'some_id_usuario' // Asegúrate de obtener el valor correcto de id_usuario
      }
    };
    this.router.navigate(['/principal'], navigationExtras);
  }
}
