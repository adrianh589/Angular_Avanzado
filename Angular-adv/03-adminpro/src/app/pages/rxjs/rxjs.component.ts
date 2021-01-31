import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, interval, Subscription} from 'rxjs';
import {retry, take, map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalsubs: Subscription;

  constructor() {

    // this.retornaObservable().pipe(
    //   retry(1)// El retry sirve para volver a ejecutar un observable
    // ).subscribe(
    //   valor => console.log('subs:', valor),
    //   error => console.warn('Error', error),
    //   () => console.info('Obs terminado')
    // );

    this.intervalsubs = this.retornaIntervalo()
      .subscribe(
        valor => console.log( valor )
      )

  }

  ngOnDestroy(): void {
        this.intervalsubs.unsubscribe();
    }

  ngOnInit(): void {
  }

  retornaIntervalo(){
      const interval$ = interval(500)
        .pipe(
          // take(10),
          map ( valor => valor + 1),
          filter(par => par%2 == 0)
        );
      return interval$;
  }

  retornaObservable(): Observable<number>{
    let i = -1;
    const obs$ = new Observable<number>( observer =>{
      const intervalo = setInterval( () =>{
        i++;
        observer.next(i);

        if(i === 4){
          clearInterval(intervalo);// Para eliminar el intervalo
          observer.complete();// Esto es para notificar que ya no voy a emitir mas valores
        }

        if(i === 2){
          observer.error('i llego al valor de 2');
        }

      }, 1000)
    });
    return obs$;
  }

}
