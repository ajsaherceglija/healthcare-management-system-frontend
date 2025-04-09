import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Appointment} from '../models/appointment.model';

@Component({
  selector: 'app-patient-appointment-details',
  standalone: true,
  imports: [],
  templateUrl: './patient-appointment-details.component.html',
  styleUrl: './patient-appointment-details.component.css'
})
export class PatientAppointmentDetailsComponent {
  @Input() appointment!: Appointment;
  @Output() close = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
