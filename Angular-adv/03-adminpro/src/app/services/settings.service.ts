import { Injectable } from '@angular/core';

// Los servicios sirven para que los componentes esten lo mas limpios posibles

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() {
    const themeSelected = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkTheme?.setAttribute('href', themeSelected);
  }

  changeTheme(theme: string): void{
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme(): void{

   const links = document.querySelectorAll('.selector');

    links.forEach( (elem: any) => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if (btnThemeUrl === currentTheme){
        elem.classList.add('working');
      }

    });
  }
}
