import { Routes } from '@angular/router';

export const routes: Routes = [{ path: '', pathMatch: 'full', redirectTo: 'operations' }, { path: 'operations', loadComponent: () => import('./app').then((module) => module.App) }];
