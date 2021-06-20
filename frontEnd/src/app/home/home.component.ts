import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

import { User } from './../../../../restful-api-mongo/src/models/user.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  constructor(private authService: AuthService) {
    this.user = this.authService.userValue;
   }

  ngOnInit(): void {
  }

}
