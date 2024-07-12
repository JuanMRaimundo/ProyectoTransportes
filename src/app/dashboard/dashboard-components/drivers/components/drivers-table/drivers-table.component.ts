import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Drivers } from 'src/app/models/drivers.model';

@Component({
  selector: 'app-drivers-table',
  templateUrl: './drivers-table.component.html',
  styleUrls: ['./drivers-table.component.scss'],
})
export class DriversTableComponent {
  @Input()
  dataSource: Drivers[] = [];
  @Output()
  editDriver = new EventEmitter();
  @Output()
  deleteDriver = new EventEmitter();
}
