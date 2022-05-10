import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';

import { Acao, Acoes, AcoesAPI } from './modelo/acoes.interface';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private http: HttpClient) { }

  public getAcoes(): Observable<Acoes> {
    return this.http.get<AcoesAPI>('http://localhost:3000/acoes').pipe(
      tap(acoes => console.log(acoes)),
      pluck('payload'),
      map(acoes => acoes.sort((acaoA, acaoB) => this.ordenaPorCodigo(acaoA, acaoB)))
    );
  }

  ordenaPorCodigo(acaoA: Acao, acaoB: Acao): number {
    if(acaoA.codigo > acaoB.codigo) {
      return 1;
    };

    if(acaoA.codigo < acaoB.codigo) {
      return -1;
    }

    return 0;
  }


}
