import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserDto } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080';
  private userSubject = new BehaviorSubject<UserDto | null>(null);
  currentUser$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

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
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }

  isDoctor(): boolean {
    const user = this.userSubject.getValue();
    return user?.role === 'doctor';
  }
}
