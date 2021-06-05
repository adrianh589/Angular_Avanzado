import {Jugador2} from "./jugador2";


describe('Jugador 2 emmit', () => {

  let jugador: Jugador2;

  beforeEach(() => jugador = new Jugador2());

  it('Debe de emitir un evento cuando recibe daño', () => {

    let nuevoHp = 0;

    jugador.hpCambio.subscribe(hp => {
      nuevoHp = hp;
    });

    jugador.recibeDanio(1000);

    expect(nuevoHp).toBe(0);

  });

  it('Debe de emitir un evento cuando recibe daño y sobrevivir si es menos de 100', () => {

    let nuevoHp = 0;

    jugador.hpCambio.subscribe(hp => {
      nuevoHp = hp;
    });

    jugador.recibeDanio(50);

    expect(nuevoHp).toBe(50);

  })

})
