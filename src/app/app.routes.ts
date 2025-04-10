import { Routes } from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {AppointmentsWrapperComponent} from './appointments-wrapper/appointments-wrapper.component';

export const routes: Routes = [
  {path: 'user/:uid', component: ProfileComponent},
  {path: 'appointments/:uid', component: AppointmentsWrapperComponent}
];
