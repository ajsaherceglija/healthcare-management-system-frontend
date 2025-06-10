import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [
    NgIf, FormsModule, ReactiveFormsModule, RouterLink,
  ],
  templateUrl: './register-component.component.html',
  styleUrl: './register-component.component.css'
})
export class RegisterComponentComponent {
  step = 1;
  form: FormGroup;

  constructor(formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = formBuilder.group({
      'firstName':[],
      'lastName':[],
      'gender':[],
      'email':[],
      'password':[],
      'confirmPassword':[],
      'address':[],
      'city':[],
      'phone':[],
      'dob':[],
      'blood_group':[],
      'jmbg':[]
    });
  }

  nextStep() {
    this.step++;
  }

  previousStep() {
    this.step--;
  }

  register() {
    const { firstName, lastName, gender,  email, password, confirmPassword, address, city, phone, dob, blood_group, jmbg} = this.form.value;

    this.authService.register(firstName, lastName, gender, email, password, confirmPassword, address, city, phone, dob, blood_group, jmbg).subscribe({
      next: (response) => {
        this.router.navigate([`/user/${response.uid}`]);
      },
      error: (err) => {
        console.error('Registration failed', err);
        alert('Could not register. Please try again.');
      }
    });
  }

}
