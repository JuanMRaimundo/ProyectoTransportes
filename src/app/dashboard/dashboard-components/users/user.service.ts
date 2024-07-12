import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, concatMap, delay, map, throwError } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/enviroments/enviroments.local';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUsers$(): Observable<User[]> {
    return this.httpClient
      .get<User[]>(`${environment.baseUrl}/users`)
      .pipe(delay(1000));
  }

  creatUser$(payload: User): Observable<User[]> {
    //OJO EN ESTA FUNCIÓN EL ROL DE ADMIN, PUEDE QUE NO FUNCIONE DE ESTA FORMA
    if (payload.role !== 'ADMIN') {
      return throwError(
        () => new Error('Solo los administradores pueden crear nuevos usuarios')
      );
    }

    return this.httpClient
      .post<User>(`${environment.baseUrl}/users`, payload)
      .pipe(
        concatMap(() => {
          return this.getUsers$().pipe();
        })
      );
  }

  editUser$(id: number, payload: User): Observable<User[]> {
    return this.httpClient
      .put<User>(`${environment.baseUrl}/users/${id}`, payload)
      .pipe(
        concatMap(() => {
          return this.getUsers$();
        })
      );
  }
  deleteUser$(id: number): Observable<User[]> {
    return this.httpClient
      .delete<User[]>(`${environment.baseUrl}/users/${id}`)
      .pipe(
        concatMap(() => {
          return this.getUsers$();
        })
      );
  }

  getUserByID$(id: number): Observable<User | undefined> {
    return this.getUsers$().pipe(
      map((users) => users.find((u) => u.id === id))
    );
  }
  gererateUniqueId(data$: Observable<User[]>): Observable<number> {
    return data$.pipe(
      map((objects) => {
        const maxID = objects.reduce(
          (max, obj) => (obj.id > max ? obj.id : max),
          0
        );
        let newId = maxID + 1;

        while (objects.some((obj) => obj.id === newId)) {
          newId++;
        }
        return newId;
      })
    );
  }
  generateUniqueToken(data$: Observable<User[]>): Observable<string> {
    return data$.pipe(
      map((objects) => {
        let randomToken: string;
        do {
          randomToken = (Math.floor(Math.random() * 9000) + 1000).toString();
        } while (objects.some((obj) => obj.token == randomToken));

        return randomToken;
      })
    );
  }
}
