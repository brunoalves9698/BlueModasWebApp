export class ClientCommand {

  constructor(
    public id?: string,
    public stateId?: string,
    public cityId?: string,
    public name?: string,
    public email?: string,
    public phone?: string,
    public zipCode?: string,
    public address?: string,
    public addressNumber?: string,
    public neighborhood?: string
  ) { }
}