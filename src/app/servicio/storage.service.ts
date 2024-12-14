import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';


const key='keyValor';
const vehiculosKey = 'vehiculosKey'; // Nueva clave para vehículos


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async getItem(key: string): Promise<string | null> {

    try {
 
      const obj = await Preferences.get({ key });
 
      return obj.value;
 
    } catch (error) {
 
      console.error(`Error obteniendo el item con la llave ${key}:`, error);
 
      return null;
 
    }
 
  }

  private async setItem(key:string,valor:string){
 
    await Preferences.set({key:key,value:valor});
 
  }
 
  private async removeItem(key:string){
 
    await Preferences.remove({key:key});
 
  }

  async agregarStorage(data:any){
    this.setItem(key,JSON.stringify(data))
  }

  async obtenerStorage(){
    const data=await this.getItem(key);
    if (data==null){
      return []
    }else{
      return JSON.parse(data);
    }
   }

   async guardarVehiculos(vehiculos: any[]) {
    try {
      await Preferences.set({
        key: vehiculosKey,
        value: JSON.stringify(vehiculos)
      });
    } catch (error) {
      console.error('Error al guardar vehículos:', error);
    }
  }

  // Nuevo método para obtener vehículos
  async obtenerVehiculos(): Promise<any[]> {
    try {
      const { value } = await Preferences.get({ key: vehiculosKey });
      
      if (value) {
        return JSON.parse(value);
      }
      
      return []; // Retorna un array vacío si no hay vehículos
    } catch (error) {
      console.error('Error al obtener vehículos:', error);
      return [];
    }
  }

  // Método para eliminar vehículos (útil al cerrar sesión)
  async eliminarVehiculos() {
    try {
      await Preferences.remove({ key: vehiculosKey });
    } catch (error) {
      console.error('Error al eliminar vehículos:', error);
    }
  }
}
