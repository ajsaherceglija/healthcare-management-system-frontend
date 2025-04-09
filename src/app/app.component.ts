import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DocumentSectionComponent} from './documents/document-section/document-section.component';
import {HeaderComponent} from './header/header.component';
import {NavbarComponent} from './navbar/navbar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DocumentSectionComponent, HeaderComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
