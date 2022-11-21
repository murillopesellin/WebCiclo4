import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AeropuertoModelo } from 'src/app/modelos/aeropuerto.model';
import { AeropuertoService } from 'src/app/servicios/aeropuerto.service';
AeropuertoModelo
import Swal from 'sweetalert2'
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  fgValidacion = this.fb.group({
    nombre: ['', [Validators.required]],
    ciudad: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    coordX: ['', [Validators.required]],
    coordY: ['', [Validators.required]],
    siglas: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private aeropuertoService: AeropuertoService,
    private router: Router
  ) { }



  ngOnInit(): void {
  }

  store() {
    let aeropuerto = new AeropuertoModelo();
    aeropuerto.nombre = this.fgValidacion.controls["nombre"].value + "";
    aeropuerto.ciudad = this.fgValidacion.controls["ciudad"].value + "";
    aeropuerto.pais = this.fgValidacion.controls["pais"].value + "";
    aeropuerto.coordenada_x = this.fgValidacion.controls["coordX"].value + "";
    aeropuerto.coordenada_y = this.fgValidacion.controls["coordY"].value + "";
    aeropuerto.sigla = this.fgValidacion.controls["siglas"].value + "";
    aeropuerto.tipo = this.fgValidacion.controls["tipo"].value + "";
    console.log(aeropuerto);

    this.aeropuertoService.store(aeropuerto).subscribe((data: AeropuertoModelo) => {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/aeropuertos/get']);
    },
      (error: any) => {
        console.log(error)
        alert("Error en el envio");
      })
  }

}