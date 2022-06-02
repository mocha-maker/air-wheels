import { Component } from '@angular/core'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'aw-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    console.log('Logout click handler');

    this.auth.logout();
    this.router.navigate(['/login']);
  }
}