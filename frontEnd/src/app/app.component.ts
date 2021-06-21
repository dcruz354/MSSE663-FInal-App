import { Router } from '@angular/router';
import { AuthService } from './_services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DIMACalculatorApp';

  constructor(
    public authService: AuthService,
    public router: Router,
  ) {}

  logout() {
    this.authService.logout();
  }

  logoutAll() {
    this.authService.logoutAll();
  }
}
