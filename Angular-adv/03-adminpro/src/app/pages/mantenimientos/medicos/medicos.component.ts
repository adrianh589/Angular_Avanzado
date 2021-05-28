import { Component, OnDestroy, OnInit } from '@angular/core';
import { Medico } from '../../../models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Hospital } from '../../../models/hospital.model';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando = true;
  public medicos: Medico[] = [];
  public imgSubs!: Subscription;

  constructor( private medicoService: MedicoService,
               private modalImagenService: ModalImagenService,
               private busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.obtenerMedicos();

    this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => this.obtenerMedicos() );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  obtenerMedicos(){
    this.cargando = true;
    this.medicoService.obtenerMedicos()
      .subscribe( medicos => {
        this.medicos = medicos;
        this.cargando = false;
      });
  }

  abrirModal(medico: Medico){
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
    this.obtenerMedicos();
  }

  buscarMedicos(termino: string){
    if (termino.length === 0){
      return this.obtenerMedicos();
    }
    this.busquedaService.buscar('medicos', termino)
      .subscribe( (response: Medico[]) => {
        this.medicos = response;
      });
  }

  borrarMedico(medico: Medico){

    Swal.fire({
      title: 'Borrar medico?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedico(medico._id)
          .subscribe((resp: any) => {
              this.obtenerMedicos();
              Swal.fire(
                'Medico Borrado',
                `${medico.nombre} fue eliminado correctamente`,
                'success'
              );
            }
          );
      }
    });

  }




}
