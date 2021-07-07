import { FormControl } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html'
})
export class ValidationMessageComponent {

  @Input() control: FormControl;
  @Input() fieldName: string;

  private errorPrefix: string;

  constructor() { }

  ngOnInit() {
    this.errorPrefix = this.fieldName ? `O campo \"${this.fieldName}\"` : 'Este campo';
  }

  public hasError(): boolean {
    return this.control.invalid && this.control.touched;
  }

  public getErrorMessage(): string | null {
    if (this.control.errors.required)
      return `${this.errorPrefix}  é obrigatório`;
    else if (this.control.errors.email || this.control.errors.pattern || this.control.errors.cpf || this.control.errors.cnpj || this.control.errors.data)
      return `${this.errorPrefix} está inválido`;
    else if (this.control.errors.minlength)
      return `${this.errorPrefix} deve conter no mínimo ${this.control.errors.minlength.requiredLength} caracteres`;
    else if (this.control.errors.maxlength)
      return `${this.errorPrefix} deve conter no máximo ${this.control.errors.maxlength.requiredLength} caracteres`;
    else if (this.control.errors.noEmaildMatch)
      return `O E-mail e a Confirmação de E-mail devem ser iguais`;
    else if (this.control.errors.noPassswordMatch)
      return `A senha e a confirmação de senha devem ser iguais`;
  }

}
