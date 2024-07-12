import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { Observable, catchError, tap } from 'rxjs';
import { DemoFlexyModule } from 'src/app/demo-flexy-module';
import { Trips } from 'src/app/models/trips.model';
import { TripService } from './trips.service';
import { TripsDialogComponent } from './trips-dialog/trips-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  /* imports: [DemoFlexyModule, MatTabsModule, NgFor, NgIf, AsyncPipe], */
  styleUrls: ['./trips.component.scss'],
})
export class TripsComponent {
  trips$: Observable<Trips[]>;
  idUnique: number = 0;
  loadingTrips: boolean = true;
  keyword: string = '';
  searchResults: any[] = [];
  constructor(private matDialog: MatDialog, private tripsService: TripService) {
    this.trips$ = this.tripsService.getTrips$();
    this.trips$.subscribe({
      next: () => {
        this.loadingTrips = false;
      },
    });
  }

  addTrip(): void {
    this.matDialog
      .open(TripsDialogComponent)
      .afterClosed()
      .subscribe({
        next: (result: any) => {
          if (result) {
            this.loadingTrips = true;
            this.trips$ = this.tripsService.creatTrip$({
              id: this.onIdUnique(),
              time: result.time,
              dispatcher: result.dispatcher,
              client: result.client,
              detail: result.detail,
              loadingPlace: result.loadingPlace,
              destinationPlace: result.destinationPlace,
              driver: result.name,
              mobile: result.mobile,
              container: result.container,
              expiration: result.expiration,
              codeRef: result.codeRef,
            });
          }
        },
      });
  }

  onEditTrip(tripID: number): void {
    this.matDialog
      .open(TripsDialogComponent, {
        data: tripID,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            this.trips$ = this.tripsService.editTrip$(tripID, result);
            this.loadingTrips = false;
          }
        },
      });
  }

  onDeleteTrip(tripID: number): void {
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
        this.trips$ = this.tripsService.deleteTrip$(tripID);
      }
    });
  }
  onIdUnique(): number {
    this.tripsService.gererateUniqueId(this.trips$).subscribe({
      next: (v) => {
        this.idUnique = v;
      },
      complete: () => {},
    });
    return this.idUnique;
  }

  /*  onSearch(): void {
    console.log('Keyword:', this.keyword);
    if (this.keyword.trim() !== '') {
      this.tripsService
        .search$(this.keyword)
        .pipe(
          tap((results: any[]) => {
            this.searchResults = results;
            console.log('Keyword 2:', this.keyword);
          }),
          catchError((error) => {
            console.error('Error en la búsqueda', error);
            throw error; // Re-throw the error to propagate it downstream
          })
        )
        .subscribe();
    }
  } */
}
