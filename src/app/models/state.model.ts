import { Entity } from './core/entity.model';

export class State extends Entity {

  constructor(
    public nome?: string,
    public sigla?: string
  ) {
    super();
  }
}