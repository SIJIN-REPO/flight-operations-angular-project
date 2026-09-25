export type FlightStatus = 'En route' | 'Delayed' | 'Boarding' | 'Arrived';

export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
}

export interface Flight {
  id: string;
  flightNumber: string;
  callsign: string;
  aircraftType: string;
  origin: Airport;
  destination: Airport;
  status: FlightStatus;
  departure: string;
  arrival: string;
  progress: number;
  current: { lat: number; lng: number };
  altitude: number;
  speed: number;
  updatedAt: string;
}
