export class GenericResultCommand {

  constructor(
    public success?: boolean,
    public message?: string,
    public data?: any,
  ) { }
}