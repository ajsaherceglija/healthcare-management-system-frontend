
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppointmentDto } from '../models/appointment.model';
import { Observable } from 'rxjs';
import {UserDto} from '../models/user.model';
import {DepartmentDto} from '../models/department.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private baseUrl = 'http://localhost:8080/appointments/patient';

  constructor(private http: HttpClient) {}

  getAppointmentsByUserId(uid: number): Observable<AppointmentDto[]> {
    return this.http.get<AppointmentDto[]>(`${this.baseUrl}/${uid}`);
  }

  getAppointmentById(uid: number, aid: number): Observable<AppointmentDto> {
    const params = new HttpParams().set('aid', aid.toString());
    return this.http.get<AppointmentDto>(`${this.baseUrl}/${uid}/single`, { params });
  }

  cancelAppointment(uid: number, aid: number): Observable<AppointmentDto> {
    const params = new HttpParams().set('aid', aid.toString());
    return this.http.put<AppointmentDto>(`${this.baseUrl}/${uid}/cancel`, {}, { params });
  }

  bookAppointment(uid: number, appointment: AppointmentDto): Observable<AppointmentDto> {
    return this.http.post<AppointmentDto>(`${this.baseUrl}/${uid}/schedule`, appointment);
  }

  getDoctorFromUser(uid: number, did: number): Observable<UserDto> {
    const params = new HttpParams().set('did', did.toString());

    return this.http.get<UserDto>(`${this.baseUrl}/${uid}/single-doctor`, { params });
  }

  getDepartmentById(uid:number, did: number): Observable<DepartmentDto> {
    const params = new HttpParams().set('did', did.toString());

    return this.http.get<DepartmentDto>(`${this.baseUrl}/${uid}/get-department`, { params });

  }
}
