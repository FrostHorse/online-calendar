import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  public signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  public signUp(): void {
    if (
      this.signUpForm.valid &&
      this.signUpForm.value.name &&
      this.signUpForm.value.email &&
      this.signUpForm.value.password &&
      this.signUpForm.value.phoneNumber
    ) {
      const user: User = {
        name: this.signUpForm.value.name,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password,
        phoneNumber: this.signUpForm.value.phoneNumber,
      };
      this.authService.signUp(user).pipe(take(1)).subscribe();
    }
  }

  public navigateToSignIn(): void {
    this.router.navigate(['sign-in']);
  }
}
