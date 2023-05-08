import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  public signInForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  public autoLogIn$ = this.authService.autoLogIn();

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  public signIn(): void {
    if (
      this.signInForm.valid &&
      this.signInForm.value.email &&
      this.signInForm.value.password
    ) {
      this.authService
        .signIn(this.signInForm.value.email, this.signInForm.value.password)
        .pipe(take(1))
        .subscribe();
    }
  }

  public navigateToSignUp(): void {
    this.router.navigate(['sign-up']);
  }
}
