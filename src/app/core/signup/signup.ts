import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user/user.service';
import { CreateUserRequest } from '../../models/user/create-user-request';
import { form } from '@angular/forms/signals';

@Component({
  selector: 'app-signup',
  imports: [],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
  standalone: true,
})
export class Signup implements OnInit {
  signUpForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const formValue = this.signUpForm.value;

    const dto: CreateUserRequest = {
      email: formValue.email!,
      password: formValue.password!,
    }

    this.userService.createUser(dto).subscribe({
      next: (res) => {
        console.log('User created!', res);
      }
    })
  }
}
