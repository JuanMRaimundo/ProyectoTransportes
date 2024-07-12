import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DailyActivity } from 'src/app/models/dailyActivitys.model';

@Component({
  selector: 'app-activitys-tab',
  templateUrl: './activitys-tab.component.html',
  styleUrls: ['./activitys-tab.component.scss'],
})
export class ActivitysTabComponent {
  @Input()
  dataSource: DailyActivity[] = [];
  @Output()
  editActivity = new EventEmitter();
  @Output()
  deleteActivity = new EventEmitter();
}
