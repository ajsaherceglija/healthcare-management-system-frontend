import {Component, Input} from '@angular/core';
import {User} from '../models/user.model';

@Component({
  selector: 'app-doctor-appointments',
  imports: [],
  templateUrl: './doctor-appointments.component.html',
  styleUrl: './doctor-appointments.component.css'
})
export class DoctorAppointmentsComponent {
  @Input() doctor!: User;
}
