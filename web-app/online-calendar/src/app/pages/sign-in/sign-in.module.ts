import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { SignInRoutingModule } from './sign-in-routing.module';

@NgModule({
  imports: [CommonModule, SignInRoutingModule],
  declarations: [SignInComponent],
  exports: [SignInComponent],
})
export class SignInModule {}
