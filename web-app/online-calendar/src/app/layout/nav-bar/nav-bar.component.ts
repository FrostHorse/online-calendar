import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/core/models/user';
import { Nullable } from 'src/app/models/nullable/nullable';
import { deselectCalendarAction } from 'src/app/pages/calendar/store/actions/calendar.actions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  public user$: Observable<Nullable<User>> = this.authService.user$;

  constructor(
    private readonly authService: AuthService,
    private readonly store: Store
  ) {}

  deselectCalendar(): void {
    this.store.dispatch(deselectCalendarAction());
  }

  logout(): void {
    this.authService.logout();
  }
}
