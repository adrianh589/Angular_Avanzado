import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit{

  @Input('valor') progreso = 50;
  @Input('btnClass')btnClass = 'btn-primary';

  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  // Los getter se usan igual que las propiedades, asi como esta de progreso que esta arriba
  // get getPorcentaje(): any{
  //   return `${this.progreso}%`;
  // }

  cambiarValor( valor: number ): any{
    if (this.progreso <= 0){
          this.valorSalida.emit(0);
          this.progreso = 0;
        }else if (this.progreso >= 100){
          this.valorSalida.emit(100);
          this.progreso = 100;
        }
    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
  }

  onChange(nuevoValor: number): void{
    if (nuevoValor >= 100){
      this.progreso = 100;
    }else if (nuevoValor <= 0){
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }
    this.valorSalida.emit(this.progreso);
  }
}
