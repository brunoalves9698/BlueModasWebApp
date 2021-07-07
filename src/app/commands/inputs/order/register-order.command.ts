import { ProductCommand } from './product.command';
import { ClientCommand } from './client.command';

export class RegisterOrderCommand {

  constructor(
    public client?: ClientCommand,
    public products?: ProductCommand[]
  ) { }
}