import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentCardComponent } from '../document-card/document-card.component';

@Component({
  selector: 'app-document-section',
  templateUrl: './document-section.component.html',
  styleUrls: ['./document-section.component.css'],
  standalone: true,
  imports: [CommonModule, DocumentCardComponent],
})
export class DocumentSectionComponent {
  @Input() title: string = '';
  @Input() documents: { name: string }[] = [];
}
