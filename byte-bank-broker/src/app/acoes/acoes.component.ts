import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Acoes } from './modelo/acoes.interface';
import { AcoesService } from './acoes.service';
import { merge, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

const DELAY = 300;

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {

  acoesInput = new FormControl();

  todasAcoes$ = this.acoesService.getAcoes();

  filtroPeloInput$ = this.acoesInput.valueChanges.pipe(
    debounceTime(DELAY),
    filter((valor: string) => valor.length >= 3 || !valor.length),
    distinctUntilChanged(),
    switchMap(valor => this.acoesService.getAcoes(valor))
  );

  acoes$: Observable<Acoes> = merge(this.todasAcoes$, this.filtroPeloInput$);

  constructor(private acoesService: AcoesService) {}
}
