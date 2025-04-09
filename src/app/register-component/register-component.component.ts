import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-register-component',
  imports: [
    NgIf, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './register-component.component.html',
  styleUrl: './register-component.component.css'
})
export class RegisterComponentComponent {
  step = 1;
  form: FormGroup;

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      'fname':[],
      'lname':[],
      'gender':[],
      'email':[],
      'password':[],
      'confirmPassword':[],
      'address':[],
      'city':[],
      'phoneNumber':[],
      'dob':[],
      'bloodType':[],
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
    console.log(this.form.value);
  }
}
