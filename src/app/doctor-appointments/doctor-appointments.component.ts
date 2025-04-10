import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentDto, MOCK_APPOINTMENTS } from '../models/appointment.model';
import {MOCK_USERS, User} from '../models/user.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-doctor-appointments',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, FormsModule],
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.css']
})
export class DoctorAppointmentsComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  @Input() doctor!: User;

  appointments: AppointmentDto[] = [];
  selectedAppointment: AppointmentDto | null = null;

  selectedDate: string = '';
  selectedTime: string = '';
  selectedRoom: string = '';

  ngOnInit(): void {
    const foundDoctor = MOCK_USERS.find(user => user.uid === this.doctor?.uid);

    if (!foundDoctor) {
      this.router.navigate(['/login']);
    }

    this.appointments = MOCK_APPOINTMENTS.filter(
      (appt) => appt.doctorId === this.doctor.uid
    );
  }

  get newRequests() {
    return this.appointments.filter(appt => appt.status === 'pending');
  }

  get acceptedAppointments() {
    return this.appointments.filter(appt => appt.status === 'accepted');
  }

  openManageModal(appointment: AppointmentDto) {
    this.selectedAppointment = appointment;
    this.selectedDate = '';
    this.selectedTime = '';
    this.selectedRoom = '';
  }

  getPatientName(patientId: number): string {
    const user = MOCK_USERS.find(u => u.uid === patientId);
    return user ? `${user.name}` : 'Unknown Patient';
  }

  closeModal() {
    this.selectedAppointment = null;
  }

  isAcceptValid() {
    return this.selectedDate && this.selectedTime && this.selectedRoom;
  }

  accept() {
    if (this.selectedAppointment) {
      this.selectedAppointment.status = 'accepted';
      this.selectedAppointment.date = new Date(this.selectedDate);
      this.selectedAppointment.time = this.selectedTime;
      this.selectedAppointment.room = Number(this.selectedRoom);
      this.closeModal();
    }
  }

  reject() {
    if (this.selectedAppointment) {
      this.appointments = this.appointments.filter(a => a.aid !== this.selectedAppointment?.aid);
      this.closeModal();
    }
  }

  getDayLabel(date: Date | string | undefined) {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { weekday: 'short' });
  }

  getDateLabel(date: Date | string | undefined) {
    if (!date) return '';
    const d = new Date(date);
    return d.getDate().toString().padStart(2, '0');
  }
}
