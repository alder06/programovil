import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, lastValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface bodyUser {
  p_nombre: string;
  email: string;
  p_telefono: string;
  token?: string;
}

export interface dataGetUser {
  p_correo: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get(this.apiUrl + '/posts/').pipe(retry(3));
  }

  getPost(id: any): Observable<any> {
    return this.http.get(this.apiUrl + '/posts/' + id).pipe(retry(3));
  }

  createPost(post: any): Observable<any> {
    return this.http.post(this.apiUrl + '/posts/', post, this.httpOptions).pipe(retry(3));
  }

  updatePost(id: any, post: any): Observable<any> {
    return this.http.put(this.apiUrl + '/posts/' + id, post, this.httpOptions).pipe(retry(3));
  }

  deletePost(id: any): Observable<any> {
    return this.http.delete(this.apiUrl + '/posts/' + id, this.httpOptions);
  }

  async agregarUsuario(data: bodyUser, imageFile: File) {
    try {
      const formData = new FormData();
      formData.append('p_nombre', data.p_nombre);
      formData.append('p_correo_electronico', data.email);
      formData.append('p_telefono', data.p_telefono);
      if (data.token) {
        formData.append('token', data.token);
      }
      if (imageFile) {
        formData.append('image_usuario', imageFile, imageFile.name);
      }
      const response = await lastValueFrom(
        this.http.post<any>(environment.apiUrl + 'user/agregar', formData)
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async obtenerUsuario(data: dataGetUser) {
    try {
      const params = {
        p_correo: data.p_correo,
        token: data.token
      };
      const response = await lastValueFrom(
        this.http.get<any>(environment.apiUrl + 'user/obtener', { params })
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}
