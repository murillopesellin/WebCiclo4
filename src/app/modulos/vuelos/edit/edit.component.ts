import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RutaModelo } from 'src/app/modelos/ruta.modelo';
import { VueloModelo } from 'src/app/modelos/vuelo.model';
import { RutasService } from 'src/app/servicios/rutas.service';
import { VuelosService } from 'src/app/servicios/vuelos.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  listadoRutas: RutaModelo[] = []
  fgValidacion = this.fb.group({
    id: ['', [Validators.required]],
    nombre_piloto: ['', [Validators.required]],
    fecha_inicio: ['', [Validators.required]],
    hora_inicio: ['', [Validators.required]],
    fecha_fin: ['', [Validators.required]],
    hora_fin: ['', [Validators.required]],
    asientos_vendidos: ['', [Validators.required]],
    ruta: ['', [Validators.required]],
  });
  id: string = ''

  constructor(
    private fb: FormBuilder,
    private rutasService: RutasService,
    private vuelosService: VuelosService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }



  ngOnInit(): void {
    this.getAllRutas();
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
  }
  buscarRegistro(id: string) {
    this.vuelosService.getWithId(id).subscribe((data: any) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id);
      this.fgValidacion.controls["nombre_piloto"].setValue(data.nombrePiloto);
      this.fgValidacion.controls["fecha_inicio"].setValue(data.fechaInicio);
      this.fgValidacion.controls["hora_inicio"].setValue(data.horaInicio);

      this.fgValidacion.controls["fecha_fin"].setValue(data.fechaFin);
      this.fgValidacion.controls["hora_fin"].setValue(data.horaFin);
      this.fgValidacion.controls["asientos_vendidos"].setValue(data.asientosVendidos);

      this.fgValidacion.controls["ruta"].setValue(data.ruta);


    })
  }

  getAllRutas(){
    this.rutasService.getAll().subscribe((data: RutaModelo[]) => {
      this.listadoRutas = data
      // console.log(data)
    })
  }

  edit() {
    let vuelo = new VueloModelo();
    vuelo.id = this.fgValidacion.controls["id"].value + "";
    vuelo.nombre_piloto = this.fgValidacion.controls["nombre_piloto"].value + "";
    vuelo.fecha_inicio = this.fgValidacion.controls["fecha_inicio"].value + "";
    vuelo.hora_inicio = this.fgValidacion.controls["hora_inicio"].value + "";

    vuelo.fecha_fin = this.fgValidacion.controls["fecha_fin"].value + "";
    vuelo.hora_fin = this.fgValidacion.controls["hora_fin"].value + "";
    vuelo.asientos_vendidos = this.fgValidacion.controls["asientos_vendidos"].value + "";
    vuelo.ruta = this.fgValidacion.controls["ruta"].value + "";
    this.vuelosService.update(vuelo).subscribe((data: VueloModelo) => {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/vuelos/get']);
    },
      (error: any) => {
        console.log(error)
        alert("Error en el envio");
      })
  }

}