import { Routes } from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {DocumentsComponent} from './documents/documents.component';

export const routes: Routes = [
  {path: 'user/:uid', component: ProfileComponent},
  { path: 'documents/:uid', component: DocumentsComponent }
];
