import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {NgIf} from '@angular/common';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, MatListModule, RouterModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  public userId!: number;
  public isDoctor!: boolean;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Subscribe to the user ID from the service
    this.authService.currentUser$.subscribe((user) => {
      this.userId = user?.uid!;
      this.isDoctor = this.authService.isDoctor();
    });
  }
  logout() {
    this.authService.logout();

    // Redirect the user to the login page (or another page)
    this.router.navigate(['/']);
  }
}
