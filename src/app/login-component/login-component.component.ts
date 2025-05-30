import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {MOCK_USERS} from '../models/user.model';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})
export class LoginComponentComponent {
  form: FormGroup;

  constructor(formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = formBuilder.group({
      'email':[],
      'password':[]
    });
  }

  login() {
    const { email, password } = this.form.value;
    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.router.navigate([`/user/${response.uid}`]);
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Invalid email or password');
      }
    });
  }

}
