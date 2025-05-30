import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserDto } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private baseUrl = 'https://healthcare-management-system-04601a8f10ae.herokuapp.com/';

  // Optional: keep selected patient in BehaviorSubject for sharing across components
  private selectedPatientSubject = new BehaviorSubject<UserDto | null>(null);
  selectedPatient$ = this.selectedPatientSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Fetch patient by ID from backend
  getPatientById(uid: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/user/${uid}`);
  }

  setPatient(patient: UserDto) {
    this.selectedPatientSubject.next(patient);
  }

  getPatient(): UserDto | null {
    return this.selectedPatientSubject.getValue();
  }

  clearPatient() {
    this.selectedPatientSubject.next(null);
  }
}
