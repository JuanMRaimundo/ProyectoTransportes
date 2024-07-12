import { Component } from '@angular/core';
import { Observable, forkJoin, tap } from 'rxjs';
import { UserService } from './user.service';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  users$: Observable<User[]>;
  idUnique: number = 0;
  uniqueToken: string = '';
  loadingUsers: boolean = true;

  constructor(private userService: UserService, private matDialog: MatDialog) {
    this.users$ = this.userService.getUsers$();
    this.users$.subscribe({
      next: () => {
        this.loadingUsers = false;
      },
    });
  }

  addUser(): void {
    forkJoin({
      id: this.userService.gererateUniqueId(this.users$),
      token: this.userService.generateUniqueToken(this.users$),
    })
      .pipe(
        tap((result) => {
          this.matDialog
            .open(UserDialogComponent)
            .afterClosed()
            .subscribe({
              next: (dialogResult: any) => {
                if (dialogResult) {
                  this.users$ = this.userService.creatUser$({
                    id: result.id,
                    name: dialogResult.name,
                    lastName: dialogResult.lastName,
                    userId: dialogResult.userId,
                    password: dialogResult.password,
                    role: dialogResult.role,
                    state: dialogResult.state,
                    token: result.token,
                  });
                }
              },
            });
        })
      )
      .subscribe();
  }

  onEditUser(userId: number): void {
    this.matDialog
      .open(UserDialogComponent, {
        data: userId,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            this.users$ = this.userService.editUser$(userId, result);
          }
        },
      });
  }
  onDeleteUser(userId: number): void {
    Swal.fire({
      title: '¿Estás seguro que desea eliminarlo?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.users$ = this.userService.deleteUser$(userId);
      }
    });
  }

  onIdUnique(): number {
    this.userService.gererateUniqueId(this.users$).subscribe({
      next: (v) => {
        this.idUnique = v;
      },
      complete: () => {},
    });
    return this.idUnique;
  }
  onUniqueToken(): string {
    this.userService.generateUniqueToken(this.users$).subscribe({
      next: (v) => {
        this.uniqueToken = v;
      },
      complete: () => {},
    });
    return this.uniqueToken;
  }
}
