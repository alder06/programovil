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
      // Primero, intenta obtener vehículos almacenados
      const storedVehiculos = await this.storage.obtenerVehiculos();
      
      if (storedVehiculos.length > 0) {
        this.vehiculos = storedVehiculos;
        return; // Usa los vehículos almacenados si existen
      }

      // Si no hay vehículos almacenados, obtén de la API
      const dataStorage = await this.storage.obtenerStorage();
      const p_id = Number(this.id_usuario);
      const token = dataStorage[0].token;

      const req = await this.apiService.obtenerVehiculo({
        p_id: p_id,
        token: token,
      });

      if (req && req.data) {
        const vehiculos = Array.isArray(req.data) 
          ? req.data 
          : (req.data.vehiculos || req.data);

        if (Array.isArray(vehiculos) && vehiculos.length > 0) {
          this.vehiculos = vehiculos;
          
          // Guarda los vehículos obtenidos de la API
          await this.storage.guardarVehiculos(vehiculos);
        }
      }
    } catch (error) {
      console.error('Error al obtener vehículos:', error);
    }
  }

  // Método para agregar un nuevo vehículo
  async agregarVehiculo(nuevoVehiculo: any) {
    this.vehiculos.push(nuevoVehiculo);
    await this.storage.guardarVehiculos(this.vehiculos);
  }

  // Método para eliminar un vehículo
  async eliminarVehiculo(vehiculoId: number) {
    this.vehiculos = this.vehiculos.filter(v => v.id !== vehiculoId);
    await this.storage.guardarVehiculos(this.vehiculos);
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
