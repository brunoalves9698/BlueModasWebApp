import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) { }

  get(cep: string): Promise<any> {
    cep = cep.replace(/\D/g, '');
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json`).toPromise();
  }
}
