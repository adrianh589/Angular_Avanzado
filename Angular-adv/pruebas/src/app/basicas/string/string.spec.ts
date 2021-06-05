// // Sirve para agrupar pruebas
// describe('Pruebas de strings');
//
// // Esto es una prueba
// it('Debe de regresar un string');
// it('Debe de contener un nombre');

import {mensaje} from "./string";

describe( 'Pruebas de strings',  () =>{

  it('Debe de regresar un string',  () => {
    const respuesta = mensaje('Adrian');
    // Espera que la respuesta sea algo en particular
    expect( typeof respuesta ).toBe('string');
  });

  it('Debe de retornar un saludo con el nombre enviado',  () => {
    const nombre = 'Camila';
    const respuesta = mensaje(nombre);
    // Espera que la respuesta sea algo en particular
    expect( respuesta ).toContain(nombre);
  });

})
