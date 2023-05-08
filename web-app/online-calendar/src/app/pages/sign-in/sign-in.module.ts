import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IconModule } from 'src/app/shared/icon/icon.module';
import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';

@NgModule({
  imports: [CommonModule, SignInRoutingModule, ReactiveFormsModule, IconModule],
  declarations: [SignInComponent],
  exports: [SignInComponent],
})
export class SignInModule {}
