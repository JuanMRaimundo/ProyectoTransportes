import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent {
  @Input()
  dataSource: User[] = [];
  @Output()
  editUser = new EventEmitter();
  @Output()
  deleteUser = new EventEmitter();
}
