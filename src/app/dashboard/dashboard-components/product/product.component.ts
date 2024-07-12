import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Trips } from 'src/app/models/trips.model';
import { environment } from 'src/enviroments/enviroments.local';

export interface DashboardTable {
  codeRef: string;
  time: string;
  dispatcher: string;
  client: string;
  driver: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(private http: HttpClient) {}
  displayedColumns: string[] = ['id', 'dispatcher', 'client', 'time', 'driver'];
  loadingTrips: boolean = true;
  @Input()
  dataSource: DashboardTable[] = [];

  ngOnInit(): void {
    setTimeout(() => {
      this.http
        .get<Trips[]>(`${environment.baseUrl}/trips`)
        .subscribe((data) => {
          if (data) {
            this.loadingTrips = false;
            this.dataSource = data.map((trip) => ({
              codeRef: trip.codeRef,
              time: trip.time,
              dispatcher: trip.dispatcher,
              client: trip.client,
              driver: trip.driver,
            }));
          }
        });
    }, 1000);
  }
}
