import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MOCK_USERS, User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);

  currentUser$ = this.userSubject.asObservable();

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

  updateUser(updatedUser: User): void {
    const index = MOCK_USERS.findIndex(user => user.uid === updatedUser.uid);
    if (index !== -1) {
      MOCK_USERS[index] = updatedUser;
    }
  }

  logout() {
    this.userSubject.next(null);
  }

  isDoctor(): boolean {
    const user = this.userSubject.getValue();
    return user?.role === 'doctor';
  }
}
