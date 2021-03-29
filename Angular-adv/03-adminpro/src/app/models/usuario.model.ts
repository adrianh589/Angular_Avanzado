import { environment } from "src/environments/environment";
const baser_url = environment.base_url;

export class Usuario {

  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public uid?: string
  ) { }

  imprimirUsuario() {
    console.log(this.nombre);
  }

  get imagenUrl() {

    if ( this.img?.includes('http') ) {
      return this.img;
    }

    if (this.img) {
      return `${baser_url}/uploads/usuarios/${this.img}`;
    } else {
      return `${baser_url}/uploads/usuarios/no-image`;
    }
  }

}
