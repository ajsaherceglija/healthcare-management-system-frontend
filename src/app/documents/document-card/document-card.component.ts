import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-document-card',
  templateUrl: './document-card.component.html',
  styleUrls: ['./document-card.component.css'],
})
export class DocumentCardComponent {
  @Input() name: string = '';
}

