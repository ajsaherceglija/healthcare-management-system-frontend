import {Component, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe, NgIf, UpperCasePipe} from '@angular/common';
import {User} from '../models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    NgIf,
    UpperCasePipe,
    DatePipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  public user!: User;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('uid')); // Get the user ID from the route
      if (id) {
        this.authService.setUser(id);
        this.loadUserData(id);
      } 
    });
  }

  loadUserData(uid: number): void {
    const userData = this.authService.getUserById(uid);
    if (userData) {
      this.user = userData;
    }
    else {
      this.router.navigate(['/']);
    }
  }
}
