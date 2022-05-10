import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AcoesAPI } from './modelo/acoes.interface';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private http: HttpClient) { }

  public getAcoes(): Observable<AcoesAPI> {
    return this.http.get<AcoesAPI>('http://localhost:3000/acoes');
  }
}
