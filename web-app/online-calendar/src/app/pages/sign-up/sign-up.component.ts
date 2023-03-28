import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { SignUpService } from './services/sign-up.service';

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

  constructor(private readonly signUpService: SignUpService) {}

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
      this.signUpService.createUser(user).pipe(take(1)).subscribe();
    }
  }
}
