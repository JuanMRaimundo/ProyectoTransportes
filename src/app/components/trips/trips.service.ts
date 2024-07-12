import { Injectable } from '@angular/core';
import { Trips } from '../../models/trips.model';
import { Observable, catchError, concatMap, delay, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../enviroments/enviroments.local';
import { Drivers } from 'src/app/models/drivers.model';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor(private httpClient: HttpClient) {}

  getTrips$(): Observable<Trips[]> {
    return this.httpClient
      .get<Trips[]>(`${environment.baseUrl}/trips`)
      .pipe(delay(1500));
  }

  creatTrip$(payload: Trips): Observable<Trips[]> {
    return this.httpClient
      .post<Trips[]>(`${environment.baseUrl}/trips`, payload)
      .pipe(concatMap(() => this.getTrips$()));
  }

  getTripById$(id: number): Observable<Trips | undefined> {
    return this.getTrips$().pipe(
      map((trips) => trips.find((t) => t.id === id)),
      catchError((error) => {
        console.error('Error al obtener el viaje por ID', error);
        return of(undefined);
      })
    );
  }

  editTrip$(id: number, payload: Trips): Observable<Trips[]> {
    return this.httpClient
      .put<Trips>(`${environment.baseUrl}/trips/${id}`, payload)
      .pipe(concatMap(() => this.getTrips$()));
  }

  deleteTrip$(id: number): Observable<Trips[]> {
    return this.httpClient
      .delete(`${environment.baseUrl}/trips/${id}`)
      .pipe(concatMap(() => this.getTrips$()));
  }
  gererateUniqueId(data$: Observable<Trips[]>): Observable<number> {
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

  getDrivers$(): Observable<Drivers[]> {
    return this.httpClient.get<Drivers[]>(`${environment.baseUrl}/drivers`);
  }

  searchAndFilterTrips$(keyword: string): Observable<Trips[]> {
    return this.getTrips$().pipe(
      map((trips) =>
        trips.filter((trip) => this.tripMatchesKeyword(trip, keyword))
      )
    );
  }

  private tripMatchesKeyword(trip: Trips, keyword: string): boolean {
    return (
      trip.time.toLowerCase().includes(keyword.toLowerCase()) ||
      trip.dispatcher.toLowerCase().includes(keyword.toLowerCase()) ||
      trip.client.toLowerCase().includes(keyword.toLowerCase()) ||
      trip.loadingPlace
        .toLocaleLowerCase()
        .includes(keyword.toLocaleLowerCase()) ||
      trip.destinationPlace
        .toLocaleLowerCase()
        .includes(keyword.toLocaleLowerCase()) ||
      trip.driver.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
    );
  }
}
