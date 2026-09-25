# Aeroscope Flight Operations Dashboard

Responsive Angular dashboard for monitoring a global mock flight network. The map is powered by Leaflet and the UI uses a typed in-memory flight service, reactive filters, and a routed standalone Angular application.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm start
```

Open `http://localhost:4200/operations`. The map uses Carto's dark basemap tiles, so an internet connection is needed for map tiles. The flight data itself is local mock data.

## Useful commands

```bash
npm run build
npm test
```

## Design and architecture

The interface treats the map as the primary operational surface, with a compact KPI strip above it and a flight activity queue alongside it. A warm amber accent indicates the selected route and active navigation, while coral and green are reserved for delayed and arrived states. The navy map and header create a clear visual change between monitoring space and the light data panels.

The application is implemented as a standalone Angular component in `src/app/app.ts`, with a typed domain model in `flight.model.ts` and mock data construction isolated in `flight.service.ts`. Reactive Forms drives callsign search plus status, origin, and destination filters. Selecting a row or map marker updates the route line, map viewport, and detail panel. The `/operations` route is configured in `app.routes.ts` and redirects from the root path.

The layout collapses from map-plus-queue into a vertically stacked tablet/mobile view, while the detail panel keeps the operational fields visible: aircraft, departure, arrival, altitude, and speed. The map markers use accessible tooltips and the controls include labels for screen readers.

## Assessment coverage

- 18 mock flights across international routes
- Leaflet map with status-colored markers and selected-flight route visualization
- KPI cards for total, active, delayed, and arrived flights
- Reactive search and three filter controls
- Flight activity list and selected flight details
- Responsive desktop, tablet, and mobile styling
# FlightOpsDashboard

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
