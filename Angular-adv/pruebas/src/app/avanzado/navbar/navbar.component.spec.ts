import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {AppComponent} from "../../app.component";
import {By} from "@angular/platform-browser";
import {RouterLinkWithHref} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe de tener un link a la página de Médicos', function () {
    const elementos = fixture.debugElement.queryAll( By.directive( RouterLinkWithHref ) );

    console.info(elementos);

    let existe = false;

    for (const elem of elementos){
      if( elem.attributes['routerLink'] === '/medicos' ){
        existe = true;
        break;
      }
    }

    expect( existe ).toBeTruthy();

  });
});
