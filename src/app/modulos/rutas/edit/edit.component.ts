import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AeropuertoModelo } from 'src/app/modelos/aeropuerto.model';
import { RutaModelo } from 'src/app/modelos/ruta.modelo';
import { AeropuertoService } from 'src/app/servicios/aeropuerto.service';
import { RutasService } from 'src/app/servicios/rutas.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  listadoAeropuertos: AeropuertoModelo[] = []
  fgValidacion = this.fb.group({
    id: ['', [Validators.required]],
    origen: ['', [Validators.required]],
    destino: ['', [Validators.required]],
    tiempoEstimado: ['', [Validators.required]],
  });
  id: string = ''

  constructor(
    private fb: FormBuilder,
    private rutasService: RutasService,
    private aeropuertoService: AeropuertoService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }



  ngOnInit(): void {
    this.getAllAeropuertos();
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
  }

  buscarRegistro(id: string) {
    this.rutasService.getWithId(id).subscribe((data: any) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id);
      this.fgValidacion.controls["origen"].setValue(data.origen);
      this.fgValidacion.controls["destino"].setValue(data.destino);
      this.fgValidacion.controls["tiempoEstimado"].setValue(data.tiempoEstimado);

    })
  }

  getAllAeropuertos(){
    this.aeropuertoService.getAll().subscribe((data: AeropuertoModelo[]) => {
      this.listadoAeropuertos = data
      // console.log(data)
    })
  }

  edit() {
    let ruta = new RutaModelo();
    ruta.id = this.fgValidacion.controls["id"].value + "";
    ruta.origen = this.fgValidacion.controls["origen"].value + "";
    ruta.destino = this.fgValidacion.controls["destino"].value + "";
    ruta.tiempo_estimado = this.fgValidacion.controls["tiempoEstimado"].value + "";
    console.log(ruta);
    
    this.rutasService.update(ruta).subscribe((data: RutaModelo) => {
      Swal.fire('Editado correctamente!', '', 'success')
      this.router.navigate(['/rutas/get']);
    },
      (error: any) => {
        console.log(error)
        alert("Error en el envio");
      })
  }

}