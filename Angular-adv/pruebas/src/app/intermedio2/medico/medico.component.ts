import { Component, OnInit } from '@angular/core';
import {MedicoService} from "./medico.service";

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  constructor( public _medicoService: MedicoService) { }

  medicos: any[] = [];

  ngOnInit(): void {
  }

  saludarMedico( nombre: string ){
    return `Hola ${nombre}`;
  }

  obtenerMedicos(){
    this._medicoService.getMedicos()
      .subscribe( (medicos: any) => this.medicos = medicos );
  }

}
