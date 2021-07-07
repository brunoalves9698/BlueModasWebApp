import { FeaturedTextComponent } from './featured-text/featured-text.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationMessageComponent } from './validation-message/validation-message.component';
import { LoadingSkeletonComponent } from './loading-skeleton/loading-skeleton.component';

@NgModule({
  declarations: [
    LoadingSkeletonComponent,
    ValidationMessageComponent,
    FeaturedTextComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    LoadingSkeletonComponent,
    ValidationMessageComponent,
    FeaturedTextComponent
  ]
})
export class SharedComponentsModule { }
