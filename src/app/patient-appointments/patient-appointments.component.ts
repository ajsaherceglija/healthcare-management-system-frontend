import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {User} from '../models/user.model';
import {Appointment, MOCK_APPOINTMENTS} from '../models/appointment.model';
import {PatientAppointmentDetailsComponent} from '../patient-appointment-details/patient-appointment-details.component';

@Component({
  selector: 'app-patient-appointments',
  standalone: true,
  imports: [CommonModule, PatientAppointmentDetailsComponent],
  templateUrl: './patient-appointments.component.html',
  styleUrl: './patient-appointments.component.css'
})
export class PatientAppointmentsComponent implements OnInit{
  @Input() patient!: User;
  appointments: Appointment[] = [];
  selectedAppointment: Appointment | null = null;

  ngOnInit() {
    this.loadAppointments()
  }

  private loadAppointments() {
    this.appointments = MOCK_APPOINTMENTS.filter(a => a.patientId === this.patient.uid && a.status === 'upcoming');

  }

  openDetails(appointment: Appointment) {
    this.selectedAppointment = appointment
  }

  closeModal() {
    this.selectedAppointment = null;
  }

  cancelAppointment() {
    if(this.selectedAppointment) {
      this.selectedAppointment.status = 'cancelled';
      this.loadAppointments();
      this.closeModal();
    }
  }


}
