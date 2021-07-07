import { Entity } from './core/entity.model';
import { State } from './state.model';

export class City extends Entity {

  constructor(
    public stateId?: string,
    public nome?: string,
    public state: State = new State()
  ) {
    super();
  }
}