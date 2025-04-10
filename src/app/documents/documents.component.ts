import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DocumentSectionComponent } from './document-section/document-section.component';
import { User } from '../models/user.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [DocumentSectionComponent, NgIf],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent implements OnInit, OnChanges {
  user!: User;
  finishedDocuments: { name: string }[] = [];
  myDocuments: { name: string }[] = [];

  constructor(private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('uid'));
      if (id) {
        this.authService.setUser(id);
        this.loadUserData(id);
      }
    });
  }

  ngOnChanges() {
    const uid = this.route.snapshot.paramMap.get('uid');
    if (uid) {
      this.loadUserData(+uid);
    }
  }

  loadUserData(uid: number): void {
    const userData = this.authService.getUserById(uid);
    if (userData) {
      this.user = userData;

      if (this.authService.isDoctor()) {
        this.finishedDocuments = [
          { name: 'Allergies' },
        ];
        this.myDocuments = [
          { name: 'Lab analysis' },
          { name: 'Prescription' },
        ];
      } else {
        this.finishedDocuments = [
          { name: 'Lab analysis' },
          { name: 'Prescription' },
        ];
        this.myDocuments = [
          { name: 'Allergies' },
        ];
      }
    }
  }
}
