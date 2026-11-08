import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { EventListComponent } from './components/event-list/event-list';
import { EventDetailComponent } from './components/event-detail/event-detail';
import { RegisterComponent } from './components/register/register';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'eventos', component: EventListComponent },
  { path: 'eventos/:id', component: EventDetailComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'registro/:id', component: RegisterComponent },
  { path: '**', redirectTo: 'home' }
];