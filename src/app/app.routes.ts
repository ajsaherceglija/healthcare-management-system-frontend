import { Routes } from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {LoginComponentComponent} from './login-component/login-component.component';
import {RegisterComponentComponent} from './register-component/register-component.component';
import {AppointmentsWrapperComponent} from './appointments-wrapper/appointments-wrapper.component';

export const routes: Routes = [
  {path: '', component: LoginComponentComponent},
  {path: 'register', component: RegisterComponentComponent},
  {path: 'user/:uid', component: ProfileComponent},
  {path: 'user/appointments/:uid', component: AppointmentsWrapperComponent},
];

