import { Injectable } from '@angular/core';
import { Entity } from 'src/app/models/core/entity.model';
import { CryptographyUtil } from '../../utils/cryptography/cryptography.util';

@Injectable({
  providedIn: 'root'
})
export abstract class StorageBase<T extends Entity> {

  constructor(protected storageKey: string) { }

  public getAll(): T[] {
    const data = localStorage.getItem(this.storageKey);
    const decrypted = CryptographyUtil.decrypt(data);

    return decrypted ? decrypted : [];
  }

  public getById(id: string): T {
    const list: T[] = this.getAll();

    if (list.length == 0)
      return null;

    const data: T = list.find((item: T) => {
      return item.id == id;
    });

    return data;
  }

  public async insertItem(item: T) {
    let list: T[] = this.getAll();
    list.push(item);
    await this.insertAll(list);
  }

  public async updateItem(item: T) {
    let list: T[] = this.getAll();

    list = list.map(data => {
      if (data.id == item.id)
        data = item;

      return data;
    });

    await this.insertAll(list);
  }

  private async insertAll(list: T[]) {
    localStorage.setItem(this.storageKey, CryptographyUtil.encrypt(list));
  }

  public async deleteItem(item: T) {
    let list: T[] = this.getAll();
    list = list.filter(data => data.id != item.id);

    if (list.length > 0)
      await this.insertAll(list);
    else
      await this.deleteAll();
  }

  public async deleteAll() {
    localStorage.removeItem(this.storageKey);
  }

}
