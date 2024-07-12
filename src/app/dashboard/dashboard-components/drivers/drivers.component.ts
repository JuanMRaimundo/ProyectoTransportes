import { Component } from '@angular/core';
import { Observable, forkJoin, tap } from 'rxjs';
import { Drivers } from 'src/app/models/drivers.model';
import { DriversService } from './drivers.service';
import { MatDialog } from '@angular/material/dialog';
import { DriversDialogComponent } from './components/drivers-dialog/drivers-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss'],
})
export class DriversComponent {
  drivers$: Observable<Drivers[]>;
  idUnique: number = 0;

  loadingDrivers: boolean = true;

  constructor(
    private driversService: DriversService,
    private matDialog: MatDialog
  ) {
    this.drivers$ = this.driversService.getDrivers$();
    this.drivers$.subscribe({
      next: () => {
        this.loadingDrivers = false;
      },
    });
  }

  addDriver(): void {
    forkJoin({
      id: this.driversService.gererateUniqueId(this.drivers$),
    })
      .pipe(
        tap((result) => {
          this.matDialog
            .open(DriversDialogComponent)
            .afterClosed()
            .subscribe({
              next: (dialogResult: any) => {
                if (dialogResult) {
                  this.drivers$ = this.driversService.creatDrivers$({
                    id: result.id,
                    name: dialogResult.name,
                    lastName: dialogResult.lastName,
                    mobile: dialogResult.mobile,
                    age: dialogResult.age,
                  });
                }
              },
            });
        })
      )
      .subscribe();
  }

  onEditDriver(driverId: number): void {
    this.matDialog
      .open(DriversDialogComponent, {
        data: driverId,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            this.drivers$ = this.driversService.editDriver$(driverId, result);
          }
        },
      });
  }
  onDeleteDriver(driverId: number): void {
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
        this.drivers$ = this.driversService.deleteDriver$(driverId);
      }
    });
  }

  onIdUnique(): number {
    this.driversService.gererateUniqueId(this.drivers$).subscribe({
      next: (v) => {
        this.idUnique = v;
      },
      complete: () => {},
    });
    return this.idUnique;
  }
}
