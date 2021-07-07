import { GenericResultCommand } from 'src/app/commands/core/generic-result.command';
import { Injectable, Injector, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Entity } from 'src/app/models/core/entity.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class ServiceBase<T extends Entity> {

  protected http: HttpClient;
  protected apiUrl: string

  constructor(
    @Inject(String) protected endpoint: string,
    protected injector: Injector
  ) {
    this.http = this.injector.get(HttpClient);
    this.apiUrl = `${environment.apiUrl}/${endpoint}`;
  }

  getAll(): Promise<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}`).toPromise();
  }

  getById(id: number): Promise<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`).toPromise();
  }

  post(resource: T): Promise<GenericResultCommand> {
    return this.http.post<GenericResultCommand>(this.apiUrl, resource).toPromise();
  }

  put(resource: T): Promise<GenericResultCommand> {
    if (resource.id)
      return this.http.put<GenericResultCommand>(`${this.apiUrl}/${resource.id}`, resource).toPromise();
    else
      return this.http.put<GenericResultCommand>(`${this.apiUrl}`, resource).toPromise();
  }

  delete(id: number): Promise<GenericResultCommand> {
    return this.http.delete<GenericResultCommand>(`${this.apiUrl}/${id}`).toPromise();
  }

}
