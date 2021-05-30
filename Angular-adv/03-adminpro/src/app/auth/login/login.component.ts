import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { AutenticacionForm } from 'src/app/interfaces/autenticacion-form.interface';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  public formSubmited = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('remember') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false]
  });


  constructor(private router: Router,
    private fb: FormBuilder,
              // tslint:disable-next-line:variable-name
    private _usuarioService: UsuarioService,
    private ngZone: NgZone) { }


  ngOnInit(): void {
    this.renderButton();
  }

  login() {

    if (this.loginForm.valid) {
      console.log('formulario validado');
      console.log(this.loginForm.value);

      this._usuarioService.autenticarUsuario(this.loginForm.value)
        .subscribe((res: any) => {
          console.log(res);
          this.remember(this.loginForm.value);
          // Mover al dashboard
          this.router.navigateByUrl('/');
        }, (err) => {
          // Sweet alert de error
          this.sweetAlert('error', 'Error', err.error.msg);
        });

    } else {
      return console.log('Formulario invalido');
    }
    // this.router.navigateByUrl('/');
  }

  /**
   * Función para desplegar el sweet alert
   * @param icon Recibe el nombre del icono a mostrar
   * @param title Recibe el titulo a mostrar
   * @param text Recibe el cuerpo a mostrar
   * @returns Regresa el sweet alert para ejecutarlo en su llamada
   */
  sweetAlert(icon: SweetAlertIcon, title: string, text: string) {
    return Swal.fire({
      icon: icon,
      title: title,
      text: text
    });
  }

  /**
   * Funcion para guardar en el local storage
   * @param value Recibe el objeto del loginForm
   */
  remember(value: AutenticacionForm) {
    if (value.remember) {
      localStorage.setItem('remember', value.email);
    } else {
      localStorage.removeItem('remember');
    }
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp();
  }

  /**
   *
   */
  async startApp() {
    await this._usuarioService.googleInit();
    this.auth2 = this._usuarioService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  };

  /**
   *
   * @param element
   */
  attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {},
      (googleUser: any) => {
        const id_token = googleUser.getAuthResponse().id_token;
        // console.log(id_token);
        this._usuarioService.loginGoogle(id_token).subscribe(resp => {
          this.ngZone.run(() =>{
            this.router.navigateByUrl('/')
          });
        });

      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}
