import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import * as L from 'leaflet';
import { Subject, takeUntil } from 'rxjs';
import { Flight, FlightStatus } from './flight.model';
import { FlightService } from './flight.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit, OnDestroy {
  readonly flights: Flight[];
  readonly filterForm;
  filteredFlights: Flight[];
  selectedFlight: Flight;
  map?: L.Map;
  private routeLine?: L.Polyline;
  private markers: L.Marker[] = [];
  private readonly destroy$ = new Subject<void>();
  readonly statuses: Array<FlightStatus | 'All'> = ['All', 'En route', 'Delayed', 'Boarding', 'Arrived'];

  constructor(private readonly flightService: FlightService, private readonly formBuilder: FormBuilder) {
    this.flights = this.flightService.getFlights();
    this.filterForm = this.formBuilder.nonNullable.group({ search: '', status: 'All', origin: 'All', destination: 'All' });
    this.filteredFlights = this.flights;
    this.selectedFlight = this.flights[0];
    this.filterForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.filteredFlights = this.applyFilters();
      if (!this.filteredFlights.some((flight) => flight.id === this.selectedFlight.id)) this.selectedFlight = this.filteredFlights[0] ?? this.flights[0];
      this.renderMarkers();
      this.drawRoute(this.selectedFlight);
    });
  }

  ngAfterViewInit(): void {
    this.map = L.map('flight-map', { zoomControl: false, worldCopyJump: true }).setView([25, 15], 2.4);
    L.control.zoom({ position: 'bottomright' }).addTo(this.map);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; OpenStreetMap &copy; CARTO', maxZoom: 19 }).addTo(this.map);
    this.renderMarkers();
    this.drawRoute(this.selectedFlight);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.map?.remove();
  }

  selectFlight(flight: Flight): void {
    this.selectedFlight = flight;
    this.drawRoute(flight);
    this.map?.flyTo([flight.current.lat, flight.current.lng], 4, { duration: 0.8 });
  }

  resetFilters(): void { this.filterForm.reset({ search: '', status: 'All', origin: 'All', destination: 'All' }); }
  get activeFlights(): number { return this.flights.filter((flight) => flight.status === 'En route').length; }
  get delayedFlights(): number { return this.flights.filter((flight) => flight.status === 'Delayed').length; }
  get arrivedFlights(): number { return this.flights.filter((flight) => flight.status === 'Arrived').length; }
  get origins(): string[] { return [...new Set(this.flights.map((flight) => flight.origin.code))].sort(); }
  get destinations(): string[] { return [...new Set(this.flights.map((flight) => flight.destination.code))].sort(); }

  private applyFilters(): Flight[] {
    const { search, status, origin, destination } = this.filterForm.getRawValue();
    const query = search.trim().toLowerCase();
    return this.flights.filter((flight) => (!query || flight.callsign.toLowerCase().includes(query) || flight.flightNumber.toLowerCase().includes(query)) && (status === 'All' || flight.status === status) && (origin === 'All' || flight.origin.code === origin) && (destination === 'All' || flight.destination.code === destination));
  }

  private renderMarkers(): void {
    if (!this.map) return;
    this.markers.forEach((marker) => marker.remove());
    this.markers = this.filteredFlights.map((flight) => {
      const marker = L.marker([flight.current.lat, flight.current.lng], { icon: this.markerIcon(flight) }).addTo(this.map as L.Map).bindTooltip(`${flight.flightNumber} · ${flight.status}`, { direction: 'top', offset: [0, -16] });
      marker.on('click', () => this.selectFlight(flight));
      return marker;
    });
  }

  private drawRoute(flight: Flight): void {
    if (!this.map) return;
    this.routeLine?.remove();
    this.routeLine = L.polyline([[flight.origin.lat, flight.origin.lng], [flight.current.lat, flight.current.lng], [flight.destination.lat, flight.destination.lng]], { color: '#f7b955', weight: 2, dashArray: '6 8', opacity: 0.9 }).addTo(this.map);
  }

  private markerIcon(flight: Flight): L.DivIcon {
    const color = flight.status === 'Delayed' ? '#f07d5f' : flight.status === 'Arrived' ? '#77c8a1' : '#f7b955';
    return L.divIcon({ className: 'flight-marker', html: `<span style="--marker-color: ${color}"><i></i></span>`, iconSize: [22, 22], iconAnchor: [11, 11] });
  }
}
