import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {By} from "@angular/platform-browser";
import {RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {NavbarComponent} from "./avanzado/navbar/navbar.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [
        AppComponent,
        // NavbarComponent // Esta es la manera tradicinal
      ],
      schemas: [ NO_ERRORS_SCHEMA ]// Esta importacion la hacemos para evitar decirle a las pruebas que tenemos mil componentes para meterlas en las declaraciones
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'pruebas'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('pruebas');
  });

  xit('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('pruebas app is running!');
  });

  it('Debe detener un router-outlet', function () {
    const fixture = TestBed.createComponent(AppComponent);
    const debugElement = fixture.debugElement.query( By.directive( RouterOutlet ) );

    expect(debugElement).not.toBeNull();
  });


});
