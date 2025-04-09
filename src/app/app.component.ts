import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TopbarComponentComponent} from './topbar-component/topbar-component.component';
import {LoginComponentComponent} from './login-component/login-component.component';
import {RegisterComponentComponent} from './register-component/register-component.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopbarComponentComponent, LoginComponentComponent, RegisterComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'healthcare-management-system-frontend';
}
