import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserDto} from '../models/user.model';
import {AppointmentDto, MOCK_APPOINTMENTS} from '../models/appointment.model';
import {PatientAppointmentDetailsComponent} from '../patient-appointment-details/patient-appointment-details.component';
import {ScheduleAppointmentComponent} from '../schedule-appointment/schedule-appointment.component';
import { AppointmentService } from '../services/appointment.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-patient-appointments',
  standalone: true,
  imports: [CommonModule, PatientAppointmentDetailsComponent, ScheduleAppointmentComponent],
  templateUrl: './patient-appointments.component.html',
  styleUrl: './patient-appointments.component.css'
})
export class PatientAppointmentsComponent implements OnInit{

  @Input() patient!: UserDto;
  appointments: AppointmentDto[] = [];
  selectedAppointment: AppointmentDto | null = null;
  showSchedule = false;

  constructor(private appointmentService: AppointmentService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.loadAppointments(user.uid);
      }
    });  }

  private loadAppointments(uid: number) {



     this.appointmentService.getAppointmentsByUserId(uid).subscribe({
      next: (appointments) => {
        this.appointments = appointments.filter(a => a.status === 'upcoming');
      },

      error: (err) => {
        console.error('Failed to load appointments', err);
      },
    });
  }

  openDetails(appointment: AppointmentDto) {
    this.appointmentService.getAppointmentById(this.patient.uid, appointment.aid).subscribe({
      next: (details) => this.selectedAppointment = details,
      error: (err) => console.error('Failed to fetch appointment details', err)
    });
  }

  closeModal() {
    this.selectedAppointment = null;
  }

  cancelAppointment() {
    if (this.selectedAppointment) {
      this.appointmentService.cancelAppointment(this.patient.uid, this.selectedAppointment.aid).subscribe({
        next: () => {
          this.loadAppointments(this.patient.uid);
          this.closeModal();
        },
        error: (err) => console.error('Failed to cancel appointment', err)
      });
    }
  }

  openModal() {
    this.showSchedule = true;
  }


  handleBooking(data: { department: string; doctor: string; note: string }) {
    const newAppointment: AppointmentDto = {
      aid: 0,
      doctorId: +data.doctor,
      note: data.note,
      date: new Date(),
      time: '',
      status: 'upcoming',
      patientId: this.patient.uid,
      room: 0
    };

    this.appointmentService.bookAppointment(this.patient.uid, newAppointment).subscribe({
      next: () => {
        this.loadAppointments(this.patient.uid);
      },
      error: (err) => console.error('Booking failed', err),
    });
  }

}
