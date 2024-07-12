import { Injectable } from '@angular/core';
import { Observable, concatMap, delay, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DailyActivity } from 'src/app/models/dailyActivitys.model';
import { environment } from 'src/enviroments/enviroments.local';

@Injectable({ providedIn: 'root' })
export class ActivityService {
  constructor(private httpClient: HttpClient) {}

  getActivity$(): Observable<DailyActivity[]> {
    return this.httpClient
      .get<DailyActivity[]>(`${environment.baseUrl}/dailyActivitys`)
      .pipe(delay(1000));
  }

  creatActivity$(payload: DailyActivity): Observable<DailyActivity[]> {
    return this.httpClient
      .post<DailyActivity>(`${environment.baseUrl}/dailyActivitys`, payload)
      .pipe(concatMap(() => this.getActivity$()));
  }
  deleteActivity$(id: number): Observable<DailyActivity[]> {
    return this.httpClient
      .delete<DailyActivity[]>(`${environment.baseUrl}/dailyActivitys/${id}`)
      .pipe(concatMap(() => this.getActivity$()));
  }

  editActivity$(
    id: number,
    payload: DailyActivity
  ): Observable<DailyActivity[]> {
    return this.httpClient
      .put<DailyActivity>(
        `${environment.baseUrl}/dailyActivitys/${id}`,
        payload
      )
      .pipe(concatMap(() => this.getActivity$()));
  }
  getActivityByID$(id: number): Observable<DailyActivity | undefined> {
    return this.getActivity$().pipe(
      map((activity) => activity.find((a) => a.id === id))
    );
  }
  gererateUniqueId(data$: Observable<DailyActivity[]>): Observable<number> {
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
