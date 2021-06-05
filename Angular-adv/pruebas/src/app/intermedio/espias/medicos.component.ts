import { Component, OnInit } from '@angular/core';
import {MedicosService} from "./medicos.service";

@Component({
  selector: 'app-medicos',
  template: `
  <p>
    medico works!
  </p>
  `
})
export class MedicosComponent implements OnInit {

  public medicos: any[] = [];
  public mensajeError!: string;

  constructor( public _medicService: MedicosService) { }

  ngOnInit(): void {
    this._medicService.getMedicos()
      .subscribe( (medicos: any) => this.medicos = medicos )
  }

  agregarMedico(){
    const medico = { nombre: 'Médico Juan Carlos' };

    this._medicService.agregarMedico(medico)
      .subscribe(
          (medicoDB: any) => this.medicos.push(medicoDB),
          (err: string) => this.mensajeError = err
      );
  }

  borrarMedico(id: string){
    const confirmar = confirm('Estas seguro que seseas borrar este médico');

    if ( confirmar ){
      this._medicService.borrarMedico(id);
    }
  }

}
