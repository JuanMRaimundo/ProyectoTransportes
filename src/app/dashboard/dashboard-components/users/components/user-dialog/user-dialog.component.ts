import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent {
  loadingDialog: boolean = true;
  aviableUsers: User[] = [];
  nameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  lastNameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  userIdControl = new FormControl('', [Validators.required]);
  roleControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [
    Validators.minLength(8),
    Validators.required,
  ]);

  userForm = new FormGroup({
    name: this.nameControl,
    lastName: this.lastNameControl,
    userId: this.userIdControl,
    role: this.roleControl,
    password: this.passwordControl,
  });

  constructor(
    private matDialogRef: MatDialogRef<UserDialogComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public userId: number
  ) {
    if (userId) {
      this.userService.getUserByID$(userId).subscribe({
        next: (t) => {
          if (t) {
            this.loadingDialog = false;
            this.userForm.patchValue(t);
          }
        },
      });
    }
    this.userService.getUsers$().subscribe({
      next: (users: User[]) => {
        this.aviableUsers = users;
      },
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return this.userForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.userForm.value);
    }
  }
}
