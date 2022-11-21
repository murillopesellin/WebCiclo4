import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AeropuertoModelo } from '../modelos/aeropuerto.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class AeropuertoService {
  token: string = ''
  constructor(
    private http: HttpClient,
    private seguridadService: SeguridadService
  ) {
    this.token = this.seguridadService.getToken();
  }

  store(aeropuerto: AeropuertoModelo): Observable<AeropuertoModelo> {
    return this.http.post<AeropuertoModelo>(environment.servicios.aeropuertos, {
      nombre: aeropuerto.nombre,
      ciudad: aeropuerto.ciudad,
      pais: aeropuerto.pais,
      coordX: aeropuerto.coordenada_x,
      coordY: aeropuerto.coordenada_y,
      siglas: aeropuerto.sigla,
      tipo: aeropuerto.tipo,
    });
  }

  getAll(): Observable<AeropuertoModelo[]> {
    return this.http.get<AeropuertoModelo[]>(environment.servicios.aeropuertos, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  update(aeropuerto: AeropuertoModelo): Observable<AeropuertoModelo> {
    return this.http.patch<AeropuertoModelo>(`${environment.servicios.aeropuertos}${aeropuerto.id}`, {
      nombre: aeropuerto.nombre,
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  delete(id: string): Observable<AeropuertoModelo[]> {
    return this.http.delete<AeropuertoModelo[]>(`${environment.servicios.aeropuertos}${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getWithId(id: string): Observable<AeropuertoModelo> {
    return this.http.get<AeropuertoModelo>(`${environment.servicios.aeropuertos}${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

}