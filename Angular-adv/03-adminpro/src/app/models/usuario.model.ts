import { environment } from 'src/environments/environment';
// tslint:disable-next-line:variable-name
const baser_url = environment.base_url;

export class Usuario {

  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: string | undefined,
    public role?: 'ADMIN_ROLE' | 'USER_ROLE',
    public uid?: string
  ) {
  }

  imprimirUsuario() {
    console.log(this.nombre);
  }

  get imagenUrl() {

    if (!this.img) {
      return `${baser_url}/uploads/usuarios/no-image`;
    } else if (this.img?.includes('http')) {
      return this.img;
    } else if (this.img) {
      return `${baser_url}/uploads/usuarios/${this.img}`;
    } else {
      return `${baser_url}/uploads/usuarios/no-image`;
    }
  }

}
