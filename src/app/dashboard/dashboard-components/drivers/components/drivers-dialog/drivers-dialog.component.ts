import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Drivers } from 'src/app/models/drivers.model';
import { DriversService } from '../../drivers.service';

@Component({
  selector: 'app-drivers-dialog',
  templateUrl: './drivers-dialog.component.html',
  styleUrls: ['./drivers-dialog.component.scss'],
})
export class DriversDialogComponent {
  loadingDialog: boolean = true;
  aviableDrivers: Drivers[] = [];
  nameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  lastNameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  mobileControl = new FormControl('', [Validators.required]);
  ageControl = new FormControl('', [Validators.required]);

  driverForm = new FormGroup({
    name: this.nameControl,
    lastName: this.lastNameControl,
    mobile: this.mobileControl,
    age: this.ageControl,
  });

  constructor(
    private matDialogRef: MatDialogRef<DriversDialogComponent>,
    private driverService: DriversService,
    @Inject(MAT_DIALOG_DATA) public driverId: number
  ) {
    if (driverId) {
      this.driverService.getDriverByID$(driverId).subscribe({
        next: (d) => {
          if (d) {
            this.loadingDialog = false;
            this.driverForm.patchValue(d);
          }
        },
      });
    }
    this.driverService.getDrivers$().subscribe({
      next: (drivers: Drivers[]) => {
        this.aviableDrivers = drivers;
      },
    });
  }

  onSubmit(): void {
    if (this.driverForm.invalid) {
      return this.driverForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.driverForm.value);
    }
  }
}
