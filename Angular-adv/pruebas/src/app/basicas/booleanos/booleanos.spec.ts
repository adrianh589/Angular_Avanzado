import {usuarioIngresado} from "./booleanos";

describe('prueba de booleanos', () => {
  it('Debe de regresar true',  () => {

    const res = usuarioIngresado();

    expect(res).toBeTruthy();

  });
})
