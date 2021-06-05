import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterMedicoComponent} from './router-medico.component';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, of, Subject} from "rxjs";

class FakeRouter {
  navigate(params: any) {
  }
}

class FakeActivatedRoute {
  // params: Observable<any> = of();

  private subject = new Subject();

  push ( valor: unknown ) {
    this.subject.next(valor);
  }

  get params(){
    return this.subject.asObservable();
  }

}

describe('RouterMedicoComponent', () => {
  let component: RouterMedicoComponent;
  let fixture: ComponentFixture<RouterMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RouterMedicoComponent],
      providers: [
        {provide: Router, useClass: FakeRouter},// En vez de usar el router de angular, usaremos el FakeRouter
        {provide: ActivatedRoute, useClass: FakeActivatedRoute},
        ActivatedRoute
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe de redireccionar a médico cuando se guarde', function () {
    const router = TestBed.get(Router);
    const spy = spyOn( router, 'navigate' );

    component.guardarMedico();

    expect( spy ).toHaveBeenCalledWith( ['medico', '123'] );
  });

  it('Debe de colocar el id = nuevo', function () {
    component = fixture.componentInstance;

    const activatedRoute: FakeActivatedRoute = TestBed.get(ActivatedRoute);

    activatedRoute.push({id: 'nuevo'});

    expect(component.id).toBe('nuevo');
  });
});
