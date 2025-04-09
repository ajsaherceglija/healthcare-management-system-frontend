import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DocumentSectionComponent} from './documents/document-section/document-section.component';
import {HeaderComponent} from './header/header.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DocumentSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
