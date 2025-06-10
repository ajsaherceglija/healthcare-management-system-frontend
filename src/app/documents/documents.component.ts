import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../services/document.service';
import { AuthService } from '../services/auth.service';
import { DocumentDto } from '../models/document.model';
import { UserDto } from '../models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UploadDocumentDialogComponent } from '../upload-document-dialog/upload-document-dialog.component';

@Component({
  selector: 'app-documents',
  standalone: true,
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  imports: [FormsModule, CommonModule]
})
export class DocumentsComponent implements OnInit {
  documents: DocumentDto[] = [];
  currentUser: UserDto | null = null;
  selectedDocument: DocumentDto | null = null;

  constructor(
    private documentService: DocumentService,
    private authService: AuthService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadDocuments();
      }
    });
  }

  loadDocuments(): void {
    if (!this.currentUser) return;

    if (this.currentUser.role === 'doctor') {
      this.documentService.getSentDocuments(this.currentUser.uid).subscribe({
        next: (docs) => this.documents = docs,
        error: (err) => console.error('Failed to load sent documents', err)
      });
    } else if (this.currentUser.role === 'patient') {
      this.documentService.getReceivedDocuments(this.currentUser.uid).subscribe({
        next: (docs) => this.documents = docs,
        error: (err) => console.error('Failed to load received documents', err)
      });
    }
  }



  openDocumentModal(doc: DocumentDto) {
    this.selectedDocument = doc;
  }

  closeDocumentModal() {
    this.selectedDocument = null;
  }

  openUploadDialog(button?: HTMLElement): void {
    if (button) {
      button.blur();
    }

    const dialogRef = this.dialog.open(UploadDocumentDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((documentData: any | undefined) => {
      if (documentData && this.currentUser) {
        // Add senderId and isForPatient properties
        documentData.senderId = this.currentUser.uid.toString();
        documentData.isForPatient = true;

        this.documentService.sendDocument(documentData).subscribe({
          next: (doc) => {
            alert('Document sent successfully!');
            this.documents.push(doc);
          },
          error: (err) => {
            console.error('Failed to send document', err);
            alert('Failed to send document');
          }
        });
      }
    });


  }

}
