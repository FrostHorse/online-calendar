import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { Nullable } from 'src/app/models/nullable/nullable';

@Component({
  selector: 'app-user-chip',
  templateUrl: './user-chip.component.html',
  styleUrls: ['./user-chip.component.scss'],
})
export class UserChipComponent {
  @Input() user: Nullable<User>;
  @Output() removeUserEventEmitter = new EventEmitter<string>();
  constructor() {}

  removeUser(): void {
    if (this.user) {
      this.removeUserEventEmitter.emit(this.user._id);
    }
  }
}
