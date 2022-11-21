import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AeropuertoModelo } from 'src/app/modelos/aeropuerto.model';
import { RutaModelo } from 'src/app/modelos/ruta.modelo';
import { AeropuertoService } from 'src/app/servicios/aeropuerto.service';
import { RutasService } from 'src/app/servicios/rutas.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  listadoAeropuertos: AeropuertoModelo[] = []
  fgValidacion = this.fb.group({
    origen: ['', [Validators.required]],
    destino: ['', [Validators.required]],
    tiempoEstimado: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private rutasService: RutasService,
    private aeropuertoService: AeropuertoService,
    private router: Router,
  ) { }



  ngOnInit(): void {
    this.getAllAeropuertos();
  }
  getAllAeropuertos(){
    this.aeropuertoService.getAll().subscribe((data: AeropuertoModelo[]) => {
      this.listadoAeropuertos = data
      // console.log(data)
    })
  }

  store() {
    let ruta = new RutaModelo();
    ruta.origen = this.fgValidacion.controls["origen"].value + "";
    ruta.destino = this.fgValidacion.controls["destino"].value + "";
    ruta.tiempo_estimado = this.fgValidacion.controls["tiempoEstimado"].value + "";
    this.rutasService.store(ruta).subscribe((data: RutaModelo) => {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/rutas/get']);
    },
      (error: any) => {
        console.log(error)
        alert("Error en el envio");
      })
  }


}