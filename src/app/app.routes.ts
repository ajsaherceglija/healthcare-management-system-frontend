import { Routes } from '@angular/router';
import {LoginComponentComponent} from './login-component/login-component.component';
import {RegisterComponentComponent} from './register-component/register-component.component';

export const routes: Routes = [
  {path: '', component: LoginComponentComponent},
  {path: 'register', component: RegisterComponentComponent},
];
