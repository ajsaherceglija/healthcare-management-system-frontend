import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DoctorDto} from '../models/doctor.model';
import {DepartmentDto} from '../models/department.model';
import {DoctorDepartmentService} from '../services/doctor-department.service';
import {CommonModule, NgFor} from '@angular/common';

@Component({
  selector: 'app-schedule-appointment',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './schedule-appointment.component.html',
  styleUrl: './schedule-appointment.component.css'
})
export class ScheduleAppointmentComponent implements OnInit{
  @Input() patientId!: number;

  form: FormGroup;
  @Output() close = new EventEmitter<void>();
  @Output() booked = new EventEmitter<{department: string, doctor: string, note: string}>();

  doctors: DoctorDto[] = [];
  departments: DepartmentDto[] = [];



  constructor(private fb: FormBuilder, private doctorDepartmentService: DoctorDepartmentService) {
    this.form = this.fb.group({
      department: [''],
      doctor: [''],
      note: ['']
    });
  }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.doctorDepartmentService.getDepartments(this.patientId).subscribe({
      next: (data) => {this.departments = data},
      error: (err) => console.error('Failed to load departments', err)
    });
  }

  onDepartmentChange(event: Event) {
    const departmentId = Number((event.target as HTMLSelectElement).value);
    if (!departmentId) { // no valid department selected
      this.doctors = [];
      return;
    }
    console.log(departmentId);
    this.loadDoctorsByDepartment(departmentId);
  }

  loadDoctorsByDepartment(departmentId: number): void {
      this.doctorDepartmentService.getDoctorsByDepartment(this.patientId, departmentId).subscribe({
      next: (data) => this.doctors = data,
      error: (err) => console.error('Failed to load doctors', err)
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.booked.emit(this.form.value);
      this.onClose();
    }
  }

  onClose() {
    this.close.emit();
  }
}
