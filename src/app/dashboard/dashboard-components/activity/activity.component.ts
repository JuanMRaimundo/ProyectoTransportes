import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { DailyActivity } from 'src/app/models/dailyActivitys.model';
import { ActivityService } from './activity.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivitysDialogComponent } from './components/activitys-dialog/activitys-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
})
export class ActivityComponent {
  activitys$: Observable<DailyActivity[]>;
  idUnique: number = 0;
  loadingActivitys: boolean = true;

  constructor(
    private activityService: ActivityService,
    private matDialog: MatDialog
  ) {
    this.activitys$ = this.activityService.getActivity$();
    this.activitys$.subscribe({
      next: () => {
        this.loadingActivitys = false;
      },
    });
  }

  addActivity(): void {
    this.matDialog
      .open(ActivitysDialogComponent)
      .afterClosed()
      .subscribe({
        next: (result: any) => {
          if (result) {
            this.activityService
              .creatActivity$({
                id: this.onIdUnique(),
                title: result.title,
                description: result.description,
                startTime: result.startTime,
                endTime: result.endTime,
              })
              .pipe(switchMap(() => this.activityService.getActivity$()))
              .subscribe((activitys) => {
                this.activitys$ = of(activitys);
              });
          }
        },
      });
  }

  onEditActivity(activityID: number): void {
    this.activityService.getActivityByID$(activityID).subscribe({
      next: (activity) => {
        if (activity) {
          this.matDialog
            .open(ActivitysDialogComponent, {
              data: activity,
            })
            .afterClosed()
            .subscribe({
              next: (result) => {
                if (!!result) {
                  this.activitys$ = this.activityService.editActivity$(
                    activityID,
                    result
                  );
                }
              },
            });
        }
      },
    });
  }

  onDeleteActivity(activityID: number): void {
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
        this.activitys$ = this.activityService.deleteActivity$(activityID);
      }
    });
  }

  onIdUnique(): number {
    this.activityService.gererateUniqueId(this.activitys$).subscribe({
      next: (v) => {
        this.idUnique = v;
      },
      complete: () => {},
    });
    return this.idUnique;
  }
}
