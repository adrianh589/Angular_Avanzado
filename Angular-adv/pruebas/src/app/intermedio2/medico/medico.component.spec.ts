import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MedicoComponent} from "./medico.component";
import {MedicoService} from "./medico.service";
import {HttpClientModule} from "@angular/common/http";

describe('Medico Component', () =>{

  /*
  * PRUEBAS DE INTEGRACION
  * */

  let component: MedicoComponent;
  let fixture: ComponentFixture<MedicoComponent>;

  beforeEach(() =>{

    // Este testbed es como si de un modulo se tratase
    TestBed.configureTestingModule({
      declarations: [ MedicoComponent ],
      providers: [ MedicoService ],
      imports: [ HttpClientModule ]
    });

    // El componente que yo quiero crear, esto regresa un Fixture
    // El fixture me permite acceder al HTML y a las cosas del DOM
    fixture = TestBed.createComponent(MedicoComponent);

    // Aqui tengo la instancia del componente, se pueden usar todos sus metodos y funciones definicdos en este componente
    component = fixture.componentInstance;

  });

  it('Debe de crearse el componente', function () {
    expect( component ).toBeTruthy();
  });

  it('Debe de retornar el nombre del medico', function () {
    const nombre = 'Adrian';
    const mensaje = component.saludarMedico(nombre);
    expect( mensaje ).toContain(nombre);
  });
});
