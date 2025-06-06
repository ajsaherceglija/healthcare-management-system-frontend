import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserDto, MOCK_USERS } from '../../models/user.model';
import {DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-patients-list',
  standalone: true,
  imports: [FormsModule, DatePipe, NgIf, NgForOf],
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent {
  searchQuery: string = '';
  patients: UserDto[] = MOCK_USERS.filter(user => user.role === 'patient');
  selectedPatient: UserDto | null = null;
  diagnoses: string[] = ['Asthma'];

  get filteredPatients(): UserDto[] {
    return this.patients.filter(patient =>
      patient.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  openPatientDetails(patient: UserDto): void {
    this.selectedPatient = patient;
    this.diagnoses = ['Asthma'];
  }

  addDiagnosis(): void {
    this.diagnoses.push('');
  }

  removeDiagnosis(index: number): void {
    this.diagnoses.splice(index, 1);
  }

  saveChanges(): void {
    console.log('Saved changes for:', this.selectedPatient?.name);
    console.log('Diagnoses:', this.diagnoses);
  }
}
