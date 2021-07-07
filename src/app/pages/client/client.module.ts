import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxMaskModule, IConfig } from 'ngx-mask';

import { ClientRoutingModule } from './client-routing.module';
import { ClienteComponent } from './client.component';
import { SharedComponentsModule } from 'src/app/components/shared/shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const maskConfig: Partial<IConfig> = {
  dropSpecialCharacters: false
};

@NgModule({
  declarations: [ClienteComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),
    SharedComponentsModule
  ]
})
export class ClientModule { }
