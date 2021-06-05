import {Jugador} from "./clase";

describe('Pruebas de clase ' , () =>{

  const jugador = new Jugador();

  beforeAll( () => {// Se ejecuta ANTES de TODAS las pruebas
    console.log('beforeAll');
  });
  beforeEach( () => { // Se ejecuta ANTES de CADA UNA de las pruebas
    console.log('beforeEach');
  });
  afterAll( () => { // Se ejecuta DESPUES de TODAS las pruebas
    console.log('afterAll');
  });
  afterEach( () => {// Se ejecuta DESPUES de CADA UNA de las pruebas
    console.log('afterEach');
    jugador.hp = 100;
  });

  // beforeAll

  //beforeEach
  it('Debe de retornar 80 de hp si recibe 80 de daño',  () => {
    const resp = jugador.recibeDanio(20);

    expect( resp ).toBe(80);
  });// afterEach

  //beforeEach
  it('Debe de retornar 50 de hp si recibe 50 de daño',  () => {
    const resp = jugador.recibeDanio(50);

    expect( resp ).toBe(50);
  });// afterEach

  //beforeEach
  it('Debe de retornar 0 de hp si recibe 100 o mas de daño',  () => {
    const resp = jugador.recibeDanio(100);

    expect( resp ).toBe(0);
  });// afterEach

  // afterAll
});
