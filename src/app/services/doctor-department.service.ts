import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {DoctorDto} from '../models/doctor.model';
import {DepartmentDto} from '../models/department.model';

@Injectable({
  providedIn: 'root',
})
export class DoctorDepartmentService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getDoctorsByDepartment(patientId: number, departmentId: number): Observable<DoctorDto[]> {
    const params = new HttpParams().set('did', departmentId.toString());
    return this.http.get<DoctorDto[]>(`${this.baseUrl}/${patientId}/departments/doctors`, {params});
  }

  getDepartments(patientId: number): Observable<DepartmentDto[]> {
    return this.http.get<DepartmentDto[]>(`${this.baseUrl}/${patientId}/departments`);
  }}
