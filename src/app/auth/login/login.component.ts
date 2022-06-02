import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'aw-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errors: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.testLogin();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // validators
  isInvalidForm(fieldName: string): boolean {
    return (
      this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty ||
        this.loginForm.controls[fieldName].touched)
    );
  }

  isRequired(fieldName: string): boolean {
    return this.loginForm.controls[fieldName].errors?.['required'];
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe(
      (token) => {
        console.log('Logged in!');
        console.log('Retrieved Token: ' + token);

        // Reroute to rentals page on successful login
        this.router.navigate(['/rentals', { login: 'success' }]);
      },
      (errorResponse) => {
        console.log(errorResponse.error.message);

        this.errors = errorResponse.error.message;
      }
    );
  }

  // Quick log for testing
  testLogin() {
    this.loginForm.controls['email'].setValue('fake@email.com');
    this.loginForm.controls['password'].setValue('Password1');
  }
}
