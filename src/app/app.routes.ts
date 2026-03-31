import { Routes } from '@angular/router';
import { TripsList} from './core/trips-list/trips-list';
import { TripForm } from './core/trip-form/trip-form';
import { TripDetail } from './core/trip-detail/trip-detail';
import { FishList } from './core/fish-list/fish-list';
import { Login } from './core/login/login';
import { Dashboard } from './core/dashboard/dashboard';
import { CatchList } from './core/catch-list/catch-list';
import { CatchForm } from './core/catch-form/catch-form';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'trips', component: TripsList },
  { path: 'trips/new', component: TripForm },
  { path: 'trips/:id/edit', component: TripForm },
  { path: 'trips/:id', component: TripDetail },
  { path: 'fish', component: FishList },
  { path: 'catch', component: CatchList },
  { path: 'catch/new', component: CatchForm },
  { path: '**', redirectTo: 'dashboard' },
];
