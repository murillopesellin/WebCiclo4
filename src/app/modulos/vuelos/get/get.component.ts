import { Component, OnInit } from '@angular/core';
import { VueloModelo } from 'src/app/modelos/vuelo.model';
import { VuelosService } from 'src/app/servicios/vuelos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {


  listado: VueloModelo[] = []
  constructor(private vueloService: VuelosService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.vueloService.getAll().subscribe((data: VueloModelo[]) => {
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
        this.vueloService.delete(id).subscribe((data: any) => {
          Swal.fire('¡Eliminado correctamente!', '', 'success')
          this.getAll();
        })
      }
    })
  }


}