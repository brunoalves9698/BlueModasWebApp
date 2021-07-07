import { Injectable } from '@angular/core';
import { Client } from 'src/app/models/client';
import { StorageBase } from './core/storage-base.storage';

@Injectable({
  providedIn: 'root'
})
export class ClientStorage extends StorageBase<Client>{

  constructor() {
    super('bluemodas.client');
  }

}
