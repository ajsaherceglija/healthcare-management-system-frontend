import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { DocumentsComponent } from './documents/documents.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';

export const routes: Routes = [
  { path: '', component: LoginComponentComponent },
  { path: 'register', component: RegisterComponentComponent },
  { path: 'user/:uid', component: ProfileComponent },
  { path: 'documents/:uid', component: DocumentsComponent }
];


