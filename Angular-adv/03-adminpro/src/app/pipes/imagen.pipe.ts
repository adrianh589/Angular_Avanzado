import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

// tslint:disable-next-line:variable-name
const baser_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string = '', tipo: 'usuarios' | 'medicos' | 'hospitales'): string {
    if (!img) {
      return `${baser_url}/uploads/${tipo}/no-image`;
    } else if (img?.includes('http')) {
      return img;
    } else if (img) {
      return `${baser_url}/uploads/${tipo}/${img}`;
    } else {
      return `${baser_url}/uploads/${tipo}/no-image`;
    }
  }

}
