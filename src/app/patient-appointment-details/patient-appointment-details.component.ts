
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppointmentDto} from '../models/appointment.model';
import {DatePipe} from '@angular/common';
import {DepartmentDto} from '../models/department.model';
import {UserDto} from '../models/user.model';
import {AppointmentService} from '../services/appointment.service';

@Component({
  selector: 'app-patient-appointment-details',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './patient-appointment-details.component.html',
  styleUrl: './patient-appointment-details.component.css'
})
export class PatientAppointmentDetailsComponent implements OnInit{
  @Input() appointment!: AppointmentDto;
  @Output() close = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  doctorName: string = '';
  departmentName: string = '';

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    this.loadDoctorAndDepartment();
  }

  loadDoctorAndDepartment() {
    if (this.appointment.doctorId) {
      this.appointmentService.getDoctorFromUser(this.appointment.patientId, this.appointment.doctorId).subscribe({
        next: (doctor: UserDto) => {
          this.doctorName = doctor.name;
        },
        error: (err: any) => {
          console.error('Failed to fetch doctor', err);
        }
      });

      this.appointmentService.getDepartmentById(this.appointment.patientId, this.appointment.doctorId).subscribe({
        next: (dept: DepartmentDto) => {
          this.departmentName = dept.name;
        },
        error: (err: any) => {
          console.error('Failed to fetch department', err);
        }
      });
    }
  }


  onClose() {
    this.close.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
