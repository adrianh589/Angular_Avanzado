import {TestBed, ComponentFixture} from '@angular/core/testing';
import {IncrementadorComponent} from './incrementador.component';
import {FormsModule} from '@angular/forms';
import {By} from "@angular/platform-browser";


describe('Incremendator Component', () => {

  let component: IncrementadorComponent;
  let fixture: ComponentFixture<IncrementadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncrementadorComponent],
      imports: [FormsModule]
    });

    fixture = TestBed.createComponent(IncrementadorComponent);
    component = fixture.componentInstance;

  });

  it('Debe de mostrar la leyenda', () => {

    component.leyenda = 'Progreso de carga';

    fixture.detectChanges(); // Disparar la deteccion de cambios de angular, por lo que en NG SERVE lo hace automaticamente
    // Pero aca en NG TEST no lo hace debido a que etamos es realizando las pruebas y por ende no se detectan los
    // Cambios de manera automatica EN TODOS LOS LUGARES

    //                                              .query() me permite buscar un unico elemento
    //                                              .queryAll() me permite buscar TODOS los elements
    //                                              .queryAllNodes() Busca todos los nodos con el parametro que nostros le ponemos
    //                                                  como tengo query, sera el primer h3 que encuentre
    const elem: HTMLElement = fixture.debugElement.query(By.css('h3')).nativeElement;

    expect(elem.innerHTML).toContain('Progreso de carga');

  });

  it('Debe de mostrar en el input el valor del progreso', function () {

    component.cambiarValor(5);

    fixture.detectChanges();

    // Debido a que la deteccion de cambios aveces demora un poco, aqui decimo que cuando
    // la deteccion de cambios se dispare y este lista para ser evaluada, entonces se puede
    // disparar una funcion aqui, similar al async await
    fixture.whenStable().then(() => {

      const input = fixture.debugElement.query(By.css('input'));
      const elem = input.nativeElement;

      expect(elem.value).toBe('55');

    });
  });

  it('Debe de incrementar/decrementar en 5 con un click en el botón', function () {

    const botones = fixture.debugElement.queryAll(By.css('.btn-primary'));

    // console.log(botones)

    botones[0].triggerEventHandler('click', null);
    expect(component.progreso).toBe(45);

    botones[1].triggerEventHandler('click', null);
    expect(component.progreso).toBe(50);

  });

  it('En el titulo del compojnente, debe d mostrar el progreso', function () {

    const boton = fixture.debugElement.query(By.css('.btn-primary'));

    boton.triggerEventHandler('click', null);
    fixture.detectChanges();

    const elem: HTMLElement = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(elem.innerHTML).toContain('45');

  });

});
