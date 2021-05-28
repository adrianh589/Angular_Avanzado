// tslint:disable-next-line:class-name
interface _HospitalUser{
  _id: string;
  nombre: string;
  img: string;
}

export class Hospital {

  public constructor(
    // tslint:disable-next-line:variable-name
    public _id: string,
    public nombre: string,
    public img?: string,
    public usuario?: _HospitalUser,
  ) {
  }
}
