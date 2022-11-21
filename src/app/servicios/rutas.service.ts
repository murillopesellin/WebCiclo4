import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RutaModelo } from '../modelos/ruta.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class RutasService {
  token: string = ''
  constructor(
    private http: HttpClient,
    private seguridadService: SeguridadService
  ) {
    this.token = this.seguridadService.getToken();
  }

  store(ruta: RutaModelo): Observable<RutaModelo> {
    return this.http.post<RutaModelo>(environment.servicios.rutas, {
      origen: ruta.origen,
      destino: ruta.destino,
      tiempoEstimado: ruta.tiempo_estimado,
    });
  }

  getAll(): Observable<RutaModelo[]> {
    return this.http.get<RutaModelo[]>(environment.servicios.rutas, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  update(ruta: RutaModelo): Observable<RutaModelo> {
    return this.http.patch<RutaModelo>(`${environment.servicios.rutas}${ruta.id}`, {
      origen: ruta.origen,
      destino: ruta.destino,
      tiempoEstimado: ruta.tiempo_estimado,
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  delete(id: string): Observable<RutaModelo[]> {
    return this.http.delete<RutaModelo[]>(`${environment.servicios.rutas}${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getWithId(id: string): Observable<RutaModelo> {
    return this.http.get<RutaModelo>(`${environment.servicios.rutas}${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }
}