import { Hospital } from './hospital.model';

// tslint:disable-next-line:class-name
interface _MedicolUser{
  _id: string;
  nombre: string;
  img: string;
}

export class Medico {

  public constructor(
    public nombre: string,
    // tslint:disable-next-line:variable-name
    public _id?: string,
    public img?: string,
    public usuario?: _MedicolUser,
    public hospital?: Hospital
  ) {
  }
}
