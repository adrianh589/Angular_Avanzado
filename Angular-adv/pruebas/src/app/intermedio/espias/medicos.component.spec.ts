import { MedicosComponent } from './medicos.component';
import {MedicosService} from "./medicos.service";
import {Observable, from, throwError, of} from "rxjs";

describe('MedicosComponent', () => {
  let component: MedicosComponent;
  // @ts-ignore
  const servicio = new MedicosService( null );

  beforeEach( () => {
    component = new MedicosComponent(servicio);
  });

  it('Init: debe de cargar los médicos', () => {

    const medicos = ['medico1', 'medico2', 'medico3'];

    // Hacer que este espia NO ejecute la funcion por defecto, en vez de eso
    // vas a ejecutar esta funcion que yo te estoy diciendo...
    spyOn( servicio, 'getMedicos' ).and.callFake( () =>{
      return from( [medicos] );// From es un observable
    })

      component.ngOnInit();

      expect(component.medicos.length).toBeGreaterThan(0)
  });

  it('Debe de llamar al servidor para agregar un medico', function () {

    const espia = spyOn( servicio, 'agregarMedico' ).and.callFake( () => of());

    component.agregarMedico();

    expect(espia).toHaveBeenCalled();

  });

  it('Debe de agregar un nuevo médico al arreglo de médicos', function () {

    const medico = { id: 1, nombre: 'Adri' };

    spyOn( servicio, 'agregarMedico' )
      .and
      .returnValue( from([medico]) );

    component.agregarMedico();

    expect(component.medicos.indexOf(medico)).toBeGreaterThanOrEqual(0);

  });

  it('Si falla la adicion, la propiedad mensajeError, debe ser igual al error del servicio ', function () {

    const miError = 'No se pudo arreglar el médico';

    spyOn(servicio, 'agregarMedico').and
      .returnValue( throwError(miError) );

    component.agregarMedico();

    expect(component.mensajeError).toBe(miError);

  });

  it('Debe de llamar al servidor para borrar un médico', function () {

    spyOn(window, 'confirm' ).and.returnValue(true);

    const espia = spyOn( servicio, 'borrarMedico' )
      .and.returnValue( of() );

    component.borrarMedico('1');

    expect( espia ).toHaveBeenCalledWith('1');
  });

  it('NO debe de llamar al servidor para borrar un médico', function () {

    spyOn(window, 'confirm' ).and.returnValue(false);

    // Con esto espiamos al servicio simulando el retorno de un valor
    const espia = spyOn( servicio, 'borrarMedico' )
      .and.returnValue( of() );

    // Esto dispara la funcion
    component.borrarMedico('1');

    expect( espia ).not.toHaveBeenCalledWith('1');
  });
});
