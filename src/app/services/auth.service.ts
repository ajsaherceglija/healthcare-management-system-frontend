import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserDto } from '../models/user.model';
import { Router } from '@angular/router';

interface AuthResponse {
  token: string;
  uid: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080';
  private userSubject = new BehaviorSubject<UserDto | null>(null);
  currentUser$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromStorage();
  }


  getUserById(uid: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/user/${uid}`).pipe(
      tap((user) => this.userSubject.next(user))
    );
  }

  setUser(uid: number): void {
    this.getUserById(uid).subscribe({
      next: (user) => this.userSubject.next(user),
      error: () => this.userSubject.next(null)
    });
  }

  updateUser(user: UserDto): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.baseUrl}/user/${user.uid}`, user).pipe(
      tap((updated) => this.userSubject.next(updated))
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }

  isDoctor(): boolean {
    const user = this.userSubject.getValue();
    return user?.role === 'doctor';
  }


  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${this.baseUrl}/api/auth/login`, body).pipe(
      tap((res) => {
        console.log('Login response:', res);

        if (res && res.token) { // Save token in local storage
          localStorage.setItem('token', res.token);
        }
      })
    );
  }


  register(firstName: string, lastName: string, gender: string, email: string, password: string, confirmPassword: string, address?: string, city?: string, phone?: string, dob?: Date, blood_group?: string, jmbg?: string): Observable<any> {
    const body: any = { firstName,  lastName, gender, email, password, confirmPassword,};
    if(address) body.address = address;
    if (city) body.city = city;
    if (phone) body.phone = phone;
    if (dob) body.dob = dob;
    if (blood_group) body.blood_group = blood_group;
    if (jmbg) body.jmbg = jmbg;
    console.log(body);

    return this.http.post<any>(`${this.baseUrl}/api/auth/register`, body).pipe(
      tap((res) => {
        console.log('Register response:', res);

        if (res && res.token) {
          localStorage.setItem('token', res.token);
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private loadUserFromStorage(): void {
    const token = this.getToken();
    if (token) {
      const uidStr = localStorage.getItem('uid');
      if (uidStr) {
        const uid = Number(uidStr);
        this.setUser(uid);
      }
    }
  }
}




