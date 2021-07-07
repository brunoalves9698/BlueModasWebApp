import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IbgeService {

  private resourceUrl: string;

  constructor(private http: HttpClient) {
    this.resourceUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/';
  }

  getStates(): Promise<any> {
    return this.http.get<any>(this.resourceUrl + 'estados').toPromise();
  }

  getCities(uf: number): Promise<any> {
    return this.http.get<any>(this.resourceUrl + 'estados/' + uf + '/municipios').toPromise();
  }

}
