import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule } from 'src/app/shared/icon/icon.module';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';

@NgModule({
  imports: [CommonModule, SignUpRoutingModule, ReactiveFormsModule, IconModule],
  declarations: [SignUpComponent],
  exports: [SignUpComponent],
})
export class SignUpModule {}
