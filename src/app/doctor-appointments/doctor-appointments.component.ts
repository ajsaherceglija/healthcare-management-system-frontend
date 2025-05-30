import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentDto } from '../models/appointment.model';
import { UserDto } from '../models/user.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { PatientService } from '../services/patient.service';  // <-- Use PatientService now

@Component({
  selector: 'app-doctor-appointments',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, FormsModule],
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.css']
})
export class DoctorAppointmentsComponent implements OnInit {
  @Input() doctor!: UserDto;

  appointments: AppointmentDto[] = [];
  selectedAppointment: AppointmentDto | null = null;

  selectedDate: string = '';
  selectedTime: string = '';
  selectedRoom: string = '';

  // Map patientId => patientName
  patientNameMap = new Map<number, string>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private patientService: PatientService  // <-- inject PatientService
  ) {}

  ngOnInit(): void {
    if (!this.doctor?.uid) {
      this.router.navigate(['']);
      return;
    }
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getDoctorAppointmentsByUserId(this.doctor.uid).subscribe({
      next: (response) => {
        this.appointments = [
          ...(response.requested || []),
          ...(response.upcoming || [])
        ];

        // Extract unique patient IDs
        const patientIds = Array.from(new Set(this.appointments.map(appt => appt.patientId)));

        // Fetch and cache patient names
        patientIds.forEach(pid => {
          if (!this.patientNameMap.has(pid)) {
            this.patientService.getPatientById(pid).subscribe({
              next: (user) => {
                this.patientNameMap.set(pid, user.name);
              },
              error: () => {
                this.patientNameMap.set(pid, 'Unknown Patient');
              }
            });
          }
        });
      },
      error: (err) => {
        console.error('Failed to load appointments:', err);
      }
    });
  }

  get newRequests() {
    return this.appointments.filter(appt => appt.status === 'upcoming');
  }

  get acceptedAppointments() {
    return this.appointments.filter(appt => appt.status === 'accepted');
  }

  openManageModal(appointment: AppointmentDto) {
    this.selectedAppointment = { ...appointment };
    this.selectedDate = appointment.date ? new Date(appointment.date).toISOString().split('T')[0] : '';
    this.selectedTime = appointment.time;
    this.selectedRoom = appointment.room?.toString() || '';
  }

  getPatientName(patientId: number): string {
    return this.patientNameMap.get(patientId) || 'Loading...';
  }

  closeModal() {
    this.selectedAppointment = null;
    this.selectedDate = '';
    this.selectedTime = '';
    this.selectedRoom = '';
  }

  isAcceptValid() {
    return this.selectedDate && this.selectedTime && this.selectedRoom;
  }

  accept() {
    if (!this.selectedAppointment) return;

    const updatedAppointment: AppointmentDto = {
      ...this.selectedAppointment,
      date: new Date(this.selectedDate),
      time: this.selectedTime,
      room: Number(this.selectedRoom),
      status: 'accepted'
    };

    this.appointmentService.updateDoctorAppointment(this.doctor.uid, updatedAppointment, 'accept').subscribe({
      next: (updated) => {
        const index = this.appointments.findIndex(a => a.aid === updated.aid);
        if (index !== -1) this.appointments[index] = updated;
        this.closeModal();
      },
      error: (err) => {
        console.error('Failed to accept appointment:', err);
      }
    });
  }

  reject() {
    if (!this.selectedAppointment) return;

    this.appointmentService.updateDoctorAppointment(this.doctor.uid, this.selectedAppointment, 'reject').subscribe({
      next: () => {
        this.appointments = this.appointments.filter(a => a.aid !== this.selectedAppointment?.aid);
        this.closeModal();
      },
      error: (err) => {
        console.error('Failed to reject appointment:', err);
      }
    });
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
