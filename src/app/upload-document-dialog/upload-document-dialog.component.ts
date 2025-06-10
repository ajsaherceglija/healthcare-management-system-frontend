import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-document-dialog',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './upload-document-dialog.component.html',
  styleUrls: ['./upload-document-dialog.component.css'],
})
export class UploadDocumentDialogComponent {
  title = '';
  content = '';
  receiverId: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<UploadDocumentDialogComponent>
  ) {}

  onCancel() {
    this.dialogRef.close();
  }

  onUpload() {
    if (!this.title || !this.content || !this.receiverId) {
      alert('Please fill all fields');
      return;
    }

    const documentData = {
      title: this.title,
      content: this.content,
      receiverId: this.receiverId
    };

    this.dialogRef.close(documentData);
  }
}

