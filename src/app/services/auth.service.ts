import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MOCK_USERS, User } from '../models/user.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);

  currentUser$ = this.userSubject.asObservable();

  constructor(private router: Router) {
  }

  setUser(uid: number) {
    const user = MOCK_USERS.find((user) => user.uid === uid);
    if (user) {
      this.userSubject.next(user);
    } else {
      this.userSubject.next(null);
    }
  }

  getUserById(uid: number) {
    return MOCK_USERS.find(user => user.uid === uid);
  }

  logout() {
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }

  isDoctor(): boolean {
    const user = this.userSubject.getValue();
    return user?.role === 'doctor';
  }
}
