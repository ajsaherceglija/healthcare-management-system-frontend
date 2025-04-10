import { Component, OnInit } from '@angular/core';
import { NgIf, CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorAppointmentsComponent } from '../doctor-appointments/doctor-appointments.component';
import { PatientAppointmentsComponent } from '../patient-appointments/patient-appointments.component';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-appointments-wrapper',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    DoctorAppointmentsComponent,
    PatientAppointmentsComponent
  ],
  template: `
    <ng-container *ngIf="user">
      <app-doctor-appointments
        *ngIf="user.role === 'doctor'"
        [doctor]="user" />
      <app-patient-appointments
        *ngIf="user.role === 'patient'"
        [patient]="user" />
    </ng-container>
  `
})
export class AppointmentsWrapperComponent implements OnInit {
  user!: User;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const uid = Number(this.route.snapshot.paramMap.get('uid'));

    if (uid) {
      this.authService.setUser(uid);
      const fetchedUser = this.authService.getUserById(uid);
      if (fetchedUser) {
        this.user = fetchedUser;
      } else {
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
