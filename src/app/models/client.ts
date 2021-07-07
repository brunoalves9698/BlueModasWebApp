import { City } from './city.model';
import { Entity } from './core/entity.model';

export class Client extends Entity {

  constructor(
    public stateId?: string,
    public cityId?: string,
    public name?: string,
    public email?: string,
    public phone?: string,
    public zipCode?: string,
    public address?: string,
    public addressNumber?: string,
    public neighborhood?: string,
    public city: City = new City()
  ) {
    super();
  }
}