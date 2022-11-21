import { Component, OnInit } from '@angular/core';
import { RutaModelo } from 'src/app/modelos/ruta.modelo';
import { RutasService } from 'src/app/servicios/rutas.service';


import Swal from 'sweetalert2'
@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  listado: RutaModelo[] = []
  constructor(private rutasService: RutasService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.rutasService.getAll().subscribe((data: RutaModelo[]) => {
      this.listado = data
      console.log(data)
    })
  }

  delete(id?: any) {
    console.log(id)
    Swal.fire({
      title: '¿Esta seguro de eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.rutasService.delete(id).subscribe((data: any) => {
          Swal.fire('¡Eliminado correctamente!', '', 'success')
          this.getAll();
        })
      }
    })
  }


}