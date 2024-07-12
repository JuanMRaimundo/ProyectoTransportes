import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Trips } from 'src/app/models/trips.model';
import { TripService } from '../trips.service';
import { Drivers } from 'src/app/models/drivers.model';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-trips-table',
  templateUrl: './trips-table.component.html',
  styleUrls: ['./trips-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripsTableComponent {
  @Input() dataSource: Trips[] = [];
  @Output() editTrip = new EventEmitter();
  @Output() deleteTrip = new EventEmitter();

  keyword: string = '';
  searchResults: any[] = [];
  drivers: Drivers[] = [];
  selectedDriver: string = '';
  displayedColumns = [
    'id',
    'time',
    'dispatcher',
    'client',
    'detail',
    'loadingPlace',
    'destinationPlace',
    'driver',
    'mobile',
    'container',
    'expiration',
    'codeRef',
    'actions',
  ];

  constructor(private tripsService: TripService) {}
  ngOnInit(): void {
    this.loadDrivers();
    this.loadTrips();
  }
  onSearch(): void {
    console.log('Keyword:', this.keyword);
    if (this.keyword.trim() !== '') {
      this.tripsService.searchAndFilterTrips$(this.keyword).subscribe({
        next: (results: Trips[]) => {
          this.dataSource = results; // Asigna los resultados de la búsqueda al dataSource
          console.log(results);
        },
        error: (error) => {
          console.error('Error en la búsqueda', error);
        },
      });
    } else {
      /* this.tripsService.getTrips$().subscribe({
        next: (allTrips: Trips[]) => {
          this.dataSource = allTrips; // Asigna todos los viajes al dataSource
        },
        error: (error) => {
          console.error('Error al recuperar todos los viajes', error);
        },
      }); */
      this.loadTrips();
    }
  }

  loadDrivers(): void {
    this.tripsService.getDrivers$().subscribe({
      next: (drivers: Drivers[]) => {
        this.drivers = drivers;
      },
      error: (error) => {
        console.error('Error al cargar choferes', error);
      },
    });
  }
  loadTrips(): void {
    this.tripsService.getTrips$().subscribe({
      next: (allTrips: Trips[]) => {
        this.dataSource = allTrips; // Asigna todos los viajes al dataSource
      },
      error: (error) => {
        console.error('Error al recuperar todos los viajes', error);
      },
    });
  }
  applyDriverFilter(event: MatSelectChange): void {
    const selectedDrivers = event.value;
    if (selectedDrivers && selectedDrivers.length > 0) {
      this.dataSource = this.dataSource.filter((trip) =>
        selectedDrivers.includes(trip.driver)
      );
    } else {
      // Si no se selecciona ningún chofer, muestra todos los viajes
      /*   this.tripsService.getTrips$().subscribe({
        next: (allTrips: Trips[]) => {
          this.dataSource = allTrips;
        },
        error: (error) => {
          console.error('Error al recuperar todos los viajes', error);
        },
      }); */
      this.loadTrips();
    }
  }
}
