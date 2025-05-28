import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserDto } from '../../models/user.model';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule, DatePipe],
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent {
  patientForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { patient: UserDto },
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PatientDetailsComponent> // Still private
  ) {
    this.patientForm = this.fb.group({
      diagnoses: this.fb.array(['Initial Diagnosis'])
    });
  }

  // Add this public method
  closeDialog(): void {
    this.dialogRef.close();
  }

  get diagnoses(): FormArray {
    return this.patientForm.get('diagnoses') as FormArray;
  }

  addDiagnosis(): void {
    this.diagnoses.push(new FormControl(''));
  }

  removeDiagnosis(index: number): void {
    this.diagnoses.removeAt(index);
  }

  save(): void {
    console.log('Saved diagnoses:', this.patientForm.value.diagnoses);
    this.closeDialog(); // Use the public method here too
  }
}
