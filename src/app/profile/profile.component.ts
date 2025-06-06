import {Component, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe, NgIf, UpperCasePipe} from '@angular/common';
import {UserDto} from '../models/user.model';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {EditProfileDialogComponent} from '../edit-profile-dialog/edit-profile-dialog.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    NgIf,
    UpperCasePipe,
    DatePipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  public user!: UserDto;

  constructor(private authService: AuthService, private route: ActivatedRoute, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('uid'));
      if (id) {
        this.authService.getUserById(id).subscribe({
          next: (user) => {
            this.user = user;
          },
          error: () => {
            this.router.navigate(['']);
          }
        });
      }
    });
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '550px',
      data: { ...this.user },
    });

    dialogRef.afterClosed().subscribe((result: UserDto | undefined) => {
      if (result) {
        this.authService.updateUser(result).subscribe((updated) => {
          this.user = updated;
        });
      }
    });
  }


}
