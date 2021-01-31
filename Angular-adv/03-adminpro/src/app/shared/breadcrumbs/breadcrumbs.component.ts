import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ActivationEnd, Event, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  public titulo: string = '';
  public tituloSubs$: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.tituloSubs$ = this.getArgumentosRuta()
                        .subscribe(({titulo}) => {
                          this.titulo = titulo;
                          document.title = titulo;
                        });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta(){
    return this.router.events
      .pipe(
        filter( event => event instanceof ActivationEnd ),
        // @ts-ignore
        filter( event => event.snapshot.firstChild === null ),
        // @ts-ignore
        map( event => event.snapshot.data ),
      )
  }

}
