import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrameRoutingModule } from './frame-routing.module';
import { FrameComponent } from './frame.component';
import { NavbarModule } from 'src/app/components/layout/navbar/navbar.module';
import { FooterModule } from 'src/app/components/layout/footer/footer.module';

@NgModule({
  declarations: [
    FrameComponent
  ],
  imports: [
    CommonModule,
    FrameRoutingModule,
    NavbarModule,
    FooterModule
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FrameModule { }
