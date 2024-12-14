import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicio/api.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StorageService } from 'src/app/servicio/storage.service';

@Component({
  selector: 'app-listar-vehiculos',
  templateUrl: './listar-vehiculos.page.html',
  styleUrls: ['./listar-vehiculos.page.scss'],
})
export class ListarVehiculosPage implements OnInit {
  email: string = '';
  id_usuario: string = '';
  vehiculos: any[] = [];
  vehiculosFiltrados: any[] = []; // Lista de vehículos filtrados

  constructor(
    private apiService: ApiService,
    private storage: StorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.id_usuario = params['id_usuario'];

      console.log('ID Usuario recibido:', this.id_usuario);
    });
  }

  ngOnInit() {
    this.obtenerVehiculos();
  }

  async obtenerVehiculos() {
    try {
      const dataStorage = await this.storage.obtenerStorage();
      const p_id = Number(this.id_usuario); // Convertir `id_usuario` a número
      const token = dataStorage[0].token;

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
        this.filtrarVehiculosPorUsuario(); // Filtrar los vehículos por id_usuario
        console.log('Vehículos obtenidos:', this.vehiculosFiltrados);
      } else {
        console.error('No hay vehículos registrados.');
      }
    } catch (error) {
      console.error('Error al obtener vehículos:', error);
    }
  }

  filtrarVehiculosPorUsuario() {
    this.vehiculosFiltrados = this.vehiculos.filter(vehiculo => vehiculo.id_usuario === Number(this.id_usuario));
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
