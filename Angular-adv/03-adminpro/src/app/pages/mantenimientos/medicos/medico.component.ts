import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medico.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;
  public hospitales!: Hospital[];

  public medicoSeleccionado!: Medico;
  public hospitalSeleccionado!: Hospital | undefined;

  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private medicoService: MedicoService,
              private router: Router,
              private activateRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.activateRoute.params
      .subscribe(({id}) => this.cargarMedico(id));

    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', [Validators.required]],
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges
      .subscribe(hospitalId => {
        if (!hospitalId){ return; }
        this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId);
      });

  }

  guardarMedico() {
    const {nombre} = this.medicoForm.value;

    if (this.medicoSeleccionado) {
      // actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      };

      this.medicoService.actualizarMedico(data)
        .subscribe(resp => {
          Swal.fire('Actualizado', `${nombre} actualizado correctamente`, 'success');
        });
    }else{

      // crear
      this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe((resp: any) => {
          console.log(resp);
          Swal.fire('Creado', `${resp.medico.nombre}`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
        });

    }
  }

  cargarMedico(id: string) {

    if ( id === 'nuevo' ){
      return;
    }

    this.medicoService.obtenerPorId(id)
      .pipe(delay(100))
      .subscribe(medico => {

        if (!medico){
          return this.router.navigateByUrl(`/dashboard/medicos`);
        }

        // @ts-ignore
        const {nombre, hospital: {_id}} = medico;
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({nombre, hospital: _id});
        return;
      });
  }

  cargarHospitales() {

    this.hospitalService.cargarHospitales()
      .subscribe((hospitales: Hospital[]) => {
        console.log(hospitales);
        this.hospitales = hospitales;
      });
  }

}
