import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'aw-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formData: any = {};
  errors: any = {};

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  register() {
    this.auth.register(this.formData).subscribe(
      () => {
        console.log('Registered!');
        // Reroute to login page on successful registration
        this.router.navigate(['/login', { registered: 'success' }]);
      },
      (errorResponse) => {
        console.log(errorResponse.error.message);

        this.errors = errorResponse.error.message;
      }
    );
  }
}

