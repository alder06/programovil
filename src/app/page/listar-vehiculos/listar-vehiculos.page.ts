import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicio/api.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StorageService } from 'src/app/servicio/storage.service';
import { UserModel } from 'src/app/models/usuario';

@Component({
  selector: 'app-listar-vehiculos',
  templateUrl: './listar-vehiculos.page.html',
  styleUrls: ['./listar-vehiculos.page.scss'],
})
export class ListarVehiculosPage implements OnInit {
  email: string = '';
  id_usuario: string = '';
  vehiculos: UserModel[] = []; // Asegúrate de que esto es un arreglo de UserModel

  constructor(
    private apiService: ApiService,
    private storage: StorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.id_usuario = params['id_usuario'];

      console.log('ID Usuario recibido en constructor:', this.id_usuario);
    });
  }

  ngOnInit() {
    this.obtenerVehiculos();
  }

  async obtenerVehiculos() {
    try {
      const dataStorage = await this.storage.obtenerStorage();
      const p_id = Number(this.vehiculos); // Usar `id_usuario` para la conversión
      const token = dataStorage[0].token;

      // Verifica que `p_id` no sea NaN
      if (isNaN(p_id)) {
        console.error('Error: ID Usuario no es un número válido.');
        return;
      }

      console.log('Datos enviados a la API:', { p_id, token }); // Verificar datos enviados

      const req = await this.apiService.obtenerVehiculo({
        p_id: p_id,
        token: token,
      });

      console.log('Respuesta de la API:', req);

      if (req && req.data.length > 0) {
        this.vehiculos = req.data;
        console.log('Vehículos obtenidos:', this.vehiculos);
      } else {
        console.error('No hay vehículos registrados.');
      }
    } catch (error) {
      console.error('Error al obtener vehículos:', error);
    }
  }

  regresarAPrincipal() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        email: this.email,
        id_usuario: this.id_usuario
      }
    };
    this.router.navigate(['/principal'], navigationExtras);
  }
}
