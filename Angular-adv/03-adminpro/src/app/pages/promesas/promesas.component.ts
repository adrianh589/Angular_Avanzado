@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios();

    // catch: Es por si surge un error en la promesa
    // then: Cuando se hace correctamente
    // finally: Despues de que se termine la promesa sin importar si fue extiosa o no, ejecuta esta parte

    /*const promesa = new Promise((resolve, reject) =>{
      if(false){
        resolve('Hola mundo')
      }else{
        reject('Algo salio mal');
      }
    });

    promesa.then( mensaje => {
      console.log(mensaje);
    })
      .catch( error => console.log('error en mi promesa', error))
    ;

    console.log('Fin del init');*/

  }


  getUsuarios(){
    return new Promise(resolve => {

      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => console.log(body.data));

    });
  }

}

import { Component, OnInit } from '@angular/core';
