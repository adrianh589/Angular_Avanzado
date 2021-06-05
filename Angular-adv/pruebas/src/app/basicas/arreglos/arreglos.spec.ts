import {obtenerRobots} from "./arreglos";

describe('pruebas de arreglos', () =>{
  it('Debe de retornar almenos 3 robots', function () {
    const robots = obtenerRobots();

    expect(robots.length).toBeGreaterThanOrEqual(3);
  });

  it('Debe de existir Megaman y Ultron', function () {
    const robots = obtenerRobots();

    expect( robots ).toContain('Megaman');
    expect( robots ).toContain('Ultron');
  });
})
