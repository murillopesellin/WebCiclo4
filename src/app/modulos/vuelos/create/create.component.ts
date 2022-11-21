import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RutaModelo } from 'src/app/modelos/ruta.modelo';
import { VueloModelo } from 'src/app/modelos/vuelo.model';
import { RutasService } from 'src/app/servicios/rutas.service';
import { VuelosService } from 'src/app/servicios/vuelos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  listadoRutas: RutaModelo[] = []
  fgValidacion = this.fb.group({
    nombre_piloto: ['', [Validators.required]],
    fecha_inicio: ['', [Validators.required]],
    hora_inicio: ['', [Validators.required]],
    fecha_fin: ['', [Validators.required]],
    hora_fin: ['', [Validators.required]],
    asientos_vendidos: ['', [Validators.required]],
    ruta: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private rutasService: RutasService,
    private vuelosService: VuelosService,
    private router: Router,
  ) { }



  ngOnInit(): void {
    this.getAllRutas();
  }

  getAllRutas(){
    this.rutasService.getAll().subscribe((data: RutaModelo[]) => {
      this.listadoRutas = data
      // console.log(data)
    })
  }

  store() {
    let vuelo = new VueloModelo();
    vuelo.nombre_piloto = this.fgValidacion.controls["nombre_piloto"].value + "";
    vuelo.fecha_inicio = this.fgValidacion.controls["fecha_inicio"].value + "";
    vuelo.hora_inicio = this.fgValidacion.controls["hora_inicio"].value + "";

    vuelo.fecha_fin = this.fgValidacion.controls["fecha_fin"].value + "";
    vuelo.hora_fin = this.fgValidacion.controls["hora_fin"].value + "";
    vuelo.asientos_vendidos = this.fgValidacion.controls["asientos_vendidos"].value + "";
    vuelo.ruta = this.fgValidacion.controls["ruta"].value + "";
    this.vuelosService.store(vuelo).subscribe((data: VueloModelo) => {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/vuelos/get']);
    },
      (error: any) => {
        console.log(error)
        alert("Error en el envio");
      })
  }


}