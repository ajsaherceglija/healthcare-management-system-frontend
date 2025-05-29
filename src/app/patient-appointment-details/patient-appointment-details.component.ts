
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AppointmentDto} from '../models/appointment.model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-patient-appointment-details',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './patient-appointment-details.component.html',
  styleUrl: './patient-appointment-details.component.css'
})
export class PatientAppointmentDetailsComponent {
  @Input() appointment!: AppointmentDto;
  @Output() close = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
