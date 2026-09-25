import { Injectable } from '@angular/core';
import { Flight } from './flight.model';

const airports = {
  LHR: { code: 'LHR', name: 'Heathrow', city: 'London', country: 'UK', lat: 51.47, lng: -0.4543 },
  JFK: { code: 'JFK', name: 'John F. Kennedy', city: 'New York', country: 'USA', lat: 40.6413, lng: -73.7781 },
  CDG: { code: 'CDG', name: 'Charles de Gaulle', city: 'Paris', country: 'France', lat: 49.0097, lng: 2.5479 },
  DXB: { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'UAE', lat: 25.2532, lng: 55.3657 },
  SIN: { code: 'SIN', name: 'Changi', city: 'Singapore', country: 'Singapore', lat: 1.3644, lng: 103.9915 },
  FRA: { code: 'FRA', name: 'Frankfurt', city: 'Frankfurt', country: 'Germany', lat: 50.0379, lng: 8.5622 },
  AMS: { code: 'AMS', name: 'Schiphol', city: 'Amsterdam', country: 'Netherlands', lat: 52.3105, lng: 4.7683 },
  HKG: { code: 'HKG', name: 'Hong Kong', city: 'Hong Kong', country: 'Hong Kong', lat: 22.308, lng: 113.9185 },
  DOH: { code: 'DOH', name: 'Hamad International', city: 'Doha', country: 'Qatar', lat: 25.2731, lng: 51.608 },
  SFO: { code: 'SFO', name: 'San Francisco', city: 'San Francisco', country: 'USA', lat: 37.6213, lng: -122.379 },
  LAX: { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'USA', lat: 33.9416, lng: -118.4085 },
  SYD: { code: 'SYD', name: 'Kingsford Smith', city: 'Sydney', country: 'Australia', lat: -33.9399, lng: 151.1753 },
  IST: { code: 'IST', name: 'Istanbul', city: 'Istanbul', country: 'Türkiye', lat: 41.2753, lng: 28.7519 }
} as const;

@Injectable({ providedIn: 'root' })
export class FlightService {
  getFlights(): Flight[] {
    return [
      this.flight('BA117', 'SPEEDBIRD 117', 'Boeing 787-9', 'LHR', 'JFK', 'En route', '08:20', '11:05', 0.68, 44.8, -40.1, 36_000, 487),
      this.flight('AF66', 'AIRFRANS 66', 'Airbus A350-900', 'CDG', 'JFK', 'En route', '09:10', '11:54', 0.52, 45.2, -32.5, 34_000, 501),
      this.flight('EK202', 'EMIRATES 202', 'Airbus A380-800', 'DXB', 'JFK', 'Delayed', '07:35', '13:10', 0.26, 35.1, 34.2, 38_000, 463),
      this.flight('SQ318', 'SINGAPORE 318', 'Airbus A380-800', 'SIN', 'LHR', 'En route', '07:45', '14:10', 0.71, 35.8, 74.2, 40_000, 512),
      this.flight('LH401', 'LUFTHANSA 401', 'Airbus A340-300', 'FRA', 'JFK', 'Arrived', '06:40', '09:20', 1, 40.6, -73.7, 0, 0),
      this.flight('KL641', 'KLM 641', 'Boeing 777-300ER', 'AMS', 'JFK', 'Boarding', '10:25', '13:05', 0.02, 52.1, 4.4, 0, 0),
      this.flight('QR7', 'QATARI 7', 'Boeing 777-300ER', 'DOH', 'LHR', 'En route', '09:30', '14:00', 0.44, 39.4, 30.1, 33_000, 475),
      this.flight('CX251', 'CATHAY 251', 'Airbus A350-1000', 'HKG', 'LHR', 'Delayed', '06:55', '13:25', 0.63, 38.1, 80.5, 35_000, 499),
      this.flight('UA58', 'UNITED 58', 'Boeing 787-9', 'SFO', 'FRA', 'En route', '08:00', '16:10', 0.39, 51.2, -82.6, 37_000, 509),
      this.flight('QF12', 'QANTAS 12', 'Airbus A380-800', 'LAX', 'SYD', 'En route', '05:20', '18:30', 0.48, 8.5, -153.2, 41_000, 520),
      this.flight('TK198', 'TURKISH 198', 'Airbus A321neo', 'IST', 'CDG', 'Arrived', '07:00', '09:50', 1, 49.0, 2.5, 0, 0),
      this.flight('BA286', 'SPEEDBIRD 286', 'Boeing 777-300ER', 'SFO', 'LHR', 'En route', '08:40', '19:05', 0.29, 44.4, -102.3, 36_000, 485),
      this.flight('EK19', 'EMIRATES 19', 'Boeing 777-300ER', 'DXB', 'LHR', 'Boarding', '11:15', '15:35', 0.01, 25.2, 55.3, 0, 0),
      this.flight('AF276', 'AIRFRANS 276', 'Boeing 777-200ER', 'CDG', 'HKG', 'En route', '08:15', '20:00', 0.47, 51.9, 63.5, 39_000, 508),
      this.flight('SQ26', 'SINGAPORE 26', 'Airbus A350-900', 'SIN', 'JFK', 'Delayed', '04:25', '16:45', 0.58, 30.7, 91.2, 38_000, 496),
      this.flight('LH710', 'LUFTHANSA 710', 'Airbus A350-900', 'FRA', 'SIN', 'En route', '07:25', '20:40', 0.36, 48.2, 48.1, 37_000, 514),
      this.flight('KL861', 'KLM 861', 'Boeing 787-10', 'AMS', 'HKG', 'Arrived', '01:40', '13:15', 1, 22.3, 113.9, 0, 0),
      this.flight('QR908', 'QATARI 908', 'Airbus A350-1000', 'DOH', 'SYD', 'En route', '06:10', '22:25', 0.34, -1.2, 94.8, 40_000, 525)
    ];
  }

  private flight(
    flightNumber: string,
    callsign: string,
    aircraftType: string,
    originCode: keyof typeof airports,
    destinationCode: keyof typeof airports,
    status: Flight['status'],
    departure: string,
    arrival: string,
    progress: number,
    lat: number,
    lng: number,
    altitude: number,
    speed: number
  ): Flight {
    return {
      id: flightNumber,
      flightNumber,
      callsign,
      aircraftType,
      origin: airports[originCode],
      destination: airports[destinationCode],
      status,
      departure,
      arrival,
      progress,
      current: { lat, lng },
      altitude,
      speed,
      updatedAt: 'Just now'
    };
  }
}
