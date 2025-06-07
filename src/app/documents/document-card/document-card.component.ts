import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-document-card',
  templateUrl: './document-card.component.html',
  styleUrls: ['./document-card.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class DocumentCardComponent {
  @Input() name!: string;
  @Input() content?: string;
}



