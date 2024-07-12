import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, concatMap, delay, finalize, map, throwError } from 'rxjs';
import { Drivers } from 'src/app/models/drivers.model';

import { environment } from 'src/enviroments/enviroments.local';

@Injectable({ providedIn: 'root' })
export class DriversService {
  constructor(private httpClient: HttpClient) {}

  getDrivers$(): Observable<Drivers[]> {
    return this.httpClient
      .get<Drivers[]>(`${environment.baseUrl}/drivers`)
      .pipe(delay(1000));
  }

  creatDrivers$(payload: Drivers): Observable<Drivers[]> {
    return this.httpClient
      .post<Drivers>(`${environment.baseUrl}/drivers`, payload)
      .pipe(
        concatMap(() => {
          return this.getDrivers$();
        })
      );
  }

  editDriver$(id: number, payload: Drivers): Observable<Drivers[]> {
    return this.httpClient
      .put<Drivers>(`${environment.baseUrl}/drivers/${id}`, payload)
      .pipe(
        concatMap(() => {
          return this.getDrivers$();
        })
      );
  }
  deleteDriver$(id: number): Observable<Drivers[]> {
    return this.httpClient
      .delete<Drivers[]>(`${environment.baseUrl}/drivers/${id}`)
      .pipe(
        concatMap(() => {
          return this.getDrivers$();
        })
      );
  }

  getDriverByID$(id: number): Observable<Drivers | undefined> {
    return this.getDrivers$().pipe(
      map((drivers) => drivers.find((d) => d.id === id))
    );
  }
  gererateUniqueId(data$: Observable<Drivers[]>): Observable<number> {
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
}
