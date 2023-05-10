import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  debounceTime,
  map,
} from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/core/models/user';
import { Nullable } from 'src/app/models/nullable/nullable';

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss'],
})
export class UserSelectorComponent {
  @Input() selectedUsers: Nullable<User[]> = [];
  @Output() selectedUsersEventEmitter = new EventEmitter<User>();
  @Output() removeUserEventEmitter = new EventEmitter<string>();
  public searchBar = new FormControl('');
  public searchText$ = new BehaviorSubject<string>('');
  public selectedUsers$: Observable<User[]>;
  public isSelected$ = new BehaviorSubject<boolean>(false);
  private allUser$ = this.authService.users$;

  constructor(private readonly authService: AuthService) {
    this.selectedUsers$ = combineLatest([this.searchText$, this.allUser$]).pipe(
      debounceTime(200),
      map(([searchText, allUser]: [string, User[]]) =>
        Object.values(allUser)
          .filter(
            (user) =>
              user.name.toLowerCase().includes(searchText) &&
              !this.selectedUsers?.some(({ _id }) => _id === user._id)
          )
          .slice(0, 5)
      )
    );
  }

  changeSearchText(): void {
    this.searchText$.next(this.searchBar.value?.toLowerCase() ?? '');
  }

  onFocus(): void {
    this.isSelected$.next(true);
  }

  onBlur(): void {
    setTimeout(() => {
      this.isSelected$.next(false);
    }, 200);
  }

  selectUser(user: User): void {
    this.selectedUsersEventEmitter.emit(user);
    this.searchText$.next('');
  }

  removeUser(userId: string): void {
    this.removeUserEventEmitter.emit(userId);
    this.searchText$.next('');
  }
}
