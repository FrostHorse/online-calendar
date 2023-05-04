import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/core/models/user';
import { Nullable } from 'src/app/models/nullable/nullable';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  public user$: Observable<Nullable<User>> = this.authService.user$;

  constructor(private readonly authService: AuthService) {}
}
