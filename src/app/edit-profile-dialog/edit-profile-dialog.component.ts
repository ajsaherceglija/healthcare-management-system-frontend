import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDto } from '../models/user.model';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-edit-profile-dialog',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule, CommonModule],
  templateUrl: './edit-profile-dialog.component.html',
  styleUrl: './edit-profile-dialog.component.css'
})
export class EditProfileDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDto
  ) {}

  formSubmitted = false;

  onSave(form: NgForm): void {
    this.formSubmitted = true;
    if (form.valid) {
      this.dialogRef.close(this.data);
    } else {
      form.control.markAllAsTouched();
    }
  }


  onCancel(): void {
    this.dialogRef.close();
  }
}
