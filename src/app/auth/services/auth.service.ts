import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { LoginPayload } from '../auth-models';
import { environment } from 'src/enviroments/enviroments.local';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authUser$ = new BehaviorSubject<User | null>(null);

  public authUser$ = this._authUser$.asObservable();
  constructor(private httpClient: HttpClient, private router: Router) {}

  login(payload: LoginPayload): void {
    this.httpClient
      .get<User[]>(
        `${environment.baseUrl}/users?email=${payload.user}&password=${payload.password}`
      )
      .subscribe({
        next: (response) => {
          if (!response.length) {
            Swal.fire({
              title: 'Usuario o contraseña inválido',
              icon: 'warning',
            });
          } else {
            const authUser = response[0];
            this._authUser$.next(authUser);
            localStorage.setItem('token', authUser.token);
            this.router.navigate(['/dashboard/home']);
          }
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error en el servidor, intente más tarde!',
          });
        },
      });
  }
  verifyToken(): Observable<boolean> {
    return this.httpClient
      .get<User[]>(
        `${environment.baseUrl}/users?token=${localStorage.getItem('token')}`
      )
      .pipe(
        map((users) => {
          if (!users.length) {
            return false;
          } else {
            const authUser = users[0];
            this._authUser$.next(authUser);
            localStorage.setItem('token', authUser.token);
            return true;
          }
        })
      );
  }
  logout(): void {
    this._authUser$.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }
}
