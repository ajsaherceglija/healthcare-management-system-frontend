import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-schedule-appointment',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './schedule-appointment.component.html',
  styleUrl: './schedule-appointment.component.css'
})
export class ScheduleAppointmentComponent {

  form: FormGroup;
  @Output() close = new EventEmitter<void>();
  @Output() booked = new EventEmitter<{department: string, doctor: string, note: string}>();




  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      department: [''],
      doctor: [''],
      note: ['']
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
