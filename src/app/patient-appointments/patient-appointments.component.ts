import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {User} from '../models/user.model';
import {Appointment, MOCK_APPOINTMENTS} from '../models/appointment.model';

@Component({
  selector: 'app-patient-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-appointments.component.html',
  styleUrl: './patient-appointments.component.css'
})
export class PatientAppointmentsComponent implements OnInit{
  @Input() patient!: User;
  appointments: Appointment[] = [];

  ngOnInit() {
    this.appointments = MOCK_APPOINTMENTS.filter(a => a.patientId === this.patient.uid && a.status === 'upcoming');
  }
}
