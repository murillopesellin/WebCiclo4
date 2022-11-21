import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VueloModelo } from '../modelos/vuelo.usuario';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class VuelosService {
  token: string = ''
  constructor(
    private http: HttpClient,
    private seguridadService: SeguridadService
  ) {
    this.token = this.seguridadService.getToken();
  }

  store(vuelo: VueloModelo): Observable<VueloModelo> {
    return this.http.post<VueloModelo>(environment.servicios.vuelos, {
      fecha_inicio:vuelo.fecha_inicio,
      hora_inicio:vuelo.hora_inicio,
      fecha_fin:vuelo.fecha_fin,
      hora_fin:vuelo.hora_fin,
      asientos_vendidos:vuelo.asientos_vendidos,
      nombre_piloto:vuelo.nombre_piloto,
      ruta:vuelo.ruta,
    });
  }

  getAll(): Observable<VueloModelo[]> {
    return this.http.get<VueloModelo[]>(environment.servicios.vuelos, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  update(vuelo: VueloModelo): Observable<VueloModelo> {
    return this.http.patch<VueloModelo>(`${environment.servicios.vuelos}${vuelo.id}`, {
      fecha_inicio:vuelo.fecha_inicio,
      hora_inicio:vuelo.hora_inicio,
      fecha_fin:vuelo.fecha_fin,
      hora_fin:vuelo.hora_fin,
      asientos_vendidos:vuelo.asientos_vendidos,
      nombre_piloto:vuelo.nombre_piloto,
      ruta:vuelo.ruta,
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  delete(id: string): Observable<VueloModelo[]> {
    return this.http.delete<VueloModelo[]>(`${environment.servicios.vuelos}${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getWithId(id: string): Observable<VueloModelo> {
    return this.http.get<VueloModelo>(`${environment.servicios.vuelos}${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }
}