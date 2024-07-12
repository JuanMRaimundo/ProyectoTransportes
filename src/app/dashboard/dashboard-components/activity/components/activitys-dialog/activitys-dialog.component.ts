import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DailyActivity } from 'src/app/models/dailyActivitys.model';

@Component({
  selector: 'app-activitys-dialog',
  templateUrl: './activitys-dialog.component.html',
  styleUrls: ['./activitys-dialog.component.scss'],
})
export class ActivitysDialogComponent {
  titleControl = new FormControl();
  descriptionControl = new FormControl();
  startTimeControl = new FormControl();
  endTimeControl = new FormControl();

  activityForm = new FormGroup({
    title: this.titleControl,
    description: this.descriptionControl,
    startTime: this.startTimeControl,
    endTime: this.endTimeControl,
  });

  constructor(
    private matDialogRef: MatDialogRef<ActivitysDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public activity: DailyActivity
  ) {
    if (activity) {
      this.activityForm.patchValue(activity);
    }
  }

  onSubmit(): void {
    if (this.activityForm.invalid) {
      return this.activityForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.activityForm.value);
    }
  }
}
