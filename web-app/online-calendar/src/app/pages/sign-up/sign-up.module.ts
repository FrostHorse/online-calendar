import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpComponent } from './sign-up.component';

@NgModule({
  imports: [CommonModule, SignUpRoutingModule, ReactiveFormsModule],
  declarations: [SignUpComponent],
  exports: [SignUpComponent],
})
export class SignUpModule {}
