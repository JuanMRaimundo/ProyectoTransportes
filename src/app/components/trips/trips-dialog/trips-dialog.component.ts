import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Drivers } from 'src/app/models/drivers.model';
import { TripService } from '../trips.service';

@Component({
  selector: 'app-trips-dialog',
  templateUrl: './trips-dialog.component.html',
  styleUrls: ['./trips-dialog.component.scss'],
})
export class TripsDialogComponent {
  loadingDialog: boolean = true;
  availableDrivers: Drivers[] = [];
  timeControl = new FormControl('', [Validators.required]);
  dispatcherControl = new FormControl('', [Validators.required]);
  clientControl = new FormControl('', [Validators.required]);
  detailControl = new FormControl('', [Validators.required]);
  loadingPlaceControl = new FormControl('', [Validators.required]);
  destinationPlaceControl = new FormControl('', [Validators.required]);
  driverControl = new FormControl('', [Validators.required]);
  mobileControl = new FormControl();
  containerControl = new FormControl();
  expirationControl = new FormControl('', [Validators.required]);
  codeRefControl = new FormControl('', [Validators.required]);

  tripForm = new FormGroup({
    time: this.timeControl,
    dispatcher: this.dispatcherControl,
    client: this.clientControl,
    detail: this.detailControl,
    loadingPlace: this.loadingPlaceControl,
    destinationPlace: this.destinationPlaceControl,
    driver: this.driverControl,
    mobile: this.mobileControl,
    container: this.containerControl,
    expiration: this.expirationControl,
    codeRef: this.codeRefControl,
  });

  constructor(
    private matDialogRef: MatDialogRef<TripsDialogComponent>,
    private tripsService: TripService,
    @Inject(MAT_DIALOG_DATA) public tripID: number
  ) {
    if (tripID) {
      this.tripsService.getTripById$(tripID).subscribe({
        next: (t) => {
          if (t) {
            this.loadingDialog = false;
            this.tripForm.patchValue(t);
          }
        },
      });
    }
    this.tripsService.getDrivers$().subscribe({
      next: (drivers: Drivers[]) => {
        this.availableDrivers = drivers;
      },
    });
  }

  onSubmit(): void {
    if (this.tripForm.invalid) {
      return this.tripForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.tripForm.value);
      this.loadingDialog = false;
    }
  }
}
